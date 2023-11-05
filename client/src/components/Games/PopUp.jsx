import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
  import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PopUp ({isOpen, onClose, response}) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleClose() {
      onClose();
      navigate('/', { replace: true })
    }

    useEffect(() => {
        if (response.status == "correct"){
            setTitle("Congratulations")
            setMessage("Thank you for playing, you have won tokens!")
        }
        else if (response.status == "incorrect"){
            setTitle("Better Luck Next Time")
            setMessage(`The correct answer was ${response.answer}`)
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
          
          <ModalBody>{message}</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}