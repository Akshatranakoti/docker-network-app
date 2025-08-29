const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Example route: fetch characters from Rick & Morty API
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// Example route: fetch locations
app.get('/locations', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/location');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Example route: fetch episodes
app.get('/episodes', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/episode');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

// Listen on 0.0.0.0 so it’s accessible from outside EC2
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
