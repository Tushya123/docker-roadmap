const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Set up mongoose connection
mongoose.connect(process.env.MONGO_URI, {});
console.log(process.env.MONGO_URI)

const EntrySchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', EntrySchema);

app.get('/', async (req, res) => {
  try {
    const entry = new Entry({ text: 'This is an entry' });
    await entry.save();
    res.send('Entry added!');
  } catch (err) {
    res.status(500).send('Error occurred');
  }
});
app.get('/check', async (req, res) => {
  try {
    const entry = await Entry.find({})
    res.json(entry);
  } catch (err) {
    res.status(500).send('Error occurred asda
      ');
  }
});
app.get('/remove', async (req, res) => {
  try {
    const entry = await Entry.deleteMany({});
    res.json(entry);
  } catch (err) {
    res.status(500).send('Error occurred');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

