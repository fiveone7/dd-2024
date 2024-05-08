import { Card, CardBody, Text, CardHeader, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import ContentItem from "./items/contentItem";
function HowTo(props) {
    const [howto, setHowto] = useState({});
    const [dataKeys, setDataKeys] = useState([]);
    const toast = useToast();
    useEffect(()=> {
        const loadHowTo = async ()=> {
            try {
				const response = await axios.get(API_URLS.MATERIAL_HOWTO);
				if (response.data.success) {
					setHowto(response.data.data);
                    setDataKeys(Object.keys(response.data.data))
				} else {
					toast({
						title: "How to Dialogue",
						description: `${response.data.message}.`,
						status: "error",
						duration: 3000,
						isClosable: true,
					});
				}
			} catch (e) {
				console.error(e);
			}    
        }

        loadHowTo();
    }, []);
    return (
        <Card  minH={"600px"} w={'full'}>
            <CardHeader>
                {props.title}
            </CardHeader>
            <CardBody>
                <VStack align={'start'}>
                    {dataKeys.length > 0 && dataKeys.map((dataKey, idx)=> (
                        <ContentItem dataKey={dataKey} data={howto[dataKey]} key={idx}/>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    )
}

export default HowTo;