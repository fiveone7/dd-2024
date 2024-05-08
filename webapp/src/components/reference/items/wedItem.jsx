import {
    Card,
    CardBody,
    CardHeader,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

function WedItem(props) {
    return (
        <Card w={"full"}>
            <CardHeader>{props.dataKey}</CardHeader>
            <CardBody>
                <UnorderedList>
                    {props.data &&
                        props.data.length > 0 &&
                        props.data.map((dataItem, idx) => (
                            <ListItem key={idx}>
                                <Text>{dataItem}</Text>
                            </ListItem>
                        ))}
                </UnorderedList>
            </CardBody>
        </Card>
    );
}

export default WedItem;
