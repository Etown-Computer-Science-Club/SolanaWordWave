import { Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown";

function Navbar() {
	const navigate = useNavigate();
	const [isSmallScreen] = useMediaQuery('(max-width: 900px)');

  return (
    <Flex boxShadow="md" p="4" bgColor="#3d2c8d" justifyContent='space-between' alignItems='center'>
      	<Flex p="2" alignItems='center' gap='5px'>
			<Image src='/LogoWithTextTransparent.png' width='25' height='25'/>
			<Text 
				fontSize='lg' 
				fontWeight='bold' 
				onClick={() => navigate("/")}
				_hover={{ cursor: "pointer" }
			}>
				WordWave
			</Text>
		</Flex>
		{!isSmallScreen && <Countdown /> }
		
		<WalletMultiButton />
    </Flex>
  );
}

export default Navbar;