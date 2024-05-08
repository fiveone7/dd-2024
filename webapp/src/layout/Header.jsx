import {
	Box,
	HStack,
	Image,
	Link as ChakraLink,
	Spacer,
	Text,
	Button,
	Menu,
	MenuItem,
	MenuButton,
	MenuDivider,
	MenuList,
	useMediaQuery,
} from "@chakra-ui/react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import commune from "../assets/imgs/logo.png";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

function Header() {
	const location = useLocation();
	const logoColor = useColorModeValue("blue.400", "gray.50");
	const userIcon = useColorModeValue(<FaUser />, <FaUser />);
	const themeColor = useColorModeValue("blue.400", "blue.300");
	const { logout, cookieAlive } = useContext(AuthContext);

	const [isLargerThan1150] = useMediaQuery("(min-width: 1150px)");

	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	useEffect(()=> {

	}, []);

	const userName = () => {
		if (cookieAlive()) {
			return cookieAlive();
		} else {
			return "";
		}
	};

	return (
		<Box
			className="App-header"
			py={8}
			px={20}
		>
			<HStack>
				<HStack>
					<Image
						src={commune}
						w={"36px"}
					/>
					<ChakraLink
						as={ReactRouterLink}
						to="/"
						color={logoColor}
						_hover={{ color: themeColor }}
					>
						<Text
							fontSize={24}
							fontWeight={800}
						>
							DialogueDaily
						</Text>
					</ChakraLink>
				</HStack>
				<Spacer />
				{isLargerThan1150 && (
					<HStack
						spacing={8}
						mr={8}
					>
						<ChakraLink
							as={ReactRouterLink}
							to="/"
							_hover={{ color: themeColor }}
							{...(location.pathname === '/' && { color: themeColor })}
						>
							<Text
								fontSize={16}
								fontWeight={600}
							>
								Home
							</Text>
						</ChakraLink>
						<ChakraLink
							as={ReactRouterLink}
							to="/upcoming"
							_hover={{ color: themeColor }}
							{...(location.pathname === '/upcoming' && { color: themeColor })}
						>
							<Text
								fontSize={16}
								fontWeight={600}
							>
								Upcoming
							</Text>
						</ChakraLink>
						<ChakraLink
							as={ReactRouterLink}
							to="/history"
							_hover={{ color: themeColor }}
							{...(location.pathname === '/history' && { color: themeColor })}
						>
							<Text
								fontSize={16}
								fontWeight={600}
							>
								History
							</Text>
						</ChakraLink>

						<ChakraLink
							as={ReactRouterLink}
							to="/material"
							_hover={{ color: themeColor }}
							{...(location.pathname === '/material' && { color: themeColor })}
						>
							<Text
								fontSize={16}
								fontWeight={600}
							>
								Reference Materials
							</Text>
						</ChakraLink>

						<ChakraLink
							as={ReactRouterLink}
							to="/about"
							_hover={{ color: themeColor }}
							{...(location.pathname === '/about' && { color: themeColor })}
						>
							<Text
								fontSize={16}
								fontWeight={600}
							>
								About
							</Text>
						</ChakraLink>
					</HStack>
				)}
				<HStack spacing={4}>
					{!cookieAlive() && (
						<Button
							leftIcon={userIcon}
							size={"sm"}
							colorScheme="blue"
							onClick={handleLogin}
						>
							Login
						</Button>
					)}

					{cookieAlive() ? (
						<Menu>
							<MenuButton
								as={Button}
								aria-label="Profile"
								icon={<FaBars />}
								size={"sm"}
								variant="ghost"
							>
								{userName()}
							</MenuButton>
							<MenuList>
								{!isLargerThan1150 && (
									<>
										<MenuItem
											onClick={() => navigate("/")}
										>
											Home
										</MenuItem>
										<MenuItem
											onClick={() => navigate("/upcoming")}
										>
											Upcoming Dialogues
										</MenuItem>
										<MenuItem
											onClick={() => navigate("/history")}
										>
											Dialogue History
										</MenuItem>
										<MenuItem
											onClick={() => navigate("/materials")}
										>
											Reference Materials
										</MenuItem>
										<MenuItem
											onClick={() => navigate("/about")}
										>
											About
										</MenuItem>
									</>
								)}
								<MenuItem onClick={() => navigate("/upgrade")}>
									Upgrade Account
								</MenuItem>
								<MenuItem onClick={() => navigate("/settings")}>
									Settings
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={logout}>Log out</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<></>
					)}
				</HStack>

				<ThemeSwitcher justifySelf="flex-end" />
			</HStack>
		</Box>
	);
}

export default Header;