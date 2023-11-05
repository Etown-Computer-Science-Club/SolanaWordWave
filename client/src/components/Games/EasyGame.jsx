import { Box, Radio, RadioGroup, Stack, Button, useDisclosure } from '@chakra-ui/react';
import GameService from "../../services/gameService"
import { useState, useEffect } from 'react';
import WordDescription from './WordDescription';
import PopUp from './PopUp';
import useSolanaSigner from '../../hooks/useSolanaSigner'

const EasyGame = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState({state: '', answer: ''});
  const [data, setData] = useState({options: [],});
  const [selectedOption, setSelectedOption] = useState('');
	const { address, messageToSign, getSignature } = useSolanaSigner();

  useEffect(() => {
    const fetchData = async () => {setData( await GameService.getGameDetails({address: address}))};
    fetchData()
  }, []);
  
  async function onAnswerSubmit () {
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
      answer: selectedOption
    }
    setSuccess(await GameService.submitGame(message))
    onOpen()
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Easy Mode" wordOfTheDay={data.word} partOfSpeech={data.pos} definition={data.def} />
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
      <PopUp isOpen={isOpen} onClose={onClose} response={success}/>
    </Box>
  );
};

export default EasyGame;
