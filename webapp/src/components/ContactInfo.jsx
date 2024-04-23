import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	FormControl,
	FormLabel,
	Input,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { AppContext } from "../providers/AppProvider";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { API_URLS } from "../Constants";

function ContactInfo() {
	const { cookieAlive } = useContext(AuthContext);
	const { setContactInfo } = useContext(AppContext);
	const [isSaving, setIsSaving] = useState(false);
	const [myName, setMyName] = useState('');
	const [myEmail, setMyEmail] = useState(cookieAlive());
	const [myNumber, setMyNumber] = useState("");
	const [spouseName, setSpouseName] = useState("");
	const [spouseEmail, setSpouseEmail] = useState("");
	const [spouseNumber, setSpouseNumber] = useState("");
	const toast = useToast();

	const validateInfo = (contact) => {
		if (!contact) {
			return true;
		} else {
			const keys = Object.keys(contact);
			for (let i = 0; i < keys.length; i++) {
				if (!contact[keys[i]] || contact[keys[i]] === "") {
					return false;
				}
			}
			return true;
		}
	};

	useEffect(() => {
		const loadContact = async () => {
			try {
				const response = await axios.post(
					API_URLS.CONTACT_INFO,
					{email: cookieAlive()}
				);
				if (response.data.success) {
					const contact = response.data.data.contact; 
					setContactInfo(contact);
					setMyName(contact['myName']);
					setMyEmail(contact['myEmail']);
					setMyNumber(contact['myNumber']);
					setSpouseName(contact['spouseName']);
					setSpouseEmail(contact['spouseEmail']);
					setSpouseNumber(contact['spouseNumber']);
				} else {
					toast({
						title: "Contact Information",
						description: `${response.data.message}.`,
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}
			} catch (e) {
				console.error(e);
			}
		};
		loadContact();
	}, [cookieAlive, setContactInfo, toast]);

	const handleSave = async () => {
		try {
			const contact = {
				myName,
				myEmail,
				myNumber,
				spouseName,
				spouseEmail,
				spouseNumber,
			};
			if (!validateInfo(contact)) {
				toast({
					title: "Contact Information",
					description: `Please check the input fields.`,
					status: "warning",
					duration: 3000,
					isClosable: true,
				});
				return;
			}
			setIsSaving(true);
			const response = await axios.post(API_URLS.CONTACT_UPDATE, contact);

			if (response.data.success) {
				toast({
					title: "Contact Information",
					description: `${response.data.message}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				setContactInfo(contact);
			} else {
				toast({
					title: "Contact Information",
					description: `${response.data.message}.`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
			setIsSaving(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card minH={"600px"}>
			<CardHeader>Your Information</CardHeader>
			<CardBody>
				<VStack>
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Input
							type="text"
							placeholder="Gary F Moody"
							onChange={(e) => setMyName(e.target.value)}
							defaultValue={myName}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="grayfmoody@gmail.com"
							onChange={(e) => setMyEmail(e.target.value)}
							defaultValue={myEmail}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="text"
							placeholder="1 (734) 558-3535"
							onChange={(e) => setMyNumber(e.target.value)}
							defaultValue={myNumber}
						/>
					</FormControl>
				</VStack>
			</CardBody>
			<CardHeader>Spouse Information</CardHeader>
			<CardBody>
				<VStack>
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Input
							type="text"
							placeholder="Denis Moody"
							onChange={(e) => setSpouseName(e.target.value)}
							defaultValue={spouseName}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="denismoody@gmail.com"
							onChange={(e) => setSpouseEmail(e.target.value)}
							defaultValue={spouseEmail}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="text"
							placeholder="1 (734) 558-3535"
							onChange={(e) => setSpouseNumber(e.target.value)}
							defaultValue={spouseNumber}
						/>
					</FormControl>
				</VStack>
			</CardBody>
			<CardFooter>
				<Button
					w="full"
					leftIcon={<FaSave />}
					onClick={handleSave}
					isLoading={isSaving}
				>
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}

export default ContactInfo;
