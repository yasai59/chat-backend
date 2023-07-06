require("dotenv").config();
require("./server/config/configureEnv").configurar();

const Server = require("./server/models/Server");

const server = new Server();

server.listen();
