const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


const usersRouter = require("./routes/users");
const cardRouter = require("./routes/card");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.get("env") !== "test" && app.use(logger(formatsLogger));
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  res.end(`<div>
  <ul><li> <a href='/api-docs'><h1>api-docs</h1></a></li></ul>
  </div>`);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "error",
      code: 429,
      message: "Too Many Requests",
    });
  },
});

app.use(limiter);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(boolParser());

app.use("/api/users", usersRouter);
app.use("/api/card", cardRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status === 500 ? "fail" : "error",
    code: status,
    message: err.message,
  });
});

module.exports = app;
