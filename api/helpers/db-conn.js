const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://nexor180237:lJe8mgsuHReSIRLR@cluster0.c4pvbgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongodbUri = 'mongodb+srv://defibizzylos:aaf0NKQ5yZKy9Z8Z@cluster0.p9e2zcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongodbUri);
let db;

connectToDatabase = async ()=> {
    try {
        await client.connect();
        db = client.db("dd");
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    } finally {
        await client.dis
    }
}

getDb = ()=> {
    return db;
}

getUserCollection = ()=> {
    return db.collection('users');
}

module.exports = { getDb, connectToDatabase, getUserCollection };