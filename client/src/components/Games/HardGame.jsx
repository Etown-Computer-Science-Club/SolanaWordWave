import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, useDisclosure } from '@chakra-ui/react';
import WordDescription from './WordDescription';
import GameService from '../../services/gameService';
import PopUp from './PopUp';

const HardGame = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState({state: '', answer: ''});

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
  
  async function onDefinitionSubmit () {
    setSuccess(await GameService.submitGame(data.wordDate, "easy", answer, walletID, ""))
    onOpen()
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
      <PopUp isOpen={isOpen} onClose={onClose} response={success}/>
    </Box>
  );
};

export default HardGame;
