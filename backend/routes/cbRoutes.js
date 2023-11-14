const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

// Route to interact with the chatbot
router.post('/', (req, res) => {
  const { userPrompt } = req.body;

  // Call the Python script with the user prompt
  const pythonProcess = spawn('python', ['../openai-test.py', userPrompt]);

  let responseData = '';

  // Collect data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });

  // Handle Python script completion
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ assistantResponse: responseData });
    } else {
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;
