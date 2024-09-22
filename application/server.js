const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Item = require('./Item');
require('dotenv').config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    fs.readFile('../data/data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the JSON file');
        }
        const graphData = JSON.parse(data);
        const items = graphData.data.map(item => new Item(item.name, item.description, item.parent));
        res.json(items);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});
