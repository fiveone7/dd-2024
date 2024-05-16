import { RadioGroup, Radio, VStack, Box, Textarea, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useState } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";

function AppointmentQuestions() {

    const { subscription } = useContext(AppContext);
    const { category, currentCategory, currentQuestion, setCurrentQuestion } = useContext(QuestionContext);

    return (
        <Box w={'full'}>
            {currentCategory === '-100' ? (
                <VStack>
                    <Text fontSize={'3xl'} fontWeight={'500'}>Write your own question</Text>
                    <Textarea value={currentQuestion} onChange={e => setCurrentQuestion(e.target.value)}>

                    </Textarea>
                </VStack>
            ) : (
                <RadioGroup onChange={setCurrentQuestion} value={currentQuestion} defaultValue={currentQuestion} w={'full'} id="question-list">
                    <VStack align={'start'} w={'full'}>
                        {category[currentCategory] &&
                            category[currentCategory]['questions'].map((question, idx) => (
                                <Radio value={`${question.question}`} key={idx}>
                                    {question.question}
                                </Radio>
                            ))}
                    </VStack>
                </RadioGroup >
            )}
        </Box >
    );
}

export default AppointmentQuestions;