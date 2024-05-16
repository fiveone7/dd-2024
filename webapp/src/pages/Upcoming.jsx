import { useState } from "react";
import { Box, VStack, Button, Heading, useColorModeValue, useToast, Accordion, AccordionItem, AccordionButton, AccordionPanel, HStack, Text, Container, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URLS } from "../Constants";
import axios from "axios";
import NextAppointment from "../components/upcoming/appointmentItem";
import { FaShare, FaTrash } from "react-icons/fa";
function Upcoming() {
	const { cookieAlive } = useContext(AuthContext);
	const themeColor = useColorModeValue("blue.400", "blue.300");
	const toast = useToast();
	const [appointments, setAppointments] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cookieAlive()) {
			navigate("/login");
		}
	}, [cookieAlive, navigate]);

	useEffect(() => {
		const loadUpcomingDialogues = async () => {

			if (!cookieAlive()) return;
			try {
				const response = await axios.post(API_URLS.DIALOGUE_APPOINTMENTS, {
					email: cookieAlive(),
					date: new Date()
				});
				if (response.data.success) {
					setAppointments(response.data.data);
				} else {
					toast({
						title: "Upcoming dialogues",
						description: `${response.data.message}.`,
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}
			} catch (e) {
				console.error(e);
			} finally {

			}
		};
		loadUpcomingDialogues();
	}, [cookieAlive, toast]);

	return (
		<Box p={4} w={'full'}>
			{appointments && appointments.length === 0 && (
				<VStack spacing={4}>
					<Heading>You don't have any upcoming dialogues</Heading>
					<Button colorScheme="blue" onClick={() => { navigate('/create') }}>Dialogue Now!</Button>
				</VStack>
			)}
			{appointments && appointments.length > 0 && (
				<VStack spacing={4}>
					<Button>+ New Appointment</Button>
					<Accordion allowMultiple defaultIndex={[0]}>
						{appointments.map((appointment, idx) => (
							<AccordionItem key={idx}>
								<AccordionButton bgColor={themeColor} as={Button} color={'white'}>
									<Text>{appointment.date}</Text>
								</AccordionButton>
								<AccordionPanel>
									<NextAppointment data={appointment} />
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>

				</VStack>
			)}
		</Box>
	);
}

export default Upcoming;
