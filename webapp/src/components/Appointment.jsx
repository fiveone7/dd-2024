import {
	Button,
	Card,
	CardBody,
	CardHeader,
	HStack,
	IconButton,
	VStack,
	Text,
	Tag,
	Grid,
	SimpleGrid,
	GridItem,
} from "@chakra-ui/react";
import { AppContext } from "../providers/AppProvider";
import { AuthContext } from "../providers/AuthProvider";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useContext, useState } from "react";

function Appointment() {
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const [writingHour, setWritingHour] = useState(9);
	const [writingMin, setWritingMin] = useState(0);
	const [writingNoon, setWritingNoon] = useState("AM");

	const [sharingHour, setSharingHour] = useState(6);
	const [sharingMin, setSharingMin] = useState(0);
	const [sharingNoon, setSharingNoon] = useState("PM");

	const [selectedWeekDayButtons, setSelectedWeekDayButtons] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [selectedDays, setSelectedDays] = useState([]);
	const { appointment } = useContext(AppContext);

	const init = () => {};

	const loadPage = () => {};

	const handleClickWeekDay = (weekday) => {
		const isPressed = selectedWeekDayButtons[weekday];

		const tempDefaults = { ...appointment };

		const newSelectedDays = [...selectedDays];
		if (isPressed) {
			if (selectedDays.indexOf(weekday) > -1) {
				newSelectedDays.splice(weekday, 1);
				setSelectedDays(newSelectedDays);
			}

			if (newSelectedDays.length === 1) {
				const writingKey = `${weekDays[weekday]}_writing`;
				const sharingKey = `${weekDays[weekday]}_sharing`;
				const writingInfo = tempDefaults[writingKey].split(" ");
				const sharingInfo = tempDefaults[sharingKey].split(" ");
				setWritingHour(writingInfo[0]);
				setWritingMin(writingInfo[1]);
				setWritingNoon(writingInfo[2]);

				setSharingHour(sharingInfo[0]);
				setSharingMin(sharingInfo[1]);
				setSharingNoon(sharingInfo[2]);
			}
		} else {
			if (newSelectedDays.length === 0) {
				const writingKey = `${weekDays[weekday]}_writing`;
				const sharingKey = `${weekDays[weekday]}_sharing`;
				const writingInfo = tempDefaults[writingKey].split(" ");
				const sharingInfo = tempDefaults[sharingKey].split(" ");
				setWritingHour(writingInfo[0]);
				setWritingMin(writingInfo[1]);
				setWritingNoon(writingInfo[2]);

				setSharingHour(sharingInfo[0]);
				setSharingMin(sharingInfo[1]);
				setSharingNoon(sharingInfo[2]);

				newSelectedDays.push(weekday);
			} else {
				newSelectedDays.push(weekday);
			}
		}

		const newSelectedWeekDayButtons = [...selectedWeekDayButtons];
		newSelectedWeekDayButtons[weekday - 1] = !isPressed;
		setSelectedWeekDayButtons(newSelectedWeekDayButtons);
	};

    const handleButtonUp = (type, subType)=> {

    }

    const handleButtonDown = (type, subType)=> {

    }

	return (
		<Card minH={"600px"}>
			<CardHeader>
				<Grid
					templateRows={"repeat(1, 1fr)"}
					templateColumns={"repeat(2, 1fr)"}
					gap={4}
				>
					<GridItem
						rowSpan={1}
						colSpan={1}
						textAlign={"center"}
					>
						<Text>Default time for Writing</Text>
					</GridItem>
					<GridItem
						rowSpan={1}
						colSpan={1}
						textAlign={"center"}
					>
						<Text>Default time for Sharing</Text>
					</GridItem>
				</Grid>
			</CardHeader>
			<CardBody>
				<Grid
					templateRows={"repeat(1, 1fr)"}
					templateColumns={"repeat(2, 1fr)"}
					gap={4}
				>
					<GridItem
						rowSpan={1}
						colSpan={1}
					>
						<HStack w={"full"}>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('writing', 'hour')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{writingHour.toString().padStart(2, "0")}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('writing', 'hour')}
								/>
							</VStack>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('writing', 'min')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{writingMin.toString().padStart(2, "0")}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('writing', 'min')}
								/>
							</VStack>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('writing', 'noon')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{writingNoon}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('writing', 'noon')}
								/>
							</VStack>
						</HStack>
					</GridItem>
					<GridItem
						rowSpan={1}
						colSpan={1}
					>
						<HStack w={"full"}>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('sharing', 'hour')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{sharingHour.toString().padStart(2, "0")}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('sharing', 'hour')}
								/>
							</VStack>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('sharing', 'min')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{sharingMin.toString().padStart(2, "0")}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('sharing', 'min')}
								/>
							</VStack>
							<VStack w={"full"}>
								<IconButton
									icon={<FaArrowUp />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonUp('sharing', 'noon')}
								/>
								<Tag
									fontSize={20}
									size={"lg"}
								>
									{sharingNoon}
								</Tag>
								<IconButton
									icon={<FaArrowDown />}
									size={"lg"}
									bg={"blue.500"}
                                    onClick={()=> handleButtonDown('sharing', 'noon')}
								/>
							</VStack>
						</HStack>
					</GridItem>
				</Grid>
			</CardBody>
			<CardHeader textAlign={"center"}>
				Select day to change time
			</CardHeader>
			<CardBody>
				<HStack
					w={"full"}
					justify={"space-between"}
				>
					{weekDays.map((weekDay, index) => (
						<Button
							key={index}
							{...(selectedWeekDayButtons[index] === true
								? { bg: "blue.500" }
								: {})}
							onClick={() => handleClickWeekDay(index)}
						>
							{weekDay}
						</Button>
					))}
				</HStack>
			</CardBody>
		</Card>
	);
}

export default Appointment;
