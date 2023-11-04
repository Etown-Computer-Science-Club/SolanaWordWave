import React from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import DifficultyCard from './DifficultyCard';

const SelectGame = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');

  return (
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
      />
      <DifficultyCard
        title="Medium"
        description="Use the word correctly in a sentence."
        tokens="20"
      />
      <DifficultyCard
        title="Hard"
        description="Spell the word correctly after hearing it."
        tokens="30"
      />
    </Grid>
  );
};

export default SelectGame;
