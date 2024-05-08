import {
    Card,
    CardBody,
    Text,
    CardHeader,
    VStack,
    useToast,
    AspectRatio,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
function Correctly(props) {
    const [videoLink, setVideoLink] = useState({});
    const toast = useToast();
    useEffect(() => {
        const loadVideo = async () => {
            try {
                const response = await axios.get(API_URLS.MATERIAL_VIDEOS);
                if (response.data.success) {
                    setVideoLink(response.data.data["How to dialogue correctly"]);
                } else {
                    toast({
                        title: "How to dialogue correctly",
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

        loadVideo();
    }, []);
    return (
        <Card minH={"600px"} w={"full"}>
            <CardHeader>{props.title}</CardHeader>
            <CardBody>
                <AspectRatio ratio={1}>
                    <iframe
                        title="How to dialogue correctly"
                        src={videoLink}
                        allowFullScreen
                    ></iframe>
                </AspectRatio>
            </CardBody>
        </Card>
    );
}

export default Correctly;
