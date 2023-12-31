import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex, Spacer, Heading, useDisclosure, Image, Divider } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import handleSpeech from '../Speech';
import GameService from '../../services/gameService';
import useSolanaSigner from '../../hooks/useSolanaSigner'
import PopUp from './PopUp';
import Loading from '../Loading';

const MediumGame = () => {
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sentence, setSentence] = useState('');
  const [buttonClicked, setButtonClicked] = useState("Start Definition");
  const [buttonColor, setButtonColor] = useState("green");
  const [wordButtonClicked, wordSetButtonClicked] = useState("Start Word");
  const [wordButtonColor, setWordButtonColor] = useState("green");
  const [data, setData] = useState({options: [],});
  const { address, messageToSign, getSignature } = useSolanaSigner();
  const [success, setSuccess] = useState({state: '', answer: ''});
  const { connected } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      setData( await GameService.getGameDetails(connected));
      setLoading(false);
    };
    
    fetchData()
  }, []);

  async function onSentenceSubmit () {
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
        difficulty: "medium",
        answer: sentence
      }
    } else {
      message = {
        wordDate: data.date,
        difficulty: "medium",
        answer: sentence
      }
    }

    setSuccess(await GameService.submitGame(message))
    onOpen()
  }

  if (loading)
    return <Loading />

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Flex>
        <Spacer />
        <Heading fontSize="2xl">Medium Mode</Heading>
        <Spacer />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold">Remember the Word</Text>
        <Text fontSize="xl" mb={4}>Spell the word correctly after hearing it.</Text>
        <Flex columnGap="2px" alignItems="flex-end">
        <Button borderRadius ="2xl" h="30" mt={4} colorScheme={buttonColor} onClick={() => handleSpeech(data.def, buttonClicked, setButtonClicked, setButtonColor)}>
        <Image src="volume.svg" w="7" px="1" /><Text fontSize="xl">{buttonClicked}</Text>
        </Button>
        <Divider orientation='vertical' px='2' />
        <Button borderRadius ="2xl" h="30" mt={4} colorScheme={wordButtonColor} onClick={() => handleSpeech(data.word, wordButtonClicked, wordSetButtonClicked, setWordButtonColor)}>
        <Image src="volume.svg" w="7" px="1" /><Text fontSize="xl">{wordButtonClicked}</Text>
        </Button>
      </Flex>

      <Flex alignItems="baseline">
        <Button borderRadius ="2xl" h="30" mt={4} colorScheme="teal" onClick={() => onSentenceSubmit(sentence)}>
        <Text fontSize="xl">Submit</Text>
        </Button>
        <Divider orientation='vertical' px='2' />
        <Input 
          placeholder="Type your word here..."
          value={sentence}
          spellCheck="false"
          onChange={(e) => setSentence(e.target.value)}
          h="30"
          borderRadius="2xl"
        />
        
        
        <PopUp isOpen={isOpen} onClose={onClose} response={success}/>
      </Flex>
    </Box>
  );
};

export default MediumGame;
