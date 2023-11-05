var express = require('express');
var router = express.Router();
const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const { RewardService } = require('../services/rewardService');
const DbActivity = require('../database/models/activity');
const DbWord = require('../database/models/word');
const OpenAIService = require('../services/openAIService');

router.get('/', async function (_req, res) {
	const today = new Date();
	const formattedDate = formatDate(today);

	try {
		const word = await DbWord.findByPk(formattedDate,
			{
				attributes: ['date', 'word', 'opt1', 'opt2', 'opt3', 'opt4', 'pos', 'def']
			});

		if (word) {
			res.json(word);
		} else {
			res.status(404).json({ message: 'Word not found for today' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/', async function (req, res) {
	// const requiredProps = ['signature', 'address', 'message', 'wordDate', 'difficulty', 'answer'];

	try {
		const { signature, address, message } = req.body;

		const decodedPublicKey = new PublicKey(address).toBuffer();
		const decodedMessage = Buffer.from(message, 'utf8');
		const decodedSignature = Buffer.from(signature, 'base64');

		const isValid = nacl.sign.detached.verify(decodedMessage, decodedSignature, decodedPublicKey);

		if (isValid) {
			checkSubmission(walletID, difficulty, answer);

			await RewardService.sendTokens(address, 10);
			res.send('Token awarded!');
		} else {
			res.status(400).send('Invalid signature');
		}
	} catch (error) {
		console.log(error)
	}
});

function checkSubmission(walletID, difficulty, answer) {
	const today = new Date();
	const formattedDate = formatDate(today);

	const existingActivity = DbActivity.findOne({
		where: {
			wordDate: formattedDate,
			difficulty: difficulty,
			walletID: walletID
		}
	});

	if (existingActivity)
		return false;

	const word = DbWord.findByPk(formattedDate);

	switch (difficulty) {
		case 'easy':
			return checkEasySubmission(word, answer);
		case 'medium':
			return checkMediumSubmission(word, answer);
		case 'hard':
			return checkHardSubmission(word, answer);
		default:
			return false;
	}

}

function checkEasySubmission(word, answer) {
	return word.optans === answer;
}

function checkMediumSubmission(word, answer) {
	return word.word === answer;
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
