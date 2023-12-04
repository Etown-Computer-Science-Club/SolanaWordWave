import { Box, Radio, RadioGroup, Stack, Button, useDisclosure, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import GameService from "../../services/gameService"
import WordDescription from './WordDescription';
import PopUp from './PopUp';
import useSolanaSigner from '../../hooks/useSolanaSigner'
import Loading from '../Loading';


const EasyGame = () => {
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState({state: '', answer: ''});
  const [data, setData] = useState({options: [],});
  const [selectedOption, setSelectedOption] = useState('');
  const { connected } = useWallet();
	const { address, messageToSign, getSignature } = useSolanaSigner();

  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails(connected, { address: address }));
      setLoading(false);
    };
    
    fetchData()
  }, []);
  
  async function onAnswerSubmit () {
    let message;

    if (connected) {
      const signature = await getSignature()

      if (!signature){
        console.error("Failed to get signature from user")
        return;
      }

      message = {
        signature: signature,
        address: address,
        message: messageToSign,
        wordDate: data.date,
        difficulty: "easy",
        answer: selectedOption
      }
    } else {
      message = {
        address: address,
        wordDate: data.date,
        difficulty: "easy",
        answer: selectedOption
      }
    }

    setSuccess(await GameService.submitGame(message))
    onOpen()
  }

  if (loading)
    return <Loading />

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <WordDescription name="Easy Mode" wordOfTheDay={data.word} partOfSpeech={data.pos} definition={data.def} />
      <Text fontSize="xl" py="2">Select the sentence that uses the word correctly:</Text>
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
