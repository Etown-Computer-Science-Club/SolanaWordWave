import { useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";

function useSolanaSigner() {
	const { connected, publicKey } = useWallet();
	const [messageToSign] = useState("Please sign this message to verify your identity.");
	const address = publicKey?.toString() || "";

	async function getSignature() {
		if (!connected || !window.solana?.signMessage) {
			throw new Error("Wallet is not connected or doesn't support message signing");
		}

		const messageBuffer = Buffer.from(messageToSign);
		const { signature } = await window.solana.signMessage(messageBuffer, "utf8");

		return signature;
	}

	return {
		address,
		messageToSign,
		getSignature
	};
}

export default useSolanaSigner;
