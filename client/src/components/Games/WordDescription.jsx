import { Box, Flex, Spacer, Heading, Text } from "@chakra-ui/react";

export default function WordDescription({ name, wordOfTheDay, partOfSpeech, definition }) {
  return (
    <Box>
      <Flex>
        <Spacer />
        <Heading fontSize="2xl">{name}</Heading>
        <Spacer />
      </Flex>
      <Text fontSize="2xl" py="2"></Text>
      <Text fontSize="2xl" fontWeight="bold" py="2">Word of the Day: {wordOfTheDay}</Text>
      <Text fontSize="xl" py="2">{partOfSpeech}: {definition}</Text>
    </Box>
  );
}
