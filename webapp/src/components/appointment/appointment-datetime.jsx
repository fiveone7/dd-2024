import { HStack, Spacer, Text, Input, Container } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FaCalendar, FaEdit, FaShare } from "react-icons/fa";
import { QuestionContext } from "../../providers/QuestionProvider";
import { AppContext } from "../../providers/AppProvider";
import { timeFormat } from "../../utils/utils";
import axios from "axios";
import { API_URLS } from "../../Constants";
import { AuthContext } from "../../providers/AuthProvider";

function AppointmentDatetime() {
    const toast = useToast();
    const {
        date,
        setDate,
        writingTime,
        setWritingTime,
        sharingTime,
        setSharingTime
    } = useContext(QuestionContext);
    const { appointment, setAppointment } = useContext(AppContext);
    const { cookieAlive } = useContext(AuthContext);
    const today = new Date().toISOString().split("T")[0];

    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };

    const handleChangeWritingTime = (e) => {
        setWritingTime(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeSharingTime = (e) => {
        setSharingTime(e.target.value);
        console.log(e.target.value);
    };

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
						title: "Appointment Defaults",
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
        switch (new Date(date).getDay()) {
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
    }, [date, appointment]);

    return (
        <Container>
            <HStack spacing={4} mb={2}>
                <FaCalendar />
                <Text>Date</Text>
                <Spacer />
                <Input
                    type="date"
                    onChange={handleChangeDate}
                    min={today}
                    value={date}
                />
            </HStack>
            <HStack spacing={4} mb={2}>
                <FaEdit />
                <Text>Writing</Text>
                <Spacer />
                <Input
                    type="time"
                    onChange={handleChangeWritingTime}
                    value={writingTime}
                />
            </HStack>
            <HStack spacing={4} mb={2}>
                <FaShare />
                <Text>Sharing</Text>
                <Spacer />
                <Input
                    type="time"
                    onChange={handleChangeSharingTime}
                    value={sharingTime}
                />
            </HStack>
        </Container>
    );
}

export default AppointmentDatetime;
