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
import { useState } from "react";

function Appointment() {

    const [selectedDay, setSelectedDay ] = useState(0); // non-selected // 1: Sunday 2: Monday 3: Tuesday 4: Wednesday 5: Thursday 6: Friday 7: Saturday
    const [writingHour, setWritingHour] = useState(9);
    const [writingMin, setWritingMin] = useState(0);
    const [writingNoon, setWritingNoon] = useState('AM');

    const [sharingHour, setSharingHour] = useState(6);
    const [sharingMin, setSharingMin] = useState(0);
    const [sharingNoon, setSharingNoon] = useState('PM');

    const [selectedDays, setSelectedDays] = useState([]);
    const [tempDefaults, setTempDefaults] = useState({});

    const init = ()=> {

    }

    const loadPage = ()=> {

    }

    const handleClickWeekDay = (weekday)=> {

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
                        textAlign={'center'}
					>
						<Text>Default time for Writing</Text>
					</GridItem>
					<GridItem
						rowSpan={1}
						colSpan={1}
                        textAlign={'center'}
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
								<IconButton icon={<FaArrowUp />} size={'lg'} bg={'blue.500'}/>
								<Tag fontSize={20} size={'lg'}>08</Tag>
								<IconButton icon={<FaArrowDown />}  size={'lg'} bg={'blue.500'}/>
							</VStack>
							<VStack w={"full"}>
								<IconButton icon={<FaArrowUp />} size={'lg'} bg={'blue.500'}/>
								<Tag fontSize={20} size={'lg'}>08</Tag>
								<IconButton icon={<FaArrowDown />}  size={'lg'} bg={'blue.500'}/>
							</VStack>
							<VStack w={"full"}>
								<IconButton icon={<FaArrowUp />}  size={'lg'} bg={'blue.500'}/>
								<Tag fontSize={20} size={'lg'}>PM</Tag>
								<IconButton icon={<FaArrowDown />}  size={'lg'} bg={'blue.500'}/>
							</VStack>
						</HStack>
					</GridItem>
					<GridItem
						rowSpan={1}
						colSpan={1}
					>
						<HStack w={"full"}>
							<VStack w={"full"}>
								<IconButton icon={<FaArrowUp />}  size={'lg'} bg={'blue.500'}/>
								<Tag fontSize={20} size={'lg'}>08</Tag>
								<IconButton icon={<FaArrowDown />} size={'lg'}  bg={'blue.500'}/>
							</VStack>
							<VStack w={"full"}>
								<IconButton icon={<FaArrowUp />} size={'lg'}  bg={'blue.500'}/>
								<Tag fontSize={20} size={'lg'}>08</Tag>
								<IconButton icon={<FaArrowDown />} size={'lg'} bg={'blue.500'} />
							</VStack>
							<VStack w={"full"}>
								<IconButton icon={<FaArrowUp />} size={'lg'} bg={'blue.500'} />
								<Tag fontSize={20} size={'lg'}>AM</Tag>
								<IconButton icon={<FaArrowDown />} size={'lg'} bg={'blue.500'} />
							</VStack>
						</HStack>
					</GridItem>
				</Grid>
			</CardBody>
			<CardHeader textAlign={'center'}>Select day to change time</CardHeader>
			<CardBody>
				<HStack w={'full'} justify={'space-between'}>
					<Button onClick={()=>handleClickWeekDay(1)}>Sun</Button>
					<Button onClick={()=>handleClickWeekDay(2)}>Mon</Button>
					<Button onClick={()=>handleClickWeekDay(3)}>Tue</Button>
					<Button onClick={()=>handleClickWeekDay(4)}>Wed</Button>
					<Button onClick={()=>handleClickWeekDay(5)}>Thu</Button>
					<Button onClick={()=>handleClickWeekDay(6)}>Fri</Button>
					<Button onClick={()=>handleClickWeekDay(7)}>Sat</Button>
				</HStack>
			</CardBody>
		</Card>
	);
}

export default Appointment;
