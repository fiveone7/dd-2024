import {
    Box,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepTitle,
    StepDescription,
    StepIcon,
    StepNumber,
    StepSeparator,
    VStack,
    useSteps,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    HStack,
    Button,
    Spacer,
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import QuestionAppointment from "../components/question/question-appointment";
import { QuestionContext } from "../providers/QuestionProvider";
import { useContext } from "react";
import QuestionCategory from "../components/question/question-category";
import QuestionQuestions from "../components/question/question-questions";
import axios from "axios";
import { API_URLS } from "../Constants";
function CreateQuestion() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { onNext, onPrev, date, writingTime, sharingTime, category, currentQuestion } = useContext(QuestionContext);
    const toast = useToast();
    const steps = [
        {
            title: "Appointments",
            description: "Set Appointments",
        },
        {
            title: "Category",
            description: "Choose Dialogue Category",
        },
        {
            title: "Question",
            description: "Choose Dialogue Question",
        },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    });

    const handlePrev = () => {
        let step = activeStep;
        const prevResult = onPrev(step);
        if (!prevResult.result) {
            toast({
                title: "Create Dialogue",
                description: `${prevResult.msg}.`,
                status: "Warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (activeStep - 1 < 1) step = 1;
        else step = activeStep - 1;
        setActiveStep(step);
    };

    const handleNext = () => {
        let step = activeStep;
        const nextResult = onNext(step);
        if (!nextResult.result) {
            toast({
                title: "Create Dialogue",
                description: `${nextResult.msg}.`,
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (activeStep + 1 > 3) onOpen();
        else step = activeStep + 1;

        setActiveStep(step);
    };

    const handleSaveDialogue = async () => {
        try {
            const response = await axios.post(API_URLS.DIALOGUE_ADD, {});

        } catch (e) {
            console.log(e);
        }
        onClose();
    }

    return (
        <Box w={"full"}>
            <VStack w={"full"} spacing={8}>
                <Card minH={"400px"} minW={"400px"}>
                    <CardHeader>
                        <Stepper index={activeStep}>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>

                                    <Box flexShrink="0">
                                        <StepTitle>{step.title}</StepTitle>
                                        <StepDescription>
                                            {step.description}
                                        </StepDescription>
                                    </Box>

                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                    </CardHeader>
                    <CardBody>
                        {activeStep === 1 && <QuestionAppointment />}
                        {activeStep === 2 && <QuestionCategory />}
                        {activeStep === 3 && <QuestionQuestions />}
                    </CardBody>
                    <CardFooter>
                        <HStack w={"full"}>
                            <Button
                                onClick={handlePrev}
                                disabled={activeStep === 1}
                            >
                                Prev
                            </Button>
                            <Spacer />
                            <Button
                                onClick={handleNext}
                                disabled={activeStep === 3}
                            >
                                Next
                            </Button>
                        </HStack>
                    </CardFooter>
                </Card>
            </VStack>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Save Dialogue
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='teal' onClick={handleSaveDialogue} ml={3}>
                        Save
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}

export default CreateQuestion;
