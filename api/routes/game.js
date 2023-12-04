var express = require('express');
var router = express.Router();
const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const { formatISO } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz');
const { RewardService } = require('../services/rewardService');
const DbActivity = require('../database/models/activity');
const DbWord = require('../database/models/word');
const OpenAIService = require('../services/openAIService');

const TOKENS_TO_SEND = {
	'easy': 0.001,
	'medium': 0.002,
	'hard': 0.003,
};

router.post('/', async function (_req, res) {
	const today = newDate();
	const formattedDate = formatDate(today);

	try {
		let word = await DbWord.findByPk(formattedDate,
			{
				attributes: ['date', 'word', 'opt1', 'opt2', 'opt3', 'opt4', 'pos', 'def']
			});
		if (!word) {
			word = await generateNewWord().catch((error) => {
				console.error(error);
				return null;
			});
		}

		if (word) {
			res.json({
				date: word.date,
				word: word.word,
				options: [word.opt1, word.opt2, word.opt3, word.opt4],
				pos: word.pos,
				def: word.def
			});
		} else {
			res.status(404).json({ message: 'Word not found for today' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/submitNoWallet', async function (req, res) {
	const requirements = ['wordDate', 'difficulty', 'answer'];
	ensureRequirements(req, res, requirements);

	try {
		const { wordDate, difficulty, answer } = req.body;

		const word = await DbWord.findByPk(wordDate);
		const submissionStatus = await checkSubmission(word, difficulty, answer);

		let returnedAnswer = null;
		if (submissionStatus !== "forbidden") {
			returnedAnswer = getAnswerByDifficulty(word, difficulty);
		}

		return res.json({ status: submissionStatus, answer: returnedAnswer });
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/submit', async function (req, res) {
	const requirements = ['signature', 'address', 'message', 'wordDate', 'difficulty', 'answer'];
	ensureRequirements(req, res, requirements);

	try {
		const { signature, address, message, wordDate, difficulty, answer } = req.body;

		const decodedPublicKey = new PublicKey(address).toBuffer();
		const decodedMessage = Buffer.from(message, 'utf8');
		const decodedSignature = Buffer.from(signature, 'base64');

		const isValid = nacl.sign.detached.verify(decodedMessage, decodedSignature, decodedPublicKey);

		if (isValid) {
			const word = await DbWord.findByPk(wordDate);

			const hasExistingActivity = await isExistingActivity(address, wordDate, difficulty);
			if (hasExistingActivity) {
				return res.json({ status: "forbidden" });
			}

			const submissionStatus = await checkSubmission(word, difficulty, answer);
			if (submissionStatus === "correct") {
				try {
					RewardService.sendTokens(address, TOKENS_TO_SEND[difficulty]);
				} catch (error) {
					console.log(error);
				}
			}

			if (submissionStatus !== "forbidden") {
				await DbActivity.create({
					wordDate: wordDate,
					difficulty: difficulty,
					walletID: address,
				});
			}

			let returnedAnswer = null;
			if (submissionStatus !== "forbidden") {
				returnedAnswer = getAnswerByDifficulty(word, difficulty);
			}

			return res.json({ status: submissionStatus, answer: returnedAnswer });
		} else {
			res.status(400).send('Invalid signature');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
});

async function generateNewWord() {
	/* GptService should return:
	{
		"word": [word],
		"opt1": { // 4 multiple choice options
			value: [opt1]
			isAnswer: true/false
		},	
		"opt2": {
			value: [opt2]
			isAnswer: true/false
		},
		"opt3": {
			value: [opt3]
			isAnswer: true/false
		},
		"opt4": {
			value: [opt4]
			isAnswer: true/false
		},
		"pos": [pos], // part of speech
		"def": [def], // definition
	}`
	*/

	const tries = 3;
	let word;

	for (let i = 0; i < tries; i++) {
		word = await OpenAIService.generateNextWord();

		const requiredFields = ['word', 'opt1', 'opt2', 'opt3', 'opt4', 'pos', 'def'];
		const missing = requiredFields.filter((field) => !word[field]);
		const hasAllFields = missing.length === 0;
		if (!hasAllFields) continue;

		const hasCorrectAnswer = word.opt1.isAnswer || word.opt2.isAnswer || word.opt3.isAnswer || word.opt4.isAnswer;
		if (!hasCorrectAnswer) continue;

		const existingWord = await DbWord.findOne({ where: { word: word.word } });
		if (existingWord) continue;
	}

	if (!word) {
		throw new Error('Unable to generate new word');
	}

	return await DbWord.create({
		date: newDate(),
		word: word.word,
		opt1: word.opt1.value,
		opt2: word.opt2.value,
		opt3: word.opt3.value,
		opt4: word.opt4.value,
		optans: word.opt1.isAnswer ? word.opt1.value : word.opt2.isAnswer ? word.opt2.value : word.opt3.isAnswer ? word.opt3.value : word.opt4.value,
		pos: word.pos,
		def: word.def
	});
}

async function isExistingActivity(walletID, wordDate, difficulty) {
	const today = newDate();
	const formattedDate = formatDate(today);

	if (formattedDate !== wordDate) return "forbidden";

	const existingActivity = await DbActivity.findOne({
		where: {
			wordDate: formattedDate,
			difficulty: difficulty,
			walletID: walletID
		}
	});

	return existingActivity != null;
}

async function checkSubmission(word, difficulty, answer) {
	switch (difficulty) {
		case 'easy':
			return checkEasySubmission(word, answer);
		case 'medium':
			return checkMediumSubmission(word, answer);
		case 'hard':
			return await checkHardSubmission(word, answer);
		default:
			return "forbidden";
	}
}

function checkEasySubmission(word, answer) {
	return word.optans.toLowerCase() === answer.toLowerCase() ? "correct" : "incorrect";
}

function checkMediumSubmission(word, answer) {
	return word.word.toLowerCase() === answer.toLowerCase() ? "correct" : "incorrect";
}

async function checkHardSubmission(word, answer) {
	const result = await OpenAIService.calculateCorrectnessScore(word.word, answer, word.def, word.pos);
	return result.score >= 0.90 ? "correct" : "incorrect";
}

function getAnswerByDifficulty(word, difficulty) {
	return difficulty === "medium" ? word.word : word.optans;
}

function ensureRequirements(req, res, requirements) {
	const missing = requirements.filter((param) => !req.body[param]);
	if (missing.length > 0) {
		return res.status(400).send(`Missing required parameter(s): ${missing.join(', ')}`);
	}
}

function newDate() {
	const date = new Date();
	return date;
}

function formatDate(date) {
	return formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd');
}

module.exports = router;
