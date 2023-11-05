var express = require('express');
var router = express.Router();
const { PublicKey, sign } = require('@solana/web3.js');
const { RewardService } = require('../services/rewardService');
const DbActivity = require('../database/models/activity');
const DbWord = require('../database/models/word');

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

router.post('/submit', async function (req, res) {
	// const requiredProps = ['signature', 'address', 'message', 'wordDate', 'difficulty', 'answer'];

	try {
		const { signature, address, message, } = req.body;
		const publicKey = new PublicKey(address);

		if (sign.verify(publicKey, message, signature)) {
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

}

function formatDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

module.exports = router;
