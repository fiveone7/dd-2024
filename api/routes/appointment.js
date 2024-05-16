const express = require('express');
const appointment = express.Router();
const appointmentCtrl = require('../controllers/appointmentCtrl');

appointment.post('/create', async(req, res) => {
    try {
        const data = req.body;
        res.send(await appointmentCtrl.create(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}`});
    }
});

appointment.post('/appointments', async( req, res) => {
    try {
        const { email, date } = req.body;
        res.send(await appointmentCtrl.getAppointments(email, date));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}`});
    }
});

module.exports = appointment;