const initServer = require("./config/server");

const port = process.env.PORT || 1234;
initServer(port);
