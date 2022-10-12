const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express')
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// dot env
require('dotenv').config()

// mongo connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qjzspe9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => res.send('Hello World!'))
async function connect() {
    await client.connect();
    console.log(uri);
    console.log('Connected to MongoDB');

    const clientInfoCollection = client.db("clientInfo").collection("clients")

    app.post('/addclient', async (req, res) => {
        try {
            const client = req.body;
            const result = await clientInfoCollection.insertOne(client);
            res.send(result)

        }
        catch (error) {
            console.log(error)
        }

    })

    app.get('/allclients', async (req, res) => {
        try {
            const query = {}
            const gettingClient = clientInfoCollection.find(query);
            const result = await gettingClient.toArray()
            res.send(result)
        }
        catch (error) {
            console.log(error);
        }
    })
}

connect().catch(console.dir);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



