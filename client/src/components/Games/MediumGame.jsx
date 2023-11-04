import React from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';

const MediumGame = ({ wordOfTheDay, onSentenceSubmit }) => {
  const [sentence, setSentence] = React.useState('');

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Medium Mode</Text>
      <Text fontSize="lg" fontWeight="bold">Remember the Word</Text>
      <Text mb={4}>Spell the word correctly after hearing it.</Text>
      <Input 
        placeholder="Type your sentence here..."
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />
      <Button mt={4} colorScheme="teal" onClick={() => onSentenceSubmit(sentence)}>
        Submit
      </Button>
    </Box>
  );
};

export default MediumGame;
