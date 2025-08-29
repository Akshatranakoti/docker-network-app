const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware to parse JSON

// ✅ MongoDB Connection (replace <MONGO_URI> with your actual MongoDB URI)
const MONGO_URI = 'mongodb://172.17.0.3:27017/mydb'; // change if using Atlas or different host

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Define a simple schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const Person = mongoose.model('Person', personSchema);

// ------------------- RICK & MORTY API ROUTES -------------------
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

app.get('/locations', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/location');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.get('/episodes', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/episode');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

// ------------------- MONGODB ROUTES -------------------

// Create new person
app.post('/people', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const saved = await newPerson.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all people
app.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get person by ID
app.get('/people/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update person
app.put('/people/:id', async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete person
app.delete('/people/:id', async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- START SERVER -------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
