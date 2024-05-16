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
    useDisclosure,
} from "@chakra-ui/react";
import { QuestionContext } from "../providers/QuestionProvider";
import { useContext } from "react";
import axios from "axios";
import { API_URLS } from "../Constants";
import { AppContext } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import DialogueEmotion from "../components/dialogue/dialogue-emotion";
import DialogueCategory from "../components/dialogue/dialogue-category";
function WriteDialogue() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        onNext,
        onPrev,
        date,
        writingTime,
        sharingTime,
        category,
        currentCategory,
        currentQuestion,
    } = useContext(QuestionContext);
    const { contactInfo } = useContext(AppContext);
    const toast = useToast();
    const navigate = useNavigate();
    const steps = [
        {
            title: "Emotion",
            description: "Choose Emotion Category",
        },
        {
            title: "Feelings",
            description: "Choose Feelings (Max 3)",
        },
        {
            title: "Letter",
            description: "Write Dialogue Letter",
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
                title: "Write Dialogue",
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
                title: "Write Dialogue",
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
            const response = await axios.post(API_URLS.DIALOGUE_WRITE, {
                date, writingTime, sharingTime, category: category[currentCategory].category, question: currentQuestion, myEmail: contactInfo['myEmail'], spouseEmail: contactInfo['spouseEmail']
            });

            console.log(response)
            if (response.data.success) {
                onClose();
                navigate('/upcoming');
            } else {
                toast({
                    title: "Write Dialogue",
                    description: `${response.data.message}.`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (e) {
            toast({
                title: "Write Dialogue",
                description: `${e.message}.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
        }
    };

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
                        {activeStep === 1 && <DialogueEmotion handleEmotionSelect={handleNext}/>}
                        {activeStep === 2 && <DialogueCategory />}
                        {/* {activeStep === 3 && <QuestionQuestions />} */}
                    </CardBody>
                    <CardFooter>
                        {activeStep !== 1 && (
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
                        )}

                    </CardFooter>
                </Card>
            </VStack>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Save Dialogue
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme="teal"
                                onClick={handleSaveDialogue}
                                ml={3}
                            >
                                Save
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}

export default WriteDialogue;
