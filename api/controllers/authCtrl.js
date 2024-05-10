const { getUserCollection } = require("../helpers/db-conn");

const AuthCtrl = () => {
    const checkExist = async (email) => {
        const collection = getUserCollection();
        const user = await collection.findOne({ email: email });
        if (user) return user;
        return false;
    };

    const login = async (email, password) => {
        const collection = getUserCollection();
        if (!(await checkExist(email))) {
            return { success: false, message: "User doesn't exists" };
        }
        const user = await collection.findOne({ email, password });
        if (user) {
            return {
                success: true,
                message: "Logged in successfully",
                token: "1234567890",
                user: user,
            };
        } else {
            return { success: false, message: "User doesn't exists" };
        }
    };

    const register = async (email, password) => {
        if (await checkExist(email)) {
            return { success: false, message: "User already exists" };
        }
        const collection = getUserCollection();
        const user = await collection.insertOne({
            email,
            password,
            contact: {},
            verified: false,
            appointments: {
                Sun_writing: [9, 0, 0],
                Sun_sharing: [6, 0, 1],
                Mon_writing: [9, 0, 0],
                Mon_sharing: [6, 0, 1],
                Tue_writing: [9, 0, 0],
                Tue_sharing: [6, 0, 1],
                Wed_writing: [9, 0, 0],
                Wed_sharing: [6, 0, 1],
                Thu_writing: [9, 0, 0],
                Thu_sharing: [6, 0, 1],
                Fri_writing: [9, 0, 0],
                Fri_sharing: [6, 0, 1],
                Sat_writing: [9, 0, 0],
                Sat_sharing: [6, 0, 1],
            },
            timers: {
                write_time: 5, // 5 mins
                write_alarm: [
                    {
                        time: 2, // 2 mins
                        enabled: true,
                        unit: "m",
                    },
                    {
                        time: 40, // 1 mins
                        enabled: true,
                        unit: "s",
                    },
                ],
                audio_time: 5, // 5 mins
                audio_alarm: [
                    {
                        time: 1, // 1 min
                        enabled: true,
                        unit: "m",
                    },
                ],
                video_time: 3, // 3 mins
                video_alarm: [
                    {
                        time: 1, // 1 min
                        enabled: true,
                        unit: "m",
                    },
                ],
            },
            words: {
                appointment: '',
                done: '',
                share: ''
            },
            subscription: {
                date: new Date(),
                plan: 0
            }
        });
        if (user) {
            return { success: true, message: "Registered successfully" };
        } else {
            return { success: false, message: "MongoDB API error" };
        }
    };

    const resetPassword = async(email, password, currentPassword) => {
        const user = await checkExist(email);
        if (user && user.password == currentPassword) {
            const collection = getUserCollection();
            await collection.updateOne(
                {
                    email: email,
                },
                {
                    $set: {
                        password: password,
                    },
                }
            );
            return { success: true, message: "Password has been reset" };
        } else {
            return { success: false, message: "Current password is not correct" };
        }
    }

    return {
        login,
        register,
        checkExist,
        resetPassword
    };
};

module.exports = AuthCtrl();
