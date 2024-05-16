import { Box, RadioGroup, Stack, Radio, Container, Accordion, Tabs, TabList, Tab, AccordionItem, AccordionButton, AccordionPanel, VStack, Checkbox } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useState, useEffect } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { DialogueContext } from "../../providers/DialogueProvider";

function DialogueCategory() {
    const toast = useToast();
    const { subscription } = useContext(AppContext);
    const { feelingCategory, setFeelingCategory, emotion } = useContext(DialogueContext);
    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const response = await axios.get(
                    API_URLS.DIALOGUE_FEELING_CATEGORY_LIST
                );
                if (response.data.success) {
                    setFeelingCategory(response.data.data);
                } else {
                    toast({
                        title: "Category and Feelings",
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
    }, [setFeelingCategory, toast]);

    const handleChangeFeeling = (checked, feeling)=> {
        if (checked) {

        } else {
            
        }
    }

    return (
        <Container>
            <Accordion>
                {feelingCategory && feelingCategory.length > 0 && feelingCategory.filter((feeling) => feeling.emotion === emotion).map((item, idx) => (
                    <AccordionItem>
                        <AccordionButton bg={'blue.400'} color={'white'}>
                            {item.category}
                        </AccordionButton>
                        <AccordionPanel>
                            <VStack align={'start'} pl={6}>
                                {item.feelings.map((feeling, idxx)=> (
                                    <Checkbox onChange={(e)=> {handleChangeFeeling(e.target.checked, feeling)}}>
                                        {feeling}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            <Tabs>
                <TabList>


                </TabList>
            </Tabs>
            {/* <RadioGroup onChange={setCurrentCategory} value={currentCategory} id="question-category">
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
            </RadioGroup> */}
        </Container>
    );
}

export default DialogueCategory;