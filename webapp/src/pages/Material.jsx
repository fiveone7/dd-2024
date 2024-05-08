import { Box, Button, Card, CardBody, CardHeader, Grid, GridItem, VStack } from "@chakra-ui/react";
import { useState } from "react";
import HowTo from "../components/reference/howto";
import WEDS from "../components/reference/weds";
import Glossary from "../components/reference/glossary";
import PIM from "../components/reference/pim";
import Rules from "../components/reference/rules";
import Correctly from "../components/reference/correctly";
import Not from "../components/reference/not";

function Material() {
    const [contentOpened, setContentOpened] = useState(1);
    const [contentTitle, setContentTitle] = useState("");
    const handleContentHeader = (title, itemIdx) => {
        setContentOpened(itemIdx);
        setContentTitle(title);
    };
    return (
        <Box w={"full"}>
            <Grid
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={4}
            >
                <GridItem rowSpan={1} colSpan={1} w={"full"}>
                    <Card>
                        <CardHeader>
                            Reference Materials
                        </CardHeader>
                        <CardBody>
                            <VStack  w={"full"} align={"start"}>
                                <Button colorScheme={
                                        contentOpened === 1 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            1
                                        )
                                    }>
                                        How to Dialogue
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 2 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            2
                                        )
                                    }>
                                        Glossary
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 3 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            3
                                        )
                                    }>
                                        Describing Feelings (PIM)
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 4 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            4
                                        )
                                    }>
                                        Procedure (WEDS)
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 5 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            5
                                        )
                                    }>
                                        Ground Rules
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 6 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            6
                                        )
                                    }>
                                        How to dialogue correctly
                                </Button>
                                <Button colorScheme={
                                        contentOpened === 7 ? "blue" : "gray"
                                    }
                                    w={"full"}
                                    onClick={(e) =>
                                        handleContentHeader(
                                            e.target.innerText,
                                            7
                                        )
                                    }>
                                        How NOT to dialogue
                                </Button>

                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2} w={"full"}>
                    {contentOpened === 1 && <HowTo title={contentTitle}/>}
                    {contentOpened === 2 && <Glossary title={contentTitle}/>}
                    {contentOpened === 3 && <PIM title={contentTitle}/>}
                    {contentOpened === 4 && <WEDS title={contentTitle}/>}
                    {contentOpened === 5 && <Rules title={contentTitle}/>}
                    {contentOpened === 6 && <Correctly title={contentTitle}/>}
                    {contentOpened === 7 && <Not title={contentTitle}/>}
                </GridItem>
            </Grid>
        </Box>
    );
}

export default Material;
