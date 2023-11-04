import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack, Button, Heading, Flex, Spacer } from '@chakra-ui/react';

const EasyGame = () => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const wordOfTheDay = "Velocity"
  const options = [
    "The car's velocity steadily increased as it accelerated down the highway",
    "The velocity of the soccer ball is very round.",
    "I can't believe the velocity of that delicious pizza, it's so cheesy",
    "Her velocity of cooking skills is impressive; she makes the best lasagna."
  ]
  const partOfSpeach = "Noun"
  const definition = "Velocity is a measure of an object's speed in a specific direction. It is a vector quantity that describes the rate of change of an object's position with respect to time and includes both the magnitude and direction of motion. Velocity is commonly expressed in units like meters per second (m/s) in the International System of Units (SI) and is essential in the field of physics to describe the motion of objects."
  const wordDate = new Date();
  const walletID = ""
  
  function onAnswerSubmit () {
    const now = new Date();
    const data = {
      word: wordOfTheDay,
      difficulty: "easy",
      answer: selectedOption,
      wordDate: wordDate,
      walletID: walletID
    }
    console.log(`word: ${data.word} | diff: ${data.difficulty} | ans: ${data.answer} | `)
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Flex>
        <Spacer />
        <Heading fontSize="2xl">Easy Mode</Heading>
        <Spacer />
      </Flex>
      <Text  fontSize="lg" py="2"></Text>
      <Text fontSize="lg" fontWeight="bold" py="2">Word of the Day: {wordOfTheDay}</Text>
      <Text fontSize="md" py="2">{partOfSpeach}: {definition}</Text>
      <RadioGroup onChange={setSelectedOption} value={selectedOption} py="2">
        <Stack direction="column">
          {options.map((option, index) => (
            <Radio value={option} key={index}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button mt={4} colorScheme="teal" onClick={() => onAnswerSubmit(selectedOption)}>
        Submit
      </Button>
    </Box>
  );
};

export default EasyGame;
