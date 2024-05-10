import { HStack, Spacer, Text, Input, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { FaCalendar, FaEdit, FaShare } from "react-icons/fa";
import { QuestionContext } from "../../providers/QuestionProvider";

function QuestionAppointment() {
    const { date, setDate, writingTime, setWritingTime, sharingTime, setSharingTime} = useContext(QuestionContext);
    const today = new Date().toISOString().split('T')[0];
    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };

    const handleChangeWritingTime = (e) => {
        setWritingTime(e.target.value);
    };

    const handleChangeSharingTime = (e) => {
        setSharingTime(e.target.value);
    };

    return (
        <Container>
            <HStack spacing={4} mb={2}>
                <FaCalendar />
                <Text>Date</Text>
                <Spacer />
                <Input type="date" onChange={handleChangeDate} min={today} defaultValue={date}/>
            </HStack>
            <HStack spacing={4} mb={2}>
                <FaEdit />
                <Text>Writing</Text>
                <Spacer />
                <Input type="time" onChange={handleChangeWritingTime} defaultValue={writingTime}/>
            </HStack>
            <HStack spacing={4} mb={2}>
                <FaShare />
                <Text>Sharing</Text>
                <Spacer />
                <Input type="time" onChange={handleChangeSharingTime} defaultValue={sharingTime}/>
            </HStack>
        </Container>
    );
}

export default QuestionAppointment;