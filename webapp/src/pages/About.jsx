import { Box, VStack, Text, Card, CardBody} from "@chakra-ui/react";
function About() {
	return (
		<Box p={4}>
			<Card>
                <CardBody>
                    <VStack>
                        <Text>
                            After more than a decade into our marriage, we experienced almost every life stressor imaginable. We struggled on our own for 10 years.
                        </Text>
                        <Text>
                            Finally we found this DIALOGUE method of communication. We are now celebrating almost 50 years of marriage and loving it!
                        </Text>
                        <Text>
                            We developed this application for married and engaged couples looking for a communication strategy to help them renew, restore, and revitalize their relationship.
                        </Text>
                        <Text>
                            We strongly believe in the need for loving and committed marriages in the world.
                        </Text>
                        <Text>
                            A portion of the proceeds from your purchase go to our local non-profit Retrouvaille and Marriage Encounter communities.
                        </Text>
                        <Text>
                            Developed by Advanced WEB Strategies
                        </Text>
                        <Text>
                            Copyright 2024 All rights Reserved
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
		</Box>
	);
}

export default About;
