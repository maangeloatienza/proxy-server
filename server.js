const http = require('http');
const PORT = process.env.PORT || 4000;
const app = require("./app");

const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`Server running in port ${PORT}`)
})
