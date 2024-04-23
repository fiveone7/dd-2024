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

module.exports = user;