var express = require('express');
var router = express.Router();
const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const { RewardService } = require('../services/rewardService');
const DbActivity = require('../database/models/activity');
const DbWord = require('../database/models/word');
const OpenAIService = require('../services/openAIService');

const TOKENS_TO_SEND = {
	'easy': 2,
	'medium': 4,
	'hard': 6,
};

router.post('/', async function (_req, res) {
	const today = new Date();
	const formattedDate = formatDate(today);

	try {
		const word = await DbWord.findByPk(formattedDate,
			{
				attributes: ['date', 'word', 'opt1', 'opt2', 'opt3', 'opt4', 'pos', 'def']
			});

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

router.post('/submit', async function (req, res) {
	try {
		const { signature, address, message, wordDate, difficulty, answer } = req.body;

		const decodedPublicKey = new PublicKey(address).toBuffer();
		const decodedMessage = Buffer.from(message, 'utf8');
		const decodedSignature = Buffer.from(signature, 'base64');

		const isValid = nacl.sign.detached.verify(decodedMessage, decodedSignature, decodedPublicKey);

		if (isValid) {
			const submissionStatus = checkSubmission(address, wordDate, difficulty, answer);
			if (submissionStatus === "correct") {
				await RewardService.sendTokens(address, TOKENS_TO_SEND[difficulty]);
			}

			return {

			}

			DbActivity.create({
				wordDate: wordDate,
				difficulty: difficulty,
				walletID: address,

			})

			return res.json({ status: submissionStatus });
		} else {
			res.status(400).send('Invalid signature');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
});

function checkSubmission(walletID, wordDate, difficulty, answer) {
	const today = new Date();
	const formattedDate = formatDate(today);

	if (formattedDate !== wordDate) return "forbidden";

	const existingActivity = DbActivity.findOne({
		where: {
			wordDate: formattedDate,
			difficulty: difficulty,
			walletID: walletID
		}
	});

	if (existingActivity) return "forbidden";

	const word = DbWord.findByPk(formattedDate);

	switch (difficulty) {
		case 'easy':
			return checkEasySubmission(word, answer);
		case 'medium':
			return checkMediumSubmission(word, answer);
		case 'hard':
			return checkHardSubmission(word, answer);
		default:
			return "forbidden";
	}
}

function checkEasySubmission(word, answer) {
	return word.optans === answer ? "correct" : "incorrect";
}

function checkMediumSubmission(word, answer) {
	return word.word === answer ? "correct" : "incorrect";
}

function checkHardSubmission(word, answer) {
	const result = OpenAIService.calculateCorrectnessScore(answer, word.def, word.pos);
	console.log(result)
	return result;
}

function formatDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

module.exports = router;
