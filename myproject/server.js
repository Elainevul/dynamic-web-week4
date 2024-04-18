const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Load data from data.json
let data = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

// GET all data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// GET data by ID
app.get('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// POST create new data
app.post('/api/data', (req, res) => {
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    data.push(newItem);
    saveData();
    res.status(201).json(newItem);
});

// PUT update data by ID
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = {
            id: id,
            name: req.body.name,
            price: req.body.price
        };
        saveData();
        res.json(data[index]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// DELETE data by ID
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data = data.filter(item => item.id !== id);
    saveData();
    res.json({ message: 'Item deleted' });
});

// Save data to data.json
function saveData() {
    fs.writeFileSync('./db/data.json', JSON.stringify(data, null, 2));
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
