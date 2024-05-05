import express from 'express';

import db from "../db/connection.js";
import { ObjectId } from 'mongodb'; // helps convert the ID from string to ObjectId for the _id

const router = express.Router();


// API Endpoints
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200)
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let results = await collection.findOne(query);

    if (!result) res.send("Record not found").status(404);
    else res.send(result).status(200)
});

router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        res.send(err).status(500)
        console.log("Error adding Record")
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };
        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        res.send(err)
        res.status(500).send("Error updating Record")
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.log(err)
        res.status(500).send("Error deleting Record")
    }
});

export default router;


