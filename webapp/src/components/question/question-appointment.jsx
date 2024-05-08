import {
    Card,
    CardBody,
    CardFooter,
    Button,
    VStack,
    HStack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

function QuestionAppointment() {
    const [date, setDate] = useState(new Date());
    return (
        <Card minH={"400px"} minWidth={"400px"}>
            <CardBody>
                <VStack>
                    <HStack spacing={4}>
                        <FaCalendar></FaCalendar>
                        <Text>Date</Text>
                        <Spacer />
                        <SingleDatepicker
                            name="date-input"
                            date={date}
                            onDateChange={setDate}
                        />
                    </HStack>
                </VStack>
            </CardBody>
            <CardFooter>
                <HStack w={"full"}>
                    <Button>Prev</Button>
                    <Spacer />
                    <Button>Next</Button>
                </HStack>
            </CardFooter>
        </Card>
    );
}

export default QuestionAppointment;
