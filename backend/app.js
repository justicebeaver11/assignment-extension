const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database'); 
const Profile = require('./models/Profile'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.bulkCreate(req.body);
    res.status(201).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});


