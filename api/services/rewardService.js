const { Transaction, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } = require('@solana/web3.js');
const { Connection, Keypair } = require('@solana/web3.js');
const tokenMintAddress = '7p2rajmPxWW98yZpvfGaEXZ16pwVczD6kKtCoPtejp9d';
const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const Token = require('@solana/spl-token');

const connection = new Connection('https://api.devnet.solana.com');

class RewardService {
	static async getOrCreateAssociatedTokenAccount(ownerAddress) {
		const associatedAddress = await Token.getAssociatedTokenAddress(
			ASSOCIATED_TOKEN_PROGRAM_ID,
			TOKEN_PROGRAM_ID,
			new PublicKey(tokenMintAddress),
			new PublicKey(ownerAddress)
		);

		const associatedAccountInfo = await connection.getAccountInfo(associatedAddress);
		if (!associatedAccountInfo) {
			const transaction = new Transaction().add(
				Token.createAssociatedTokenAccountInstruction(
					ASSOCIATED_TOKEN_PROGRAM_ID,
					TOKEN_PROGRAM_ID,
					new PublicKey(tokenMintAddress),
					associatedAddress,
					new PublicKey(ownerAddress),
					new PublicKey(ownerAddress)
				)
			);

			return {
				transaction,
				associatedAddress
			};
		} else {
			return {
				associatedAddress
			};
		}
	}

	static async sendTokens(recipientAddress, amount) {
		const senderPrivateKey = new Uint8Array(process.env.SOL_PRIVATE_KEY.split(','));
		const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

		const { transaction: associatedTx, associatedAddress } = await this.getOrCreateAssociatedTokenAccount(recipientAddress, tokenMintAddress);

		const transferTx = Token.createTransferInstruction(
			senderKeypair.publicKey,
			new PublicKey(associatedAddress),
			new PublicKey(recipientAddress),
			amount,
			[senderKeypair]
		);

		const combinedTransaction = new Transaction().add(associatedTx).add(transferTx);

		const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

		combinedTransaction.recentBlockhash = blockhash;
		combinedTransaction.sign(senderKeypair);

		const serializedTransaction = combinedTransaction.serialize();
		const versionedTransaction = VersionedTransaction.deserialize(serializedTransaction);

		const txid = await connection.sendTransaction(versionedTransaction);

		await connection.confirmTransaction({
			blockhash,
			lastValidBlockHeight,
			signature: txid,
		});

		return txid;
	}

	static solToLamports(solAmount) {
		return solAmount * LAMPORTS_PER_SOL;
	}
}

module.exports = { RewardService };