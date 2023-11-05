import { Box, Radio, RadioGroup, Stack, Button, useDisclosure } from '@chakra-ui/react';
import GameService from "../../services/gameService"
import { useState, useEffect } from 'react';
import WordDescription from './WordDescription';
import PopUp from './PopUp';
import useSolanaSigner from '../../hooks/useSolanaSigner'

const EasyGame = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState({state: '', answer: ''});
	const { address, messageToSign, getSignature } = useSolanaSigner();
	
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
  
 async function onAnswerSubmit () {

    setSuccess(await GameService.submitGame(data.wordDate, "easy", selectedOption, walletID, ""))

    onOpen()
    
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Easy Mode" wordOfTheDay={data.wordOfTheDay} partOfSpeech={data.partOfSpeach} definition={data.definition} />
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
