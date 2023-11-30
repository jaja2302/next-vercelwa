const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { startVenom, sendMessage } = require('./venomBot');

// Use bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

let venomReady = false; // Variable to track if Venom bot is ready

// Start the Venom bot
startVenom()
  .then(() => {
    venomReady = true; // Set venomReady to true once Venom bot is initialized
  })
  .catch((error) => {
    console.error('Error initializing Venom bot:', error);
  });

// Serve the form with loading status
app.get('/', (req, res) => {
  const loadingMessage = venomReady ? '' : 'Initializing Venom bot, please wait...';
  res.send(`
    <h1>WhatsApp Message Sender</h1>
    <p>${loadingMessage}</p>
    <form action="/send-message" method="post">
      <label for="number">Phone Number:</label>
      <input type="text" id="number" name="number" placeholder="6287777909185" required><br><br>
      <label for="message">Message:</label>
      <input type="text" id="message" name="message" required><br><br>
      <button type="submit" ${venomReady ? '' : 'disabled'}>Send Message</button>
    </form>
  `);
});

// Handle POST request to send message
app.post('/send-message', (req, res) => {
  const { number, message } = req.body;
  sendMessage(number, message)
    .then((result) => {
      res.send(`Message sent successfully! Result: ${result}`);
    })
    .catch((error) => {
      res.status(500).send(`Error sending message: ${error}`);
    });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

module.exports = app;
