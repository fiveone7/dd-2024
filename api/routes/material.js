const express = require('express');
const material = express.Router();
const fs = require('fs');

material.get('/howto', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['howto']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

material.get('/glossary', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['glossary']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

material.get('/pim', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['pim']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

material.get('/weds', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['weds']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

material.get('/rules', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['rules']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

material.get('/videos', async(req, res)=> {
    const materials = JSON.parse(fs.readFileSync('assets/materials.json', 'utf8'));
    try {
        if (materials) {
            res.send({ success: true, message: "Success!", data: materials['videos']});
        } else {
            res.send({ success: false, message: "Material data doesn't exist" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: `API error ${e.message}` });
    }
});

module.exports = material;