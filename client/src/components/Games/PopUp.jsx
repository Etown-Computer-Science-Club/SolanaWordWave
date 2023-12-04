import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

export default function PopUp ({isOpen, onClose, response}) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const navigate = useNavigate();
    const { connected } = useWallet();

    function handleClose() {
      onClose();
      navigate('/', { replace: true })
    }

    useEffect(() => {
        if (response.status == "correct"){
            setTitle("Congratulations")
            setMessage(`Thank you for playing, ${connected ? 'you have won tokens' : 'your answer was correct'}!`)
        }
        else if (response.status == "incorrect"){
            setTitle("Better Luck Next Time")
            setMessage(`The correct answer was:`)
            setCorrectAnswer(response.answer)
        }
        else {
            setTitle("Error")
            setMessage("Please only submit an answer once")
        }
      }, [response.status]);
    
    
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Text>{message}</Text>
            <Text>{correctAnswer}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}