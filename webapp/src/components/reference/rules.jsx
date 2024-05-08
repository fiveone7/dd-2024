import {
    Card,
    CardBody,
    CardHeader,
    useToast,
    OrderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URLS } from "../../Constants";
import axios from "axios";
import RuleItem from "./items/ruleItem";
function Rules(props) {
    const [rules, setRules] = useState({});
    const [dataKeys, setDataKeys] = useState([]);
    const toast = useToast();
    useEffect(() => {
        const loadRules = async () => {
            try {
                const response = await axios.get(API_URLS.MATERIAL_RULES);
                if (response.data.success) {
                    setRules(response.data.data);
                    setDataKeys(Object.keys(response.data.data));
                } else {
                    toast({
                        title: "Ground Rules",
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

        loadRules();
    }, []);
    return (
        <Card minH={"600px"} w={"full"}>
            <CardHeader>{props.title}</CardHeader>
            <CardBody>
                <OrderedList align={"start"}>
                    {dataKeys.length > 0 &&
                        dataKeys.map((dataKey, idx) => (
                            <RuleItem
                                dataKey={dataKey}
                                data={rules[dataKey]}
                                key={idx}
                            />
                        ))}
                </OrderedList>
            </CardBody>
        </Card>
    );
}

export default Rules;
