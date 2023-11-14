const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://amorales:Kable123@cluster0.a2his0y.mongodb.net/', {});


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const chatbotRouter = require('./routes/cbRoutes');
app.use('/chatbot', chatbotRouter);

// New route to save data to MongoDB
app.post('/saveData', async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // Example: Save data to the 'items' collection in MongoDB
    const newItem = new Item({ name: userPrompt });
    await newItem.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

