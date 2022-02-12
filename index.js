const ws = require('ws');
const axios = require('axios');

// https://www.npmjs.com/package/ws
function heartbeat() {
  const _1Hr = 3600000;
    
  clearTimeout(this.pingTimeout);

  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, _1Hr);
}

async function start() {
  // const base_url = 'http://localhost:3333';
  const base_url = 'https://testbackend.takeat.app';

  const { data } = await axios.post(`${base_url}/public/sessions/restaurants`, {
    email: '',
    password: '',
  }); 

  const token = data.token;

  const ws_url = 'wss://testbackend.takeat.app';

  const client = new ws(`${ws_url}/printers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  client.on('open', () => {
    let count = 0;
    const inter = setInterval(() => {
      // client.send('Hello');

      count += 1;

      if (count === 15) {
        clearInterval(inter);
      }
    }, 1000);
  });

  client.on('message', (message) => {
    console.log(message.toString());
  });

  client.on('ping', heartbeat);

  client.on('close', (err, b) => {
    console.log('closing', err, b);
  });

  client.on('error', (err, b) => {
    console.log('error', err, b);
  });
}

start();
