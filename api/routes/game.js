var express = require('express');
var router = express.Router();
const solanaWeb3 = require('@solana/web3.js');
const { PublicKey, sign } = require('@solana/web3.js');
const { RewardService } = require('../services/rewardService');

router.post('/submit', async function (req, res) {
	const { signature, address, message } = req.body;
	await RewardService.sendTokens(address, 1);

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
