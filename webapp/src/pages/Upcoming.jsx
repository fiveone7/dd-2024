import { useState } from "react";
import { Box, VStack, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
function Upcoming() {
	const { cookieAlive } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [upcoming, setUpcoming] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
        if (!cookieAlive()) {
            navigate("/login");
        }
    }, [cookieAlive, navigate]);

	return (
		<Box p={4}>
			<VStack spacing={4}>
				{upcoming && upcoming.length === 0 && (
					<Heading>You don't have any upcoming dialogues</Heading>
				)}
				<Button colorScheme="blue" onClick={()=>{navigate('/create')}}>Dialogue Now !</Button>
			</VStack>
		</Box>
	);
}

export default Upcoming;
