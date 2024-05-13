const express = require('express');
const dialogue = express.Router();
const dialogueCtrl = require('../controllers/dialogueCtrl');
dialogue.post('/create', async(req, res)=> {
    
});

dialogue.get('/category_list', async(req, res)=> {
    try {
        res.send(await dialogueCtrl.getCategoryList());
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

dialogue.post('/add', async(req, res) => {
    try {
        const data = req.body;
        res.send(await dialogueCtrl.addDialogue(data));
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}`});
    }
})

module.exports = dialogue;