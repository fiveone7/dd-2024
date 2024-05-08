import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    SimpleGrid,
    Heading,
    Center,
    Highlight,
} from "@chakra-ui/react";

function Pricing() {
    const purchase = (mode) => {};
    return (
        <Box p={4} w={"full"}>
            <SimpleGrid columns={3} spacing={8}>
                <Card>
                    <CardHeader>
                        <Center>
                            <Heading>Monthly</Heading>
                        </Center>
                    </CardHeader>
                    <CardBody>
                        <Highlight
                            query={["$1", "1 month"]}
                            styles={{
                                px: "2",
                                rounded: "lg",
                                color: "white",
                                bg: "blue.400",
                            }}
                        >
                            Are you sure to purchase for $1 now? You can use
                            this app for 1 month.
                        </Highlight>
                    </CardBody>
                    <CardFooter>
                        <Button
                            colorScheme="blue"
                            w={"full"}
                            onClick={() => purchase(1)}
                        >
                            Purchase
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Center>
                            <Heading>Annual</Heading>
                        </Center>
                    </CardHeader>
                    <CardBody>
                        <Highlight
                            query={["$10", "1 year"]}
                            styles={{
                                px: "2",
                                rounded: "lg",
                                color: "white",
                                bg: "blue.400",
                            }}
                        >
                            Are you sure to purchase for $10 now? You can use
                            this app for 1 year.
                        </Highlight>
                    </CardBody>
                    <CardFooter>
                        <Button
                            colorScheme="blue"
                            w={"full"}
                            onClick={() => purchase(2)}
                        >
                            Purchase
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Center>
                            <Heading>Lifetime</Heading>
                        </Center>
                    </CardHeader>
                    <CardBody>
                        <Highlight
                            query={["$25", "lifetime"]}
                            styles={{
                                px: "2",
                                rounded: "lg",
                                color: "white",
                                bg: "blue.400",
                            }}
                        >
                            Are you sure to purchase for $25 now? You can use
                            this app for lifetime.
                        </Highlight>
                    </CardBody>
                    <CardFooter>
                        <Button
                            colorScheme="blue"
                            w={"full"}
                            onClick={() => purchase(3)}
                        >
                            Purchase
                        </Button>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </Box>
    );
}

export default Pricing;
