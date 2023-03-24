const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { notFound, errorHandler } = require("./middlewares");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("dotenv").config();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

const animals = require("./routes/animals");

app.use("/api/animal", animals);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
