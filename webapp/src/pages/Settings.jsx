import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Grid,
	GridItem,
	VStack,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	FaBriefcase,
	FaClock,
	FaKey,
	FaTerminal,
	FaUser,
} from "react-icons/fa";
import ContactInfo from "../components/ContactInfo";
import { AuthContext } from "../providers/AuthProvider";
import Appointment from "../components/Appointment";
import Timers from "../components/Timers";
import Words from "../components/Words";
function Settings() {
	const { cookieAlive } = useContext(AuthContext);
	const [contentOpened, setContentOpened] = useState(1);
	const navigate = useNavigate();
	const handleContentHeader = (title, itemIdx) => {
		setContentOpened(itemIdx);
	};

	useEffect(() => {
		if (!cookieAlive()) {
			navigate("/login");
		}
	}, [cookieAlive, navigate]);

	return (
		<Box w={"full"}>
			<Grid
				templateRows={"repeat(1, 1fr)"}
				templateColumns={"repeat(3, 1fr)"}
				gap={4}
			>
				<GridItem
					rowSpan={1}
					colSpan={1}
					w={'full'}
				>
					<Card
						w={"full"}
						minH={"600px"}
					>
						<CardHeader>Settings</CardHeader>
						<CardBody>
							<VStack
								w={"full"}
								align={"start"}
							>
								<Button
									leftIcon={<FaUser />}
                                    colorScheme={contentOpened === 1 ? 'blue' : 'gray' }
									w={"full"}
									onClick={(e) =>
										handleContentHeader(
											e.target.innerText,
											1
										)
									}
								>
									Contact Information
								</Button>
								<Button
									leftIcon={<FaBriefcase />}
                                    colorScheme={contentOpened === 2 ? 'blue' : 'gray' }
									w={"full"}
									onClick={(e) =>
										handleContentHeader(
											e.target.innerText,
											2
										)
									}
								>
									Appointment Defaults
								</Button>
								<Button
									leftIcon={<FaClock />}
                                    colorScheme={contentOpened === 3 ? 'blue' : 'gray' }
									w={"full"}
									onClick={(e) =>
										handleContentHeader(
											e.target.innerText,
											3
										)
									}
								>
									Timer Defaults
								</Button>
								<Button
									leftIcon={<FaTerminal />}
                                    colorScheme={contentOpened === 4 ? 'blue' : 'gray' }
									w={"full"}
									onClick={(e) =>
										handleContentHeader(
											e.target.innerText,
											4
										)
									}
								>
									Email Wordings
								</Button>
							</VStack>
						</CardBody>
						<CardHeader>Security</CardHeader>
						<CardBody>
							<Button
								leftIcon={<FaKey />}
                                colorScheme={contentOpened === 5 ? 'blue' : 'gray' }
								w={"full"}
								onClick={(e) =>
									handleContentHeader(e.target.innerText, 5)
								}
							>
								Reset Password
							</Button>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={2}
					w={'full'}
				>
					{contentOpened === 1 && <ContactInfo />}
					{contentOpened === 2 && <Appointment/>}
					{contentOpened === 3 && <Timers/>}
					{contentOpened === 4 && <Words/>}
				</GridItem>
			</Grid>
		</Box>
	);
}

export default Settings;
