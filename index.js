const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.fk1xdrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
  newSensorData.save().then(() => res.status(200).send('Data saved successfully'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
