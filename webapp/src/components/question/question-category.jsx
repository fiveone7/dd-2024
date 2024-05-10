import { Box, RadioGroup, Stack, Radio, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useState, useEffect } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { QuestionContext } from "../../providers/QuestionProvider";

function QuestionCategory() {
    const toast = useToast();
    const { subscription } = useContext(AppContext);
    const { category, setCategory, currentCategory, setCurrentCategory } = useContext(QuestionContext);
    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const response = await axios.get(
                    API_URLS.DIALOGUE_CATEGORY_LIST
                );
                if (response.data.success) {
                    setCategory(response.data.data);
                } else {
                    toast({
                        title: "Category and Questions",
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

        getCategoryList();
    }, [setCategory, toast]);
    return (
        <Container>
            <RadioGroup onChange={setCurrentCategory} value={currentCategory} id="question-category">
                <Stack align={'start'}>
                    {category &&
                        category.map((category_question, idx) => (
                            (subscription.plan === "0" && category_question.plan === "2") ?
                                (
                                    // <Radio value={category_question.id} key={idx} isDisabled>
                                    <Radio value={category_question.id} key={idx} isDisabled>
                                        {category_question.category}
                                    </Radio>
                                ) :
                                (
                                    <Radio value={category_question.id} key={idx}>
                                        {category_question.category}
                                    </Radio>
                                )

                        ))}
                </Stack>
            </RadioGroup>
        </Container>
    );
}

export default QuestionCategory;