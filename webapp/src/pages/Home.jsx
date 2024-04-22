import React from "react";
import { Box, VStack, Text, Image, Button } from "@chakra-ui/react";
import splash from "../assets/imgs/splash.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
function Home() {
	const { user, cookieAlive } = useContext(AuthContext);
	const { onNewBook, isLoading } = useContext(BookContext);
	const navigate = useNavigate();
	
	const handleNewBook = () => {
		if (cookieAlive()){
			onNewBook();
		} else navigate("/login");
	};
	return (
		<Box p={4}>
			<VStack>
				<Image src={splash} />
				<Text
					fontSize={24}
					align={"center"}
				>
					Here, you can send your spouse LETTERS
				</Text>
				<Button
					colorScheme="orange"
					onClick={handleNewBook}
					isLoading={isLoading}
				>
					Get Started
				</Button>
			</VStack>
		</Box>
	);
}

export default Home;
