import {
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

function RuleItem(props) {
    return (
        <ListItem>
            <Text>{props.dataKey}</Text>

            {Array.isArray(props.data) && props.data.length > 0 && (
                <UnorderedList>
                    {props.data.map((dataItem, idx) => (
                        <ListItem>{dataItem}</ListItem>
                    ))}
                </UnorderedList>
            )}
        </ListItem>
    );
}

export default RuleItem;
