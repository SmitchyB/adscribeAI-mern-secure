// backend/server.js

const express = require('express'); // Importing express to create the server
const cors = require('cors'); // Importing cors to handle Cross-Origin Resource Sharing

// --- (CHANGE 1) LOAD ENVIRONMENT VARIABLES ---
// This line loads the variables from your .env file into process.env
require('dotenv').config();

const app = express(); // Create an instance of express
const PORT = 5001; // Define the port on which the server will listen

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for incoming requests

// Route to handle product description generation
app.post('/api/generate', async (req, res) => {
  const { productName, keywords } = req.body; // Extract productName and keywords from the request body

  // --- (CHANGE 2) USE THE ENVIRONMENT VARIABLE ---
  // The key is now securely accessed from the environment instead of being hardcoded.
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  // Check if the API key is set
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured.' });
  }
// Construct the prompt for the OpenAI API
  const prompt = `Write a short, catchy, and professional product description for a "${productName}" that highlights these keywords: "${keywords}".`;
  
  // try to call the OpenAI API to generate a product description
  try {
    // Make a POST request to the OpenAI API with the constructed prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // --- (CHANGE 3) USE THE ENVIRONMENT VARIABLE IN THE HEADER ---
        // The hardcoded key is used in the authorization header
        'Authorization': `Bearer ${OPENAI_API_KEY}` 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the model to use
        messages: [{ role: "user", content: prompt }], // The prompt is sent as a message from the user
        max_tokens: 100, // Limit the length of the response
      }),
    });
    // Check if the response from OpenAI is OK
    if (!response.ok) {
      // If the API call fails, send back an error
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData); // Log the error from OpenAI
      throw new Error(`OpenAI API returned an error: ${response.statusText}`); // Throw an error to be caught in the catch block
    }

    const data = await response.json(); // Parse the JSON response from OpenAI
    
    // Extract the generated text from the OpenAI response
    const description = data.choices[0].message.content.trim();
    
    // Send the description back to the frontend
    res.json({ description });

  } catch (error) {
    console.error('Error in /api/generate:', error);
    res.status(500).json({ error: 'Failed to generate description.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});