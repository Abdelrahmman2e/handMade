const express = require("express");
require("dotenv").config({ path: "./config.env" });
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandling");
const categoryRouter = require("./routes/Category");
const subCategoryRouter = require("./routes/SubCategory");
const userRouter = require("./routes/User");
const productRouter = require("./routes/Product");
const reviewRouter = require("./routes/Review");
const AppError = require("./utils/AppError");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

//middlewares
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour..!!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10Kb" }));

// Data Sanitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

app.use(
  hpp({
    whitelist: [
      "quantity",
      "ratingsAverage",
      "ratingsQuantity",
      "weight",
      "price",
      "sold",
    ],
  })
);

//routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, nxt) => {
  nxt(
    new AppError(`can't find this route ${req.originalUrl} on this server`, 404)
  );
});

app.use(errorHandler);

module.exports = app;