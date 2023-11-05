import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, useDisclosure } from '@chakra-ui/react';
import WordDescription from './WordDescription';
import GameService from '../../services/gameService';
import PopUp from './PopUp';
import useSolanaSigner from '../../hooks/useSolanaSigner'

const HardGame = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState({state: '', answer: ''});

  const [answer, setAnswer] = useState('');
  const [data, setData] = useState({
    options: [],
  });
	const { address, messageToSign, getSignature } = useSolanaSigner();


  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails())
    };
    fetchData()
  }, []);
  const walletID = ""
  
  async function onDefinitionSubmit () {
    const signature = await getSignature()

    if (!signature){
      console.error("Failed to get signature from user")
      return;
    }

    const message = {
      signature: signature,
      address: address,
      message: messageToSign,
      wordDate: data.date,
      difficulty: "easy",
      answer: answer
    }
    setSuccess(await GameService.submitGame(message))
    onOpen()
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Hard Mode" wordOfTheDay={data.word} partOfSpeech={data.pos} definition={data.def} />
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
