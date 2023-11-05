import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex, Spacer, Heading, useDisclosure } from '@chakra-ui/react';
import handleSpeech from '../Speech';
import GameService from '../../services/gameService';
import useSolanaSigner from '../../hooks/useSolanaSigner'
import PopUp from './PopUp';
//import { Icon } from '@chakra-ui/react';
//import { FaMicrophone } from 'react-icons/fa';


const MediumGame = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sentence, setSentence] = useState('');
  const [buttonClicked, setButtonClicked] = useState("Speak Definition");
  const [buttonColor, setButtonColor] = useState("green");
  const [wordButtonClicked, wordSetButtonClicked] = useState("Speak Word");
  const [wordButtonColor, setWordButtonColor] = useState("green");
  const [data, setData] = useState({options: [],});
  const { address, messageToSign, getSignature } = useSolanaSigner();
  const [success, setSuccess] = useState({state: '', answer: ''});

  

  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails())
    };
    fetchData()
  }, []);

  async function onSentenceSubmit () {
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
      difficulty: "medium",
      answer: sentence
    }
    setSuccess(await GameService.submitGame(message))
    onOpen()
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Flex>
        <Spacer />
        <Heading fontSize="2xl">Medium Mode</Heading>
        <Spacer />
        </Flex>
        <Text fontSize="lg" fontWeight="bold">Remember the Word</Text>
        <Text mb={4}>Spell the word correctly after hearing it.</Text>
        <Flex columnGap="2px" alignItems="flex-end">
        <Button mt={4} colorScheme={buttonColor} onClick={() => handleSpeech(data.def, buttonClicked, setButtonClicked, setButtonColor)}>
          {buttonClicked}
        </Button>
        <Button mt={4} colorScheme={wordButtonColor} onClick={() => handleSpeech(data.word, wordButtonClicked, wordSetButtonClicked, setWordButtonColor)}>
          {wordButtonClicked}
        </Button>
      </Flex>

      <Flex alignItems="baseline">
        <Button mt={4} colorScheme="teal" onClick={() => onSentenceSubmit(sentence)}>
          Submit
        </Button>
        <Input 
          placeholder="Type your word here..."
          value={sentence}
          spellcheck="false"
          onChange={(e) => setSentence(e.target.value)}
        />
        
        
        <PopUp isOpen={isOpen} onClose={onClose} response={success}/>
      </Flex>
    </Box>
  );
};

export default MediumGame;
