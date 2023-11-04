import { Box, Flex, Spacer, Heading, Text } from "@chakra-ui/react";

export default function WordDescription({ name, wordOfTheDay, partOfSpeech, definition }) {
  return (
    <Box>
      <Flex>
        <Spacer />
        <Heading fontSize="2xl">{name}</Heading>
        <Spacer />
      </Flex>
      <Text fontSize="lg" py="2"></Text>
      <Text fontSize="lg" fontWeight="bold" py="2">Word of the Day: {wordOfTheDay}</Text>
      <Text fontSize="md" py="2">{partOfSpeech}: {definition}</Text>
    </Box>
  );
}
