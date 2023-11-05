import { Box, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react';
import GameService from "../../services/gameService"
import { useState, useEffect } from 'react';
import WordDescription from './WordDescription';

const EasyGame = () => {
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

  const [selectedOption, setSelectedOption] = useState('');
  const walletID = ""
  
  function onAnswerSubmit () {
    const returned = {
      word: data.wordOfTheDay,
      difficulty: "easy",
      answer: selectedOption,
      wordDate: data.wordDate,
      walletID: walletID
    }
    console.log(`word: ${returned.word} | diff: ${returned.difficulty} | ans: ${returned.answer} | `)
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Hard Mode" wordOfTheDay={data.wordOfTheDay} partOfSpeech={data.partOfSpeach} definition={data.definition} />
      <RadioGroup onChange={setSelectedOption} value={selectedOption} py="2">
        <Stack direction="column">
          {data.options.map((option, index) => (
            <Radio value={option} key={index}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button mt={4} colorScheme="teal" onClick={() => onAnswerSubmit(selectedOption)}>
        Submit
      </Button>
    </Box>
  );
};

export default EasyGame;
