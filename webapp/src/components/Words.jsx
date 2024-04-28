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

function Words() {
	const { cookieAlive } = useContext(AuthContext);
	const { words, setWords } = useContext(AppContext);
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
		const loadWords = async () => {
			if (!cookieAlive()) return;
			try {
				const response = await axios.post(API_URLS.WORDS_INFO, {
					email: cookieAlive(),
				});
				if (response.data.success) {
					const _words = response.data.data;
					setWords(_words);
				} else {
					toast({
						title: "Email Wordings",
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
		loadWords();
	}, [cookieAlive, setWords, toast]);

	const handleSave = async () => {
		try {
			if (!validateInfo(words)) {
				toast({
					title: "Email Wordings",
					description: `Please check the input fields.`,
					status: "warning",
					duration: 3000,
					isClosable: true,
				});
				return;
			}
			setIsSaving(true);
			const response = await axios.post(API_URLS.WORDS_UPDATE, words);

			if (response.data.success) {
				toast({
					title: "Email Wordings",
					description: `${response.data.message}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Email Wordings",
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
		<Card minH={"600px"} w={'full'}>
			<CardHeader>Your Information</CardHeader>
			<CardBody>
				<VStack>
					<FormControl>
						<FormLabel>Write here for appointment</FormLabel>
						<Input
							type="text"
							placeholder="Here is our question..."
							onChange={(e) =>{
								setWords({
									...words,
									appointment: e.target.value
								})
							}}
							defaultValue={words['appointment']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Write here for done</FormLabel>
						<Input
							type="email"
							placeholder="Hey, I just wanted you to know..."
							onChange={(e) =>{
								setWords({
									...words,
									done: e.target.value
								})
							}}
							defaultValue={words['done']}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Write here for share</FormLabel>
						<Input
							type="text"
							placeholder="Hey, I just wanted you to know..."
							onChange={(e) =>{
								setWords({
									...words,
									share: e.target.value
								})
							}}
							defaultValue={words['share']}
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

export default Words;
