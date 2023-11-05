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

export default function PopUp ({isOpen, onClose, response}) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (response.status == "correct"){
            setTitle("Congratulations")
            setMessage("Thank you for playing, you have won tokens!")
        }
        else if (response.status == "failure"){
            setTitle("Better Luck Next Time")
            setMessage(`The correct answer was ${response.answer}`)
        }
        else {
            setTitle("Error")
            setMessage("Please only sumbit an answer once")
        }
      }, [response.status]);
    
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>{message}</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}