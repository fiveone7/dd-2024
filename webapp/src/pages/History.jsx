import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
function History() {
	const { cookieAlive } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
        if (!cookieAlive()) {
            navigate("/login");
        }
    }, [cookieAlive, navigate]);
	return (
		<Box p={4}>
			<VStack>
				
			</VStack>
		</Box>
	);
}

export default History;
