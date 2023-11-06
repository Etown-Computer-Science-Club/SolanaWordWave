import React, { useState } from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import DifficultyCard from './DifficultyCard';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

const SelectGame = () => {
	const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
	const navigate = useNavigate();
	const { connected } = useWallet();

	const handleGameSelect = (difficulty) => {
		if (connected) {
			navigate(`/${difficulty}`);
		} else {
			alert('Please connect your wallet to play!');
		}
	}

  return (
		<>
			<Grid
				templateColumns={isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
				gap={6}
				p={5}
				flex={1}
			>
				<DifficultyCard
					title="Easy"
					description="Select the correct answer from multiple choices."
					tokens=".001"
					handleGameSelect={() => handleGameSelect('easy')}
				/>
				<DifficultyCard
					title="Medium"
					description="Spell the word correctly after hearing it."
					tokens=".002"
					handleGameSelect={() => handleGameSelect('medium')}
				/>
				<DifficultyCard
					title="Hard"
					description="Use the word correctly in a sentence."
					tokens=".003"
					handleGameSelect={() => handleGameSelect('hard')}
				/>
			</Grid>
		</>
  );
};

export default SelectGame;
