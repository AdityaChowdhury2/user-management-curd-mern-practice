const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

//middleware
app.use(express.json())
app.use(cors());

//mongodb connection
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vzzrbcr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db("userDb");
        const userCollection = database.collection("users");

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params;
            const filter = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(filter);

            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params;
            const filter = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(filter)
            res.send(result);
        })

        app.put('/users/:id', async (req, res) => {
            const id = req.params;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const result = await userCollection.updateOne(filter, {
                $set: {
                    ...updatedUser
                }
            })
            res.send(result)
        })


    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);


app.get('/', (req, res) => res.send("Welcome to my user management application"))

app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
})