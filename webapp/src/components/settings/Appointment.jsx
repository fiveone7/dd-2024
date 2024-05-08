import {
	Button,
	Card,
	CardBody,
	CardHeader,
	HStack,
	VStack,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Flex,
	Spacer,
	CardFooter,
	useToast
} from "@chakra-ui/react";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { FaSave } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { API_URLS } from "../../Constants";

function Appointment() {
	const [isSaving, setIsSaving] = useState(false);
	const { cookieAlive } = useContext(AuthContext);
	const toast = useToast();
	const { appointment, setAppointment } = useContext(AppContext);
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const [writingHour, setWritingHour] = useState(9);
	const [writingMin, setWritingMin] = useState(0);
	const [writingNoon, setWritingNoon] = useState(false);

	const [sharingHour, setSharingHour] = useState(6);
	const [sharingMin, setSharingMin] = useState(0);
	const [sharingNoon, setSharingNoon] = useState(true);

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

	const handleClickWeekDay = (_weekday) => {
		const isPressed = selectedWeekDayButtons[_weekday];
		const newSelectedDays = [...selectedDays];
		if (isPressed) {
			if (selectedDays.indexOf(_weekday) !== -1) {
				newSelectedDays.splice(selectedDays.indexOf(_weekday), 1);
				setSelectedDays(newSelectedDays);
			}

			if (newSelectedDays.length === 1) {
				const writingKey = `${weekDays[_weekday]}_writing`;
				const sharingKey = `${weekDays[_weekday]}_sharing`;
				const writingInfo = appointment[writingKey];
				const sharingInfo = appointment[sharingKey];
				setWritingHour(writingInfo[0]);
				setWritingMin(writingInfo[1]);
				setWritingNoon(writingInfo[2]);

				setSharingHour(sharingInfo[0]);
				setSharingMin(sharingInfo[1]);
				setSharingNoon(sharingInfo[2]);
			}
		} else {
			if (newSelectedDays.length === 0) {
				const writingKey = `${weekDays[_weekday]}_writing`;
				const sharingKey = `${weekDays[_weekday]}_sharing`;
				const writingInfo = appointment[writingKey];
				const sharingInfo = appointment[sharingKey];
				setWritingHour(writingInfo[0]);
				setWritingMin(writingInfo[1]);
				setWritingNoon(writingInfo[2]);

				setSharingHour(sharingInfo[0]);
				setSharingMin(sharingInfo[1]);
				setSharingNoon(sharingInfo[2]);

				newSelectedDays.push(_weekday);
			} else {
				newSelectedDays.push(_weekday);
			}

			setSelectedDays(newSelectedDays);
		}

		const newSelectedWeekDayButtons = [...selectedWeekDayButtons];
		newSelectedWeekDayButtons[_weekday] = !isPressed;
		setSelectedWeekDayButtons(newSelectedWeekDayButtons);
	};

	const getNoon = (noon) => {
		if (noon)
			return 'PM';
		else
			return 'AM';
	}

	const handleSave = async () => {
		try {
			setIsSaving(true);
			const response = await axios.post(API_URLS.APPOINTMENT_UPDATE, { appointments: appointment, email: cookieAlive() });
			if (response.data.success) {
				toast({
					title: "Appointment Defaults",
					description: `${response.data.message}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Appointment Defaults",
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
	}

	const handleChangeHour = (hour, type) => {
		console.log(selectedDays)
		if (selectedDays.length === 0) {
			toast({
				title: "Appointment Defaults",
				description: `Please select week days to set appointment defaults.`,
				status: "info",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		hour = parseInt(hour);

		const newAppointment = { ...appointment };
		if (type === 'writing') {
			setWritingHour(hour);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [hour, writingMin, writingNoon ? 1 : 0];
			}

		} else {
			setSharingHour(hour);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [hour, sharingMin, sharingNoon ? 1 : 0];
			}
		}
		setAppointment(newAppointment);
	}

	const handleChangeMin = (min, type) => {
		min = parseInt(min);
		const newAppointment = { ...appointment };
		if (type === 'writing') {
			setWritingMin(min);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [writingHour, min, writingNoon ? 1 : 0];
			}
		} else {
			setSharingMin(min);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [sharingHour, min, sharingNoon ? 1 : 0];
			}
		}
		setAppointment(newAppointment);
	}

	const handleChangeNoon = (noon, type) => {
		const newAppointment = { ...appointment };
		if (type === 'writing') {
			setWritingNoon(noon);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [writingHour, writingMin, noon ? 1 : 0];
			}
		} else {
			setSharingNoon(noon);
			for (let i = 0; i < selectedDays.length; i++) {
				const selectedDay = selectedDays[i];
				newAppointment[`${weekDays[selectedDay]}_${type}`] = [sharingHour, sharingMin, noon ? 1 : 0];
			}
		}
		setAppointment(newAppointment);
	}

	useEffect(() => {
		const loadAppointment = async () => {
			if (!cookieAlive()) return;
			try {
				const response = await axios.post(API_URLS.APPOINTMENT_INFO, {
					email: cookieAlive(),
				});
				if (response.data.success) {
					const appointment = response.data.data;
					setAppointment(appointment);
				} else {
					toast({
						title: "Appointment Defaults",
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
		loadAppointment();
	}, [cookieAlive, setAppointment, toast]);

	return (
		<Card minH={"600px"} w={'full'}>
			<CardHeader>
				Appointment Defaults
			</CardHeader>
			<CardBody>
				<VStack gap={12} align={'start'}>
					<Flex gap={4}>
						<Text>Default time for Writing</Text>
						<Spacer />
						<NumberInput
							min={0}
							max={12}
							w={'10rem'}
							value={writingHour}
							onChange={(e) => handleChangeHour(e, 'writing')}>
							<NumberInputField
								fontSize={20}
								padding={'0.75rem'}
								textAlign={"center"}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text fontSize={20}>:</Text>
						<NumberInput
							min={0}
							max={59}
							w={'10rem'}
							value={writingMin}
							onChange={(e) => handleChangeMin(e, 'writing')}>
							<NumberInputField
								fontSize={20}
								padding={'0.75rem'}
								textAlign={"center"}
								maxLength={2}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text fontSize={20}>:</Text>
						<Button onClick={e => handleChangeNoon(!writingNoon, 'writing')}>{getNoon(writingNoon)}</Button>
					</Flex>
					<Flex gap={4}>
						<Text>Default time for Sharing</Text>
						<Spacer />
						<NumberInput
							min={0}
							max={12}
							w={'10rem'}
							value={sharingHour}
							onChange={(e) => handleChangeHour(e, 'sharing')}>
							<NumberInputField
								fontSize={20}
								padding={'0.75rem'}
								textAlign={"center"}
								maxLength={2}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text fontSize={20}>:</Text>
						<NumberInput
							min={0}
							max={59}
							w={'10rem'}
							value={sharingMin}
							onChange={(e) => handleChangeMin(e, 'sharing')}>
							<NumberInputField
								fontSize={20}
								padding={'0.75rem'}
								textAlign={"center"}
								maxLength={2} />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text fontSize={20}>:</Text>
						<Button onClick={e => handleChangeNoon(!sharingNoon, 'sharing')}>{getNoon(sharingNoon)}</Button>
					</Flex>
					<Text>Select day to change time</Text>
					<HStack
						w={"full"}
						spacing={4}
					>
						{weekDays.map((weekDay, index) => (
							<Button
								key={index}
								{...(selectedWeekDayButtons[index] ? { bg: "blue.500" } : {})}
								onClick={(e) => handleClickWeekDay(index)}
							>
								{weekDay}
							</Button>
						))}
					</HStack>
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

export default Appointment;
