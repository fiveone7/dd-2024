import { Box, Card, CardBody, CardHeader, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";

function ContentItem (props) {
    return (
        <Card w={'full'}>
            <CardHeader>
                {props.dataKey}
            </CardHeader>
            <CardBody>
                <OrderedList>
                    {props.data && props.data.length > 0 && props.data.map((dataItem, idx)=> (
                        <ListItem key={idx}>
                            <Text>
                                {dataItem.step}
                            </Text>
                            <UnorderedList>
                            {dataItem.content && dataItem.content.length > 0 && dataItem.content.map((contentItem, idxx)=> (
                                <ListItem key={idxx}>
                                    {contentItem}
                                </ListItem>                                
                            ))}
                            </UnorderedList>
                        </ListItem>
                    ))}
                </OrderedList>
            </CardBody>
        </Card>
    )
}

export default ContentItem;