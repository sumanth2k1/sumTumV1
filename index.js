const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()  

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

const SensorDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  flowRate: Number,
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

app.post('/data', (req, res) => {
  const { temperature, humidity, flowRate } = req.body;
  const newSensorData = new SensorData({ temperature, humidity, flowRate });
  newSensorData.save()
    .then(() => res.status(200).send('Data saved successfully'))
    .catch(err => res.status(500).send('Error saving data: ' + err.message));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
