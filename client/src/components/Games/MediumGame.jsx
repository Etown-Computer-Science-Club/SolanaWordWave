import { useState } from 'react';
import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import handleSpeech from '../Speech';

const MediumGame = ({ wordOfTheDay, onSentenceSubmit }) => {
  const [sentence, setSentence] = useState('');
  //const sentences = "Hello Hello Hello"

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Medium Mode</Text>
      <Text fontSize="lg" fontWeight="bold">Remember the Word</Text>
      <Text mb={4}>Spell the word correctly after hearing it.</Text>
      <Flex columnGap="2px" alignItems="flex-end">
      <Button mt={4} colorScheme='red' onClick={() => handleSpeech(sentence)}>
        Speak
      </Button>
      <Input 
        placeholder="Type your sentence here..."
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />
      </Flex>
      <Button mt={4} colorScheme="teal" onClick={() => onSentenceSubmit(sentence)}>
        Submit
      </Button>
    </Box>
  );
};

export default MediumGame;
