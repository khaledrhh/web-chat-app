// Import the necessary libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

// Initialize an Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to receive user messages and forward them to Copilot
app.post('/sendMessage', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Make a request to the Copilot API (replace with your actual Copilot API endpoint)
    const response = await axios.post('https://your-copilot-api-endpoint', {
      prompt: userMessage, // Send user message as a prompt to Copilot
      // Add any necessary headers for authentication (if needed)
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY' // Replace with your API key if needed
      }
    });

    // Send back the bot's response
    const botReply = response.data.reply; // Assuming the bot's reply is in the 'reply' field
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error connecting to Copilot:', error);
    res.status(500).json({ reply: 'Sorry, something went wrong. Please try again later.' });
  }
});

// Start the server on port 3000 or the default environment port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
