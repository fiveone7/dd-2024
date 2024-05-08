import { Card, CardBody, Text, CardHeader, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import GlossaryItem from "./items/glossaryItem";
function Glossary(props) {
    const [glossary, setGlossary] = useState({});
    const [dataKeys, setDataKeys] = useState([]);
    const toast = useToast();
    useEffect(()=> {
        const loadGlossary = async ()=> {
            try {
				const response = await axios.get(API_URLS.MATERIAL_GLOSSARY);
				if (response.data.success) {
					setGlossary(response.data.data);
                    setDataKeys(Object.keys(response.data.data))
				} else {
					toast({
						title: "Glossary",
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

        loadGlossary();
    }, []);
    return (
        <Card  minH={"600px"} w={'full'}>
            <CardHeader>
                {props.title}
            </CardHeader>
            <CardBody>
                <VStack align={'start'}>
                    {dataKeys.length > 0 && dataKeys.map((dataKey, idx)=> (
                        <GlossaryItem dataKey={dataKey} data={glossary[dataKey]} key={idx}/>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    )
}

export default Glossary;