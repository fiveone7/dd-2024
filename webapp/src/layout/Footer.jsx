import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
function Footer() {
	return (
		<Box
			className="App-footer"
			minH={20}
			py={8}
			px={20}
		>
			<Center>
				<Text>Copyright@2024</Text>
			</Center>
		</Box>
	);
}

export default Footer;
