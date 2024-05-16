const express = require('express');
const dialogue = express.Router();
const dialogueCtrl = require('../controllers/dialogueCtrl');

dialogue.get('/question_category_list', async(req, res)=> {
    try {
        res.send(await dialogueCtrl.getCategoryList());
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});


dialogue.get('/feeling_category_list', async(req, res)=> {
    try {
        res.send(await dialogueCtrl.getFeelingCategoryList());
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

dialogue.post('/create', async(req, res) => {
    try {
        const data = req.body;
        res.send(await dialogueCtrl.create(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}`});
    }
});

dialogue.post('/appointments', async( req, res) => {
    try {
        const { email, date } = req.body;
        res.send(await dialogueCtrl.getAppointments(email, date));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}`});
    }
});

module.exports = dialogue;