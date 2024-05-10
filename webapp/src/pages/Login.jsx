import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	VStack,
	Input,
	Card,
	Container,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Button,
	Link as ChakraLink,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../providers/AuthProvider";
import { AppContext } from "../providers/AppProvider";
import axios from "axios";
import { API_URLS } from "../Constants";

function Login() {
	const themeColor = useColorModeValue("blue.400", "blue.300");
	const toast = useToast();
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const { setContactInfo, setSubscription } = useContext(AppContext);
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [emailValid, setEmailValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const emailRegex = new RegExp(
		/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
		"gm"
	);
	// const validEmailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

	const [showPwd, setShowPwd] = useState(false);
	const handleShowPassword = () => setShowPwd(!showPwd);

	const handleChangeEmail = (e) => {
		if (e.target.value && emailRegex.test(e.target.value)) {
			setEmailValid(true);
			setEmail(e.target.value);
		} else {
			setEmailValid(false);
		}
	};

	const handleChangePwd = (e) => {
		setPwd(e.target.value);
	};

	const handleLogin = async () => {
		if (pwd.length === 0 || !emailValid) {
			console.log("Email and password must be valid for login");
			return;
		}

		try {
			setIsLoading(true);
			const response = await axios.post(API_URLS.LOGIN, {
				email,
				password: pwd,
			});

			if (response.data.success) {
				login({ email, token: response.data.token });
				if (Object.keys(response.data.user.contact).length > 0) {
					setContactInfo(response.data.user.contact);
					setSubscription(response.data.user.subscription);
					navigate("/upcoming");
					toast({
						title: "Login Success",
						description: `${response.data.message}.`,
						status: "success",
						duration: 3000,
						isClosable: true,
					});
				} else {
					toast({
						title: "More information",
						description: `You have to set all required information here. Otherwise the system will not work properly.`,
						status: "info",
						duration: 10000,
						isClosable: true,
					});
					navigate("/settings");
				}
			} else {
				toast({
					title: "Login Error",
					description: `${response.data.message}.`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			className="App-login"
			alignItems={"center"}
			mt={8}
		>
			<Container w={"full"}>
				<Card
					w={420}
					maxW={420}
					p={4}
					m={"auto"}
				>
					<VStack spacing={4}>
						<Text
							color={themeColor}
							fontSize={24}
							fontWeight={700}
						>
							Login
						</Text>
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								type="Email"
								placeholder="Enter email"
								defaultValue={email}
								onChange={handleChangeEmail}
								{...(emailValid
									? { borderColor: "green.500" }
									: { borderColor: "red.500" })}
							/>
							{!emailValid ? (
								<FormHelperText color="red.500">
									Input valid email address
								</FormHelperText>
							) : (
								<></>
							)}
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={showPwd ? "text" : "password"}
									placeholder="Enter password"
									defaultValue={pwd}
									onChange={handleChangePwd}
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={handleShowPassword}
									>
										{showPwd ? (
											<AiFillEye />
										) : (
											<AiFillEyeInvisible />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormHelperText>
								{/* <Link>Forgot Password</Link> */}
								{/* Set your password strong */}
							</FormHelperText>
						</FormControl>

						<Button
							colorScheme="blue"
							width="100%"
							onClick={handleLogin}
							isLoading={isLoading}
						>
							Login
						</Button>
						<HStack>
							<Text>Don't have an account?</Text>
							<ChakraLink
								as={ReactRouterLink}
								to="/register"
								_hover={{ color: themeColor }}
							>
								<Text>Register</Text>
							</ChakraLink>
						</HStack>
					</VStack>
				</Card>
			</Container>
		</Box>
	);
}

export default Login;
