import { Flex, Spinner } from '@chakra-ui/react';

function Loading() {
  return (
    <Flex grow={1} justifyContent='center' alignItems='center'>
      <Spinner 
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='#3d2c8d'
				size='xl'
			/>
    </Flex>
  );
}

export default Loading;