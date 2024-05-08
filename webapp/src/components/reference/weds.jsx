import { Card, CardBody, Text, CardHeader, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import WedItem from "./items/wedItem";
function WEDS(props) {
    const [weds, setWeds] = useState({});
    const [dataKeys, setDataKeys] = useState([]);
    const toast = useToast();
    useEffect(()=> {
        const loadWeds = async ()=> {
            try {
				const response = await axios.get(API_URLS.MATERIAL_WEDS);
				if (response.data.success) {
					setWeds(response.data.data);
                    setDataKeys(Object.keys(response.data.data))
				} else {
					toast({
						title: "Procedure (WEDS)",
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

        loadWeds();
    }, []);
    return (
        <Card  minH={"600px"} w={'full'}>
            <CardHeader>
                {props.title}
            </CardHeader>   
            <CardBody>
                <VStack align={'start'}>
                    {dataKeys.length > 0 && dataKeys.map((dataKey, idx)=> (
                        <WedItem dataKey={dataKey} data={weds[dataKey]} key={idx}/>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    )
}

export default WEDS;