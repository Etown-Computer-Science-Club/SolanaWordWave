const { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } = require('@solana/web3.js');
const { Connection } = require('@solana/web3.js');
const { Keypair } = require('@solana/web3.js');

const connection = new Connection('https://api.devnet.solana.com');

class RewardService {
	static async sendTokens(recipientAddress, solAmount) {
		const senderPrivateKey = new Uint8Array(process.env.SOL_PRIVATE_KEY.split(','));
		const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: senderKeypair.publicKey,
				toPubkey: new PublicKey(recipientAddress),
				lamports: this.solToLamports(solAmount),
			})
		);

		const latestBlockhashInfo = await connection.getLatestBlockhash();
		transaction.recentBlockhash = latestBlockhashInfo.blockhash;

		transaction.sign(senderKeypair);

		const serializedTransaction = transaction.serialize();
		const versionedTransaction = VersionedTransaction.deserialize(serializedTransaction);

		const txid = await connection.sendTransaction(versionedTransaction);

		await connection.confirmTransaction({
			blockhash: latestBlockhashInfo.blockhash,
			lastValidBlockHeight: latestBlockhashInfo.lastValidBlockHeight,
			signature: txid,
		});

		return txid;
	}

	static solToLamports(solAmount) {
		return solAmount * LAMPORTS_PER_SOL;
	}
}

module.exports = { RewardService };