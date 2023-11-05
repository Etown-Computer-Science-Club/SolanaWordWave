import { useState, useEffect } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import WordDescription from './WordDescription';
import GameService from '../../services/gameService';

const HardGame = () => {
  const [answer, setAnswer] = useState('');
  const [data, setData] = useState({
    options: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails())
      console.log(data);
    };
    fetchData()
  }, []);
  const walletID = ""
  
  function onDefinitionSubmit () {
    const returned = {
      word: data.wordOfTheDay,
      difficulty: "hard",
      answer: answer,
      wordDate: data.wordDate,
      walletID: walletID
    }
    console.log(`word: ${returned.word} | diff: ${returned.difficulty} | ans: ${returned.answer} | `)
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Hard Mode" wordOfTheDay={data.wordOfTheDay} partOfSpeech={data.partOfSpeach} definition={data.definition} />
      <Text mb={4}>Use the word correctly in a sentence.</Text>
      <Input 
        placeholder="Type your sentence here..."
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
