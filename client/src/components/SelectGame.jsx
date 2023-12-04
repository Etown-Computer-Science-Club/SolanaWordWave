import React, { useState } from 'react';
import {
	Grid,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useMediaQuery,
	useDisclosure,
} from '@chakra-ui/react'
import DifficultyCard from './DifficultyCard';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

const SelectGame = () => {
	const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedDifficulty, setSelectedDifficulty] = useState('');
	const navigate = useNavigate();
	const { connected } = useWallet();

	const handleGameSelect = (difficulty) => {
		if (connected) {
			navigate(`/${difficulty}`);
		} else {
			setSelectedDifficulty(difficulty);
			onOpen();
		}
	}

	function handleContinue() {
		onClose();
		navigate(`/${selectedDifficulty}`);
	}

  return (
		<>
			<Grid
				templateColumns={isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
				gap={6}
				p={5}
				flex={1}
			>
				<DifficultyCard
					title="Easy"
					description="Select the correct answer from multiple choices."
					tokens=".001"
					handleGameSelect={() => handleGameSelect('easy')}
				/>
				<DifficultyCard
					title="Medium"
					description="Spell the word correctly after hearing it."
					tokens=".002"
					handleGameSelect={() => handleGameSelect('medium')}
				/>
				<DifficultyCard
					title="Hard"
					description="Use the word correctly in a sentence."
					tokens=".003"
					handleGameSelect={() => handleGameSelect('hard')}
				/>
			</Grid>
			<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Wallet Not Connected'}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>{'Your wallet is currently not connected. Would you like to continue without earning tokens?'}</ModalBody>

          <ModalFooter flex justifyContent='space-between'>
						<Button colorScheme='gray' mr={3} onClick={onClose}>
              Go Back
            </Button>
            <Button colorScheme='purple' mr={3} onClick={handleContinue}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
		</>
  );
};

export default SelectGame;
