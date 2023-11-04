import { Flex, Text, Image } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Navbar() {
  return (
    <Flex boxShadow="md" p="4" bgColor="#3d2c8d" justifyContent='space-between' alignItems='center'>
      <Flex p="2" alignItems='center' gap='5px'>
				<Image src='/LogoWithTextTransparent.png' width='25' height='25'/>
				<Text fontSize='lg' fontWeight='bold'>SolWordWave</Text>
			</Flex>
			<WalletMultiButton />
    </Flex>
  );
}

export default Navbar;