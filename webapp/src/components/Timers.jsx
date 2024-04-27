import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Button,
    FormControl,
    FormLabel,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { API_URLS } from "../Constants";
import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";

function Timers() {
    const [isSaving, setIsSaving] = useState(false);
    const { timers, setTimers } = useContext(AppContext);
    const { cookieAlive } = useContext(AuthContext);
    const toast = useToast();

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await axios.post(API_URLS.TIMERS_UPDATE, { timers, email: cookieAlive() });
			if (response.data.success) {
				toast({
					title: "Timer Defaults",
					description: `${response.data.message}.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Timer Defaults",
					description: `${response.data.message}.`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
            setIsSaving(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
		const loadTimers = async () => {
			if (!cookieAlive()) return;
			try {
				const response = await axios.post(API_URLS.TIMERS_INFO, {
					email: cookieAlive(),
				});
				if (response.data.success) {
					const timers = response.data.data;
					setTimers(timers);
				} else {
					toast({
						title: "Timer Defaults",
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
		loadTimers();
	}, [cookieAlive, setTimers, toast]);

    const handleChangeTime = (time, type) => {
        const newTimers = { ...timers };
        newTimers[`${type}_time`] = time;

        setTimers(newTimers);
    };

    const handleChangeAlarm = (time, type, index) => {
        const newTimers = { ...timers };
        newTimers[`${type}_alarm`][index].time = time;
    };

    const handleChangeAlarmUnit = (unit, type, index) => {
        const newTimers = { ...timers };
        newTimers[`${type}_alarm`][index].unit = unit;
    };

    const handleEnableAlarm = (checked, type, index) => {
        const newTimers = { ...timers };
        newTimers[`${type}_alarm`][index].enabled = checked;
    };

    return (
        <Card minH={"600px"}>
            <CardHeader>Timer Defaults</CardHeader>
            <CardBody>
                <VStack gap={8} align={"start"}>
                    <FormControl>
                        <VStack align={"start"}>
                            <FormLabel>
                                Set time and alarm for Write Timer
                            </FormLabel>
                            <HStack gap={4} w={"full"}>
                                <Text minW={"5rem"}>Main</Text>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.write_time}
                                    onChange={(e) =>
                                        handleChangeTime(e, "write")
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text>Minutes</Text>
                            </HStack>
                            <HStack gap={4} w={"full"}>
                                <Checkbox
                                    minW={"5rem"}
                                    onChange={(e) =>
                                        handleEnableAlarm(
                                            e.target.checked,
                                            "write",
                                            0
                                        )
                                    }
                                    isChecked={timers.write_alarm[0].enabled}
                                >
                                    Alarm 1
                                </Checkbox>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.write_alarm[0].time}
                                    onChange={(e) =>
                                        handleChangeAlarm(e, "write", 0)
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <RadioGroup
                                    value={timers.write_alarm[0].unit}
                                    onChange={(e) =>
                                        handleChangeAlarmUnit(e, "write", 0)
                                    }
                                >
                                    <Stack spacing={4} direction={"row"}>
                                        <Radio value="m">Minutes</Radio>
                                        <Radio value="s">Seconds</Radio>
                                    </Stack>
                                </RadioGroup>
                            </HStack>
                            <HStack gap={4} w={"full"}>
                                <Checkbox
                                    minW={"5rem"}
                                    onChange={(e) =>
                                        handleEnableAlarm(
                                            e.target.checked,
                                            "write",
                                            1
                                        )
                                    }
                                    isChecked={timers.write_alarm[1].enabled}
                                >
                                    Alarm 2
                                </Checkbox>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.write_alarm[1].time}
                                    onChange={(e) =>
                                        handleChangeAlarm(e, "write", 1)
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <RadioGroup
                                    defaultValue="m"
                                    value={timers.write_alarm[1].unit}
                                    onChange={(e) =>
                                        handleChangeAlarmUnit(e, "write", 1)
                                    }
                                >
                                    <Stack spacing={4} direction={"row"}>
                                        <Radio value="m">Minutes</Radio>
                                        <Radio value="s">Seconds</Radio>
                                    </Stack>
                                </RadioGroup>
                            </HStack>
                        </VStack>
                    </FormControl>
                    <FormControl>
                        <VStack align={"start"}>
                            <FormLabel>
                                Set time and alarm for Audio Timer
                            </FormLabel>
                            <HStack gap={4} w={"full"}>
                                <Text minW={"5rem"}>Main</Text>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.audio_time}
                                    onChange={(e) =>
                                        handleChangeTime(e, "audio")
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text>Minutes</Text>
                            </HStack>
                            <HStack gap={4} w={"full"}>
                                <Checkbox
                                    minW={"5rem"}
                                    onChange={(e) =>
                                        handleEnableAlarm(
                                            e.target.checked,
                                            "audio",
                                            0
                                        )
                                    }
                                    isChecked={timers.audio_alarm[0].enabled}
                                >
                                    Alarm
                                </Checkbox>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.audio_alarm[0].time}
                                    onChange={(e) =>
                                        handleChangeAlarm(e, "audio", 0)
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <RadioGroup
                                    defaultValue="m"
                                    value={timers.audio_alarm[0].unit}
                                    onChange={(e) =>
                                        handleChangeAlarmUnit(e, "audio", 0)
                                    }
                                >
                                    <Stack spacing={4} direction={"row"}>
                                        <Radio value="m">Minutes</Radio>
                                        <Radio value="s">Seconds</Radio>
                                    </Stack>
                                </RadioGroup>
                            </HStack>
                        </VStack>
                    </FormControl>
                    <FormControl>
                        <VStack align={"start"}>
                            <FormLabel>
                                Set time and alarm for Video Timer
                            </FormLabel>
                            <HStack gap={4} w={"full"}>
                                <Text minW={"5rem"}>Main</Text>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.video_time}
                                    onChange={(e) =>
                                        handleChangeTime(e, "video")
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text>Minutes</Text>
                            </HStack>
                            <HStack gap={4} w={"full"}>
                                <Checkbox
                                    minW={"5rem"}
                                    onChange={(e) =>
                                        handleEnableAlarm(
                                            e.target.checked,
                                            "video",
                                            0
                                        )
                                    }
                                    isChecked={timers.video_alarm[0].enabled}
                                >
                                    Alarm
                                </Checkbox>
                                <NumberInput
                                    w={"30rem"}
                                    min={0}
                                    max={59}
                                    value={timers.video_alarm[0].time}
                                    onChange={(e) =>
                                        handleChangeAlarm(e, "video", 0)
                                    }
                                >
                                    <NumberInputField></NumberInputField>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <RadioGroup
                                    defaultValue="m"
                                    value={timers.video_alarm[0].unit}
                                    onChange={(e) =>
                                        handleChangeAlarmUnit(e, "video", 0)
                                    }
                                >
                                    <Stack spacing={4} direction={"row"}>
                                        <Radio value="m">Minutes</Radio>
                                        <Radio value="s">Seconds</Radio>
                                    </Stack>
                                </RadioGroup>
                            </HStack>
                        </VStack>
                    </FormControl>
                </VStack>
            </CardBody>
            <CardFooter>
                <Button
                    w="full"
                    leftIcon={<FaSave />}
                    onClick={handleSave}
                    isLoading={isSaving}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Timers;
