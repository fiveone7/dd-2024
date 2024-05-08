const express = require('express');
const auth = express.Router();
const authCtrl = require('../controllers/authCtrl');

auth.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;
        res.send(await authCtrl.login(email, password));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

auth.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;
        res.send(await authCtrl.register(email, password));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

auth.post('/reset_password', async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;
        const current_password = data.currentPwd;
        res.send(await authCtrl.resetPassword(email, password, current_password));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

module.exports = auth;