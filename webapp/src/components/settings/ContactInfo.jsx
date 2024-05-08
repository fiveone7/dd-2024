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
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { API_URLS } from "../../Constants";

function ContactInfo() {
	const { cookieAlive } = useContext(AuthContext);
	const { contactInfo, setContactInfo } = useContext(AppContext);
	const [isSaving, setIsSaving] = useState(false);
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
			if (!cookieAlive()) return;
			try {
				const response = await axios.post(API_URLS.CONTACT_INFO, {
					email: cookieAlive(),
				});
				if (response.data.success) {
					const contact = response.data.data.contact;
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
			} catch (e) {
				console.error(e);
			}
		};
		loadContact();
	}, [cookieAlive, setContactInfo, toast]);

	const handleSave = async () => {
		try {
			if (!validateInfo(contactInfo)) {
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
			const response = await axios.post(API_URLS.CONTACT_UPDATE, contactInfo);

			if (response.data.success) {
				toast({
					title: "Contact Information",
					description: `${response.data.message}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Contact Information",
					description: `${response.data.message}.`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Card minH={"600px"} w={'full'}>
			<CardHeader>Your Information</CardHeader>
			<CardBody>
				<VStack>
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Input
							type="text"
							placeholder="Gary F Moody"
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									myName: e.target.value
								})
							}}
							defaultValue={contactInfo['myName']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="grayfmoody@gmail.com"
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									myEmail: e.target.value
								})
							}}
							defaultValue={contactInfo['myEmail']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="text"
							placeholder="1 (734) 558-3535"
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									myNumber: e.target.value
								})
							}}
							defaultValue={contactInfo['myNumber']}
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
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									spouseName: e.target.value
								})
							}}
							defaultValue={contactInfo['spouseName']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="denismoody@gmail.com"
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									spouseEmail: e.target.value
								})
							}}
							defaultValue={contactInfo['spouseEmail']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="text"
							placeholder="1 (734) 558-3535"
							onChange={(e) =>{
								setContactInfo({
									...contactInfo,
									spouseNumber: e.target.value
								})
							}}
							defaultValue={contactInfo['spouseNumber']}
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
