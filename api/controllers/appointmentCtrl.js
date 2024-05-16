const { getAppointmentsCollection } = require("../helpers/db-conn");
const fs = require('fs');
const { checkExist } = require("./authCtrl");
const AppointmentCtrl = () => {

    const countExistingAppointments = async(email, date) => {
        try {
            const collection = getAppointmentsCollection();
            const count = collection.countDocuments({ $or: [{ myEmail: email }, { spouseEmail: email }], date: date });
            return count;
        } catch (e) {
            return -1;
        }
    }

    const getExistingAppointments = async(email, date) => {
        console.log(email)
        try {
            const collection = getAppointmentsCollection();
            const appointments = collection.find({ $or: [{ myEmail: email }, { spouseEmail: email }], date: {$gte: date }});
            return appointments.toArray();
        } catch (e) {
            return [];
        }
    }

    const create = async (data) => {
        try {
            const collection = getAppointmentsCollection();
            const {
                date, writingTime, sharingTime, category, question, myEmail, spouseEmail
            } = data;

            // const spouse = await checkExist(spouseEmail);
            // if (!spouse) {
            //     return { success: false, message: "Your spouse has not registered at Dialogue Daily app yet. Please try again after your spouse registration" }
            // }

            const count = await countExistingAppointments(myEmail, date);
            if ( count === -1) {
                return { success: false, message: "MongDB API Error" }
            } else {
                if (count > 0) {
                    return { success: false, message: "You already have appointmented or have a dialogue at that day" }
                } else {
                    const dialogue = await collection.insertOne({
                        date, writingTime, sharingTime, category, question, myEmail, spouseEmail
                    });
                    if (dialogue) {
                        return { success: true, message: "Added Dialogue Successfully" }
                    }
                    else {
                        return { success: false, message: "MongDB API Error" }
                    }
                }
            }
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    const getAppointments = async (email, date) => {
        try {
            const appointments = await getExistingAppointments(email, date);
            return { success: true, message: "Success!", data: appointments };
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    return {
        create,
        getAppointments
    }
}

module.exports = AppointmentCtrl();