
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
        const user = await collection.insertOne({ email, password, contact: {}, verified: false, appointments: {
            'Sun_writing': '9 0 AM',
            'Sun_sharing': '6 0 PM',
            'Mon_writing': '9 0 AM',
            'Mon_sharing': '6 0 PM',
            'Tue_writing': '9 0 AM',
            'Tue_sharing': '6 0 PM',
            'Wed_writing': '9 0 AM',
            'Wed_sharing': '6 0 PM',
            'Thu_writing': '9 0 AM',
            'Thu_sharing': '6 0 PM',
            'Fri_writing': '9 0 AM',
            'Fri_sharing': '6 0 PM',
            'Sat_writing': '9 0 AM',
            'Sat_sharing': '6 0 PM',
        }, timers: {}, wordings: {} });
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