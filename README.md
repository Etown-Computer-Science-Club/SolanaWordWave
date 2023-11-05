# SolanaWordWave
## Description

A daily vocabulary boot on the blockchain. Learn a word a day, powered by Solana.

## Features

- Solana Blockchain Rewards: Connect your wallet to recieve token rewards for correct answers
- Decentralized Finances : Use your own Solana wallet to log in, no identifier needed.
- Mobile Compatibility : Designed with mobile devices in mind. When visiting on your mobile browser you have a simple and clean UI
- User Friendly UI : Using Chakra-UI, we created a simple and easy to use interface
- Daily Updates : Everyday the word of the day will get updated with new questions and answers.

## Team Members

- [Ethan](https://github.com/ethanlaj)
- [Steven](https://github.com/Klinefelters)
- [Toma](https://github.com/yasudat83)
- [Muz](https://github.com/muzzy3k)


## Getting Started

First, install and launch the api using the following commands:

```bash
# Clone the repository
git clone https://github.com/ethanlaj/SolanaWordWave

# Change directory
cd api

# Create .env file
touch ./.env

# Required Keys:

- SOL_PUBLIC_KEY : The public key to the Solana wallet used to distribute tokens.
- SOL_PRIVATE_KEY : The private key to the Solana wallet used to distribute tokens.
- OPEN_API_KEY : The Open AI API key for GPT 3.5 access.
- SOLWORDWAVE_DATABASE_URL : The URL to the backend database used to provide words and questions.
- PORT : 3001

# Install dependencies
npm install

# Start dev API
npm run dev
```

Then, install and launch the client using the following commands:
```bash
# Change directory
cd client

# Install dependencies
npm install

# Start dev client
npm run dev
```
