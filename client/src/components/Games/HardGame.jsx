import React from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';

const HardGame = ({ onDefinitionSubmit }) => {
  const [definition, setDefinition] = React.useState('');

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Hard Mode: Use the Word</Text>
      <Text mb={4}>Use the word correctly in a sentence.</Text>
      <Input 
        placeholder="Type your definition here..."
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      <Button mt={4} colorScheme="teal" onClick={() => onDefinitionSubmit(definition)}>
        Submit
      </Button>
    </Box>
  );
};

export default HardGame;
