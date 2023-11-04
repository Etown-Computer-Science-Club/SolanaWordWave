import { useState } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import WordDescription from './WordDescription';

const HardGame = () => {
  const [answer, setAnswer] = useState('');
  const wordOfTheDay = "Velocity"
  const partOfSpeech = "Noun"
  const definition = "Velocity is a measure of an object's speed in a specific direction. It is a vector quantity that describes the rate of change of an object's position with respect to time and includes both the magnitude and direction of motion. Velocity is commonly expressed in units like meters per second (m/s) in the International System of Units (SI) and is essential in the field of physics to describe the motion of objects."
  const wordDate = new Date();
  const walletID = ""
  
  function onDefinitionSubmit () {
    const data = {
      word: wordOfTheDay,
      difficulty: "hard",
      answer: answer,
      wordDate: wordDate,
      walletID: walletID
    }
    console.log(`word: ${data.word} | diff: ${data.difficulty} | ans: ${data.answer} | `)
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Hard Mode" wordOfTheDay={wordOfTheDay} partOfSpeech={partOfSpeech} definition={definition} />
      <Text mb={4}>Use the word correctly in a sentence.</Text>
      <Input 
        placeholder="Type your definition here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button mt={4} colorScheme="teal" onClick={() => onDefinitionSubmit(answer)}>
        Submit
      </Button>
    </Box>
  );
};

export default HardGame;
