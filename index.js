const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // This allows you to handle JSON data

// POST request handler at route /bfhl
app.post('/bajaj', (req, res) => {
  const { data, file_b64 } = req.body; // Extracting 'data' and 'file_b64' from the request body

  // Extract numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Find the highest lowercase letter
  const lowercaseLetters = alphabets.filter(letter => letter === letter.toLowerCase());
  const highestLowercase = lowercaseLetters.sort().pop();  // Sort and get the last letter

  // Simulate file validation (you can add more logic later)
  const file_valid = !!file_b64; // Set to true if file exists
  const file_mime_type = file_valid ? 'application/pdf' : '';
  const file_size_kb = file_valid ? 1800 : 0;  // Placeholder file size

  // Send back the response
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",  // Change to your own user ID format later
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid,
    file_mime_type,
    file_size_kb
  });
});

// GET request handler at route /bfhl
app.get('/bajaj', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
