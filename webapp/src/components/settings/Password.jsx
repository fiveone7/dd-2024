import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormControl,
    FormLabel,
    VStack,
    useToast,
    InputGroup,
    Input,
    InputRightElement,
    FormHelperText
} from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";
import { API_URLS } from "../../Constants";
import { AuthContext } from "../../providers/AuthProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useContext, useState } from "react";

function Password() {
    const { cookieAlive } = useContext(AuthContext);
    const [isSaving, setIsSaving] = useState(false);
    const [currentPwd, setCurrentPwd] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");
    const [pwdValid, setPwdValid] = useState(false);
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [showPwdConfirm, setShowPwdConfirm] = useState(false);
    const handleShowPassword = () => setShowPwd(!showPwd);
    const handleShowPasswordConfirm = () => setShowPwdConfirm(!showPwdConfirm);
    const handleShowCurrentPassword = () => setShowCurrentPwd(!showCurrentPwd);
    const toast = useToast();
    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await axios.post(API_URLS.PASSWORD_RESET, {
                password: pwd,
                currentPwd: currentPwd,
                email: cookieAlive(),
            });
            if (response.data.success) {
                toast({
                    title: "Appointment Defaults",
                    description: `${response.data.message}.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Appointment Defaults",
                    description: `${response.data.message}.`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangeCurrentPwd = (e) => {
        setCurrentPwd(e.target.value);
    };

    const handleChangePwd = (e) => {
        setPwd(e.target.value);
    };

    const handleChangePwdConfirm = (e) => {
        setPwdConfirm(e.target.value);

        if (pwd !== e.target.value) setPwdValid(false);
        else setPwdValid(true);
    };

    return (
        <Card>
            <CardHeader>Reset Password</CardHeader>
            <CardBody>
                <VStack spacing={4}>
                <FormControl isRequired>
                        <FormLabel>Current Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPwd ? "text" : "password"}
                                placeholder="Enter current password"
                                defaultValue={pwd}
                                onChange={handleChangeCurrentPwd}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowCurrentPassword}
                                >
                                    {showPwd ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText>
                            {/* <Link>Forgot Password</Link> */}
                            Set your password strong
                        </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPwd ? "text" : "password"}
                                placeholder="Enter password"
                                defaultValue={pwd}
                                onChange={handleChangePwd}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowPassword}
                                >
                                    {showPwd ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText>
                            {/* <Link>Forgot Password</Link> */}
                            Set your password strong
                        </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={showPwd ? "text" : "password"}
                                placeholder="Enter password"
                                defaultValue={pwdConfirm}
                                onChange={handleChangePwdConfirm}
                                {...(pwdValid
                                    ? { borderColor: "green.500" }
                                    : { borderColor: "red.500" })}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleShowPasswordConfirm}
                                >
                                    {showPwdConfirm ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!pwdValid ? (
                            <FormHelperText color="red.500">
                                Confirm your password
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                </VStack>
            </CardBody>
            <CardFooter>
                <Button
                    w={"full"}
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

export default Password;
