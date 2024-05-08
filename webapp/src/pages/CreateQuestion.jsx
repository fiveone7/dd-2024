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
} from "@chakra-ui/react";
import QuestionAppointment from "../components/question/question-appointment";
function CreateQuestion() {
    
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

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    });

    return (
        <Box w={"full"}>
            <VStack w={"full"} spacing={8}>
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
                <QuestionAppointment/>
            </VStack>
        </Box>
    );
}

export default CreateQuestion;
