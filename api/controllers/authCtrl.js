
const { getUserCollection } = require('../helpers/db-conn');

const AuthCtrl = () => {

    const checkExist = async (email) => {
        const collection = getUserCollection();
        const user = await collection.findOne({ email: email });
        if (user)
            return user;
        return false;
    }

    const login = async (email, password) => {
        const collection = getUserCollection();
        if (!await checkExist(email)) {
            return { "success": false, "message": "User doesn't exists" }
        }
        const user = await collection.findOne({ email, password });
        if (user) {
            return { "success": true, "message": "Logged in successfully", "token": '1234567890', "user": user };
        } else {
            return { "success": false, "message": "User doesn't exists" };
        }
    }

    const register = async (email, password) => {
        if (await checkExist(email)) {
            return { "success": false, "message": "User already exists" }
        }
        const collection = getUserCollection();
        const user = await collection.insertOne({ email, password, contact: {}, verified: false, appointments: {}, timers: {}, wordings: {} });
        if (user) {
            return { "success": true, "message": "Registered successfully" }
        } else {
            return { "success": false, "message": "MongoDB API error" }
        }
    }

    return {
        login, register, checkExist
    }
}


module.exports = AuthCtrl()