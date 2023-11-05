import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex, Spacer, Heading } from '@chakra-ui/react';
import handleSpeech from '../Speech';
import GameService from '../../services/gameService';
//import { Icon } from '@chakra-ui/react';
//import { FaMicrophone } from 'react-icons/fa';


const MediumGame = () => {
  const [sentence, setSentence] = useState('');
  const [buttonClicked, setButtonClicked] = useState("Speak Definition");
  const [buttonColor, setButtonColor] = useState("green");
  const [wordButtonClicked, wordSetButtonClicked] = useState("Speak Word");
  const [wordButtonColor, setWordButtonColor] = useState("green");
  const [data, setData] = useState({
    options: [],
  });
  const walletID = ""
  

  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails())
    };
    fetchData()
  }, []);

  function onSentenceSubmit (sentence) {
    const returned = {
      word: data.wordOfTheDay,
      difficulty: "medium",
      answer: sentence,
      wordDate: data.wordDate,
      walletID: walletID
    }
    console.log(`word: ${returned.word} | diff: ${returned.difficulty} | ans: ${returned.answer} | `)
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
      <Button mt={4} colorScheme={buttonColor} onClick={() => handleSpeech(data.definition, buttonClicked, setButtonClicked, setButtonColor)}>
        {buttonClicked}
      </Button>
      <Button mt={4} colorScheme={wordButtonColor} onClick={() => handleSpeech(data.wordOfTheDay, wordButtonClicked, wordSetButtonClicked, setWordButtonColor)}>
        {wordButtonClicked}
      </Button>
      
      <Input 
        placeholder="Type your word here..."
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
