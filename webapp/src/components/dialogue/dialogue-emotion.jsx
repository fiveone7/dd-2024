import { Button, Container, HStack, Spacer, useToast } from "@chakra-ui/react";
import { FaSadTear, FaSmile } from "react-icons/fa";
import { API_URLS } from "../../Constants";
import { useContext, useEffect } from "react";
import { DialogueContext } from "../../providers/DialogueProvider";

const DialogueEmotion = (props) => {
    const toast = useToast();
    const { emotion, setEmotion } = useContext(DialogueContext);

    useEffect(() => {

    }, []);

    const onHandleEmotionSelect = (emotion) => {
        setEmotion(emotion);
        props.handleEmotionSelect();
    }

    return (
        <Container w={'full'}>
            <HStack gap={8} w={'full'}>
                <Button size={'lg'} leftIcon={<FaSmile />} colorScheme="green" onClick={() => { onHandleEmotionSelect('Yes') }}>
                    PLEASANT
                </Button>
                <Spacer />
                <Button size={'lg'} leftIcon={<FaSadTear />} colorScheme="pink" onClick={() => { onHandleEmotionSelect('No') }}>
                    UNPLEASANT
                </Button>
            </HStack>
        </Container>

    )
}

export default DialogueEmotion;