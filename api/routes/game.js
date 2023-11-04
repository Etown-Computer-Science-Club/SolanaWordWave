var express = require('express');
var router = express.Router();
const solanaWeb3 = require('@solana/web3.js');
const { PublicKey, sign } = require('@solana/web3.js');
const { RewardService } = require('../services/rewardService');

router.post('/submit', function (req, res) {
	try {
		const { signature, address, message } = req.body;
		RewardService.sendTokens(address, 10);
	} catch (error) {
		console.log(error)
	}

	return res.send('Token awarded!');

	// const { signature, address, message } = req.body;
	// const publicKey = new PublicKey(address);
	// if (sign.verify(publicKey, message, signature)) {
	// RewardService.sendTokens(address, 10);
	// 	res.send('Token awarded!');
	// } else {
	// 	res.status(400).send('Invalid signature');
	// }
});

module.exports = router;
