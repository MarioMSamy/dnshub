const DNS = require('./dns/DNS');
const dns = new DNS();
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log('++++++++++++++++++++++++');
  console.log(rinfo);
  dns.parse(msg);
  console.log('SEND');
  let client = dgram.createSocket('udp4');
  client.send(msg, 53, '198.41.0.4', (err) => {});
  client.on('message', function(response) {
    dns.parse(response);
    client.close();
  });
  console.log('------------------------');
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(9556);
