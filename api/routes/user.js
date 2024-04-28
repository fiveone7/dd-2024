const express = require('express');
const user = express.Router();
const userCtrl = require('../controllers/userCtrl');

user.post('/contact_update', async(req, res)=> {
    try {
        const data = req.body;
        res.send(await userCtrl.updateContact(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/contact', async(req, res)=> {
    try {
        const {email} = req.body;
        res.send(await userCtrl.getContact(email));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/appointment_update', async(req, res)=> {
    try {
        const data = req.body;
        res.send(await userCtrl.updateAppointment(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/appointment', async(req, res)=> {
    try {
        const {email} = req.body;
        res.send(await userCtrl.getAppointment(email));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/timers_update', async(req, res)=> {
    try {
        const data = req.body;
        res.send(await userCtrl.updateTimers(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/timers', async(req, res)=> {
    try {
        const {email} = req.body;
        res.send(await userCtrl.getTimers(email));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/words_update', async(req, res)=> {
    try {
        const data = req.body;
        res.send(await userCtrl.updateWords(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

user.post('/words', async(req, res)=> {
    try {
        const {email} = req.body;
        res.send(await userCtrl.getWords(email));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

module.exports = user;