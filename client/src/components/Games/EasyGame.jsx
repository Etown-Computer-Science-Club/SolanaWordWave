import React from 'react';
import { Box, Text, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react';

const EasyGame = ({ wordOfTheDay, options, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Easy Mode</Text>
      <Text fontSize="lg" fontWeight="bold">Word of the Day: {wordOfTheDay}</Text>
      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
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
