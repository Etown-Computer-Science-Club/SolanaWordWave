import React, { useState } from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import DifficultyCard from './DifficultyCard';
import { useNavigate } from 'react-router-dom';

const SelectGame = () => {
	const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
	const [selectedGame, setSelectedGame] = useState(null);
	const navigate = useNavigate();

  return (
		<>
			{selectedGame && <GameToRender />}
			{!selectedGame && (
				<Grid
					templateColumns={isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
					gap={6}
					p={5}
					flex={1}
				>
					<DifficultyCard
						title="Easy"
						description="Select the correct answer from multiple choices."
						tokens="10"
						handleGameSelect={() => navigate('/easy')}
					/>
					<DifficultyCard
						title="Medium"
						description="Spell the word correctly after hearing it."
						tokens="20"
						handleGameSelect={() => navigate('/medium')}
					/>
					<DifficultyCard
						title="Hard"
						description="Use the word correctly in a sentence."
						tokens="30"
						handleGameSelect={() => navigate('/hard')}
					/>
				</Grid>
			)}
		</>
  );
};

export default SelectGame;
