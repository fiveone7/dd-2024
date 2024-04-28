const { getUserCollection } = require("../helpers/db-conn");
const { checkExist } = require("./authCtrl");

const UserCtrl = () => {
    const updateContact = async (contact) => {
        const collection = getUserCollection();
        if (validateInfo(contact)) {
            console.log(contact);
            const user = await checkExist(contact["myEmail"]);
            if (user) {
                await collection.updateOne(
                    {
                        email: contact["myEmail"],
                    },
                    {
                        $set: {
                            contact: contact,
                        },
                    }
                );
                return { success: true, message: "Updated successfully" };
            } else {
                return {
                    success: false,
                    message: "Provided email is not correct.",
                };
            }
        } else {
            return { success: false, message: "Invalid information" };
        }
    };

    const getContact = async (email) => {
        const user = await checkExist(email);
        return {
            success: true,
            message: "Get contact information",
            data: user,
        };
    };

    const updateAppointment = async ({ appointments, email }) => {
        const collection = getUserCollection();
        if (validateInfo(appointments)) {
            const user = await checkExist(email);
            if (user) {
                await collection.updateOne(
                    {
                        email: email,
                    },
                    {
                        $set: {
                            appointments: appointments,
                        },
                    }
                );
                return { success: true, message: "Updated successfully" };
            } else {
                return {
                    success: false,
                    message: "Provided email is not correct.",
                };
            }
        } else {
            return { success: false, message: "Invalid information" };
        }
    };

    const getAppointment = async (email) => {
        const user = await checkExist(email);
        return {
            success: true,
            message: "Get appointment defaults",
            data: user["appointments"],
        };
    };

    const updateTimers = async ({ timers, email }) => {
        const collection = getUserCollection();
        if (validateInfo(timers)) {
            const user = await checkExist(email);
            if (user) {
                await collection.updateOne(
                    {
                        email: email,
                    },
                    {
                        $set: {
                            timers: timers,
                        },
                    }
                );
                return { success: true, message: "Updated successfully" };
            } else {
                return {
                    success: false,
                    message: "Provided email is not correct.",
                };
            }
        } else {
            return { success: false, message: "Invalid information" };
        }
    };

    const getTimers = async (email) => {
        const user = await checkExist(email);
        return {
            success: true,
            message: "Get timer defaults",
            data: user["timers"],
        };
    };

    const updateWords = async ({ words, email }) => {
        const collection = getUserCollection();
        if (validateInfo(timers)) {
            const user = await checkExist(email);
            if (user) {
                await collection.updateOne(
                    {
                        email: email,
                    },
                    {
                        $set: {
                            words: words,
                        },
                    }
                );
                return { success: true, message: "Updated successfully" };
            } else {
                return {
                    success: false,
                    message: "Provided email is not correct.",
                };
            }
        } else {
            return { success: false, message: "Invalid information" };
        }
    };

    const getWords = async (email) => {
        const user = await checkExist(email);
        return {
            success: true,
            message: "Get email wordings",
            data: user["words"],
        };
    };

    const validateInfo = (value) => {
        if (!value) {
            return false;
        } else {
            const keys = Object.keys(value);
            for (let i = 0; i < keys.length; i++) {
                if (!value[keys[i]] || value[keys[i]] === "") {
                    return false;
                }
            }
            return true;
        }
    };

    return {
        updateContact,
        getContact,
        updateAppointment,
        getAppointment,
        updateTimers,
        getTimers,
        updateWords,
        getWords
    };
};

module.exports = UserCtrl();
