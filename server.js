const MongoClient    = require('mongodb').MongoClient;
const assert         = require('assert');
const app            = require('express')();
const dbConn = "mongodb://localhost:27017";
const dbName = "vending";
const collectionName = "logs";

app.use(require('body-parser').json());

app.post('/', (req, res) => {
    console.log(req.body);
    let client = new MongoClient(dbConn, { useUnifiedTopology: true });
    client.connect(function(err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(req.body);
        client.close();
    });

    res.send("ok");
});

const port = 8000;
app.listen(port, () => {
    console.log('We are live on ' + port);
});