import { Card, CardBody, CardFooter, Text, Input, Spacer, VStack, HStack, useToast, ButtonGroup, Button, CardHeader } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { FaEdit, FaQuestion, FaShare } from "react-icons/fa";
import { AppContext } from "../../providers/AppProvider";
import { API_URLS } from "../../Constants";
import { timeFormat } from "../../utils/utils";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DialogueContext } from "../../providers/DialogueProvider";

const NextAppointment = ({ data }) => {
    const {appointment, setAppointment} = useContext(AppContext);
    const toast = useToast();
    const { cookieAlive } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setDate, writingTime, setWritingTime, sharingTime, setSharingTime, setQuestion } = useContext(DialogueContext);
    
    useEffect(() => {
        const loadAppointment = async () => {
            if (!cookieAlive()) return;
            try {
                const response = await axios.post(API_URLS.APPOINTMENT_INFO, {
                    email: cookieAlive()
                });

                if (response.data.success) {
					const appointment = response.data.data;
					setAppointment(appointment);
				} else {
					toast({
						title: "Upcoming Appointments",
						description: `${response.data.message}.`,
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}
            } catch (err) {
                console.log(err);
            }
        };

        loadAppointment();
    }, []);

    useEffect(() => {
        switch (new Date(data.date).getDay()) {
            case 0:
                setWritingTime(timeFormat(appointment.Sun_writing));
                setSharingTime(timeFormat(appointment.Sun_sharing));
                break;
            case 1:
                setWritingTime(timeFormat(appointment.Mon_writing));
                setSharingTime(timeFormat(appointment.Mon_sharing));
                break;
            case 2:
                setWritingTime(timeFormat(appointment.Tue_writing));
                setSharingTime(timeFormat(appointment.Tue_sharing));
                break;
            case 3:
                setWritingTime(timeFormat(appointment.Wed_writing));
                setSharingTime(timeFormat(appointment.Wed_sharing));
                break;
            case 4:
                setWritingTime(timeFormat(appointment.Thu_writing));
                setSharingTime(timeFormat(appointment.Thu_sharing));
                break;
            case 5:
                setWritingTime(timeFormat(appointment.Fri_writing));
                setSharingTime(timeFormat(appointment.Fri_sharing));
                break;
            case 6:
                setWritingTime(timeFormat(appointment.Sat_writing));
                setSharingTime(timeFormat(appointment.Sat_sharing));
                break;
        }
    }, [data, appointment]);

    const handleChangeWritingTime = (value) => {
        setWritingTime(value);
    }

    const handleChangeSharingTime = (value) => {
        setSharingTime(value);
    }

    const handleGotoWrite = ()=> {
        setDate(data.date);
        setQuestion(data.question);
        navigate('/write');
    }

    return (
        <Card w={'fit-content'}>
            <CardBody>
                <VStack align={'start'} gap={8}>
                    <HStack gap={4} w={'full'}>
                        <FaEdit/>
                        <Text fontSize={16}>Writing Time</Text>
                        <Spacer />
                        <Input
                            type="time"
                            onChange={handleChangeWritingTime}
                            value={writingTime}
                            w={'10rem'}
                        />
                    </HStack>
                    <HStack gap={4} w={'full'}>
                        <FaShare/>
                        <Text fontSize={16}>Sharing Time</Text>
                        <Spacer />
                        <Input
                            type="time"
                            onChange={handleChangeSharingTime}
                            value={sharingTime}
                            w={'10rem'}
                        />
                    </HStack>
                    <HStack gap={4}>
                        <FaQuestion/>
                        <Text fontSize={16}>Question :</Text>
                        <Text fontSize={16}>{data.question}</Text>
                    </HStack>

                </VStack>
            </CardBody>
            <CardFooter>
                <ButtonGroup>
                    <Button onClick={handleGotoWrite}>Write</Button>
                    <Button>Share</Button>
                    <Button>Video</Button>
                    <Button>Audio</Button>
                    <Button colorScheme="red">Remove</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default NextAppointment;