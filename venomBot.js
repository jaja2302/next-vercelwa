// venomBot.js
const venom = require('venom-bot');

let clientInstance; // Variable to store the Venom client instance

function startVenom() {
  return venom
    .create({
      session: 'session-name', // name of session
    })
    .then((client) => {
      clientInstance = client;
      start(client);
    })
    .catch((error) => {
      console.log(error);
    });
}

function start(client) {
  client.onMessage((message) => {
   
  });
}
function sendMessage(number, message) {
  if (clientInstance) {
    const formattedNumber = `${number}@c.us`;
    return clientInstance
      .sendText(formattedNumber, message)
      .catch((error) => {
        console.error('Error sending message:', error);
        return Promise.reject(error);
      });
  } else {
    return Promise.reject('Venom client not initialized');
  }
}


module.exports = { startVenom, sendMessage };
