import {
    Card,
    CardBody,
    Text,
    CardHeader,
    VStack,
    useToast,
    UnorderedList,
    ListItem,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import ContentItem from "./items/contentItem";
function PIM(props) {
    const [pim, setPim] = useState({});
    const [dataKeys, setDataKeys] = useState([]);
    const toast = useToast();
    useEffect(() => {
        const loadPIM = async () => {
            try {
                const response = await axios.get(API_URLS.MATERIAL_PIM);
                if (response.data.success) {
                    setPim(response.data.data);
                    setDataKeys(Object.keys(response.data.data));
                } else {
                    toast({
                        title: "Describing Feelings (PIM)",
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

        loadPIM();
    }, []);
    return (
        <Card minH={"600px"} w={"full"}>
            <CardHeader>{props.title}</CardHeader>
            <CardBody>
                <VStack align={"start"}>
                    {dataKeys.length > 0 &&
                        dataKeys.map((dataKey, idx) => (
                            <Box key={idx}>
                                <Text>{`${dataKey} = ${pim[dataKey].step}`}</Text>
                                {pim[dataKey].content &&
                                    pim[dataKey].content.length > 0 && (
                                        <UnorderedList>
                                            {pim[dataKey].content.map(
                                                (contentItem, idxx) => (
                                                    <ListItem key={idxx}>
                                                        {contentItem}
                                                    </ListItem>
                                                )
                                            )}
                                        </UnorderedList>
                                    )}
                            </Box>
                        ))}
                </VStack>
            </CardBody>
        </Card>
    );
}

export default PIM;
