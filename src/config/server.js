const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const APIRouter = require("../routes/router");

const keepAlive = require("../utils/keepAlive");

const initServer = (port) => {
  const app = express();

  app.use(morgan("dev"));

  app.use(cors());

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.redirect(301, "/api/v1");
  });

  app.use("/api/v1", APIRouter);

  keepAlive.wake();

  app.listen(port, () => {
    console.log("Inició el servidor correctamente.");
  });
};

module.exports = initServer;
