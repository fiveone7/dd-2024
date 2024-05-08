import {
    Card,
    CardBody,
    CardHeader,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
    VStack,
} from "@chakra-ui/react";

function GlossaryItem(props) {
    const dataItemKeys = Object.keys(props.data);

    return (
        <Card w={"full"}>
            <CardHeader>{props.dataKey}</CardHeader>
            <CardBody>
                <UnorderedList>
                    {dataItemKeys.length > 0 &&
                        dataItemKeys.map((dataItemKey, idx) => (
                            <ListItem key={idx}>
                                <Text>{dataItemKey}</Text>
                                <Text>{props.data[dataItemKey]}</Text>
                            </ListItem>
                        ))}
                </UnorderedList>
            </CardBody>
        </Card>
    );
}

export default GlossaryItem;
