import { useState } from "react";
import { Box, VStack, Text, Image, Button } from "@chakra-ui/react";
import splash from "../assets/imgs/splash.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
function Home() {
	const { cookieAlive } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	
	const handleNewDialogue = () => {
		setIsLoading(true);
		if (cookieAlive()){
			console.log('Edit')
		} else navigate("/login");
		setIsLoading(false);
	};
	return (
		<Box p={4}>
			<VStack>
				<Image src={splash} h={'600px'}/>
				<Text
					fontSize={24}
					align={"center"}
				>
					Here, you can send your spouse LETTERS
				</Text>
				<Button
					colorScheme="blue"
					onClick={handleNewDialogue}
					isLoading={isLoading}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;