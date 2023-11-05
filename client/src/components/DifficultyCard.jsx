import React from 'react';
import {
  Box,
  Text,
  Button,
  Heading,
  Image,
  Spacer,
  Flex
} from '@chakra-ui/react';

const DifficultyCard = ({ title, description, tokens, handleGameSelect }) => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			p={5}
			boxShadow="md"
			textAlign="center"
			height="100%"
		>
			<Heading size="md" mb={4}>{title}</Heading>
			<Text mb={6}>{description}</Text>
			<Text fontSize="2xl" fontWeight="bold" mb={4}>
				Win {tokens} tokens
			</Text>
			<Flex my="8">
				<Spacer/>
				<Flex bg="#c8c8c8" borderRadius="2xl" w="25vh" h="25vh" justifyContent="center">
					<Image h="25vh" py="4" src={`/${title}.svg`} fill="blue"/>
				</Flex>
				<Spacer/>
			</Flex >
			<Button colorScheme="purple" onClick={handleGameSelect}>Choose {title}</Button>
		</Box>
	);
};

export default DifficultyCard;