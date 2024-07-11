const dotenv = require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Location = require('./models/Location');
const User = require('./models/User');
const app = express();

// app.use(cors({
//     origin: 'http://localhost:2000',
//     credentials: true,// Allow requests from this origin
//   }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});
// Create a new user
app.post('/users', async (req, res) => {
    try {
      const { username} = req.body;
      const newUser = new User({ username});
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(600).json({ error: error.message });
    }
  });
  
  // Create a new location for a user
  app.post('/users/:userId/locations', async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newLocation = new Location({ name });
      await newLocation.save();
  
      user.savedLocations.push(newLocation);
      await user.save();
  
      res.status(201).json({ user, location: newLocation });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find().populate('savedLocations');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a location for a user
  app.delete('/users/:userId/locations/:locationId', async (req, res) => {
    try {
      const { userId, locationId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.savedLocations = user.savedLocations.filter(loc => loc._id.toString() !== locationId);
      await user.save();
  
      await Location.findByIdAndDelete(locationId);
  
      res.json({ message: 'Location deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const dbUri = process.env.MONGO_URI;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.error('Connection failed:', error);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
