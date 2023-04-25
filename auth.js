const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

// MongoDB Atlas connection string with credentials
const uri = "mongodb+srv://admin:admin@sukeshdb.qkgkjzh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Authenticate user
app.post('/authenticate', (req, res) => {
  client.connect(err => {
    if (err) throw err;
    const collection = client.db("<database-name>").collection("<collection-name>");
    const { username, password } = req.body;
    collection.findOne({ username, password }, (err, user) => {
      if (err) throw err;
      if (user) {
        res.send('User authenticated successfully!');
      } else {
        res.send('Invalid username or password');
      }
      client.close();
    });
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
