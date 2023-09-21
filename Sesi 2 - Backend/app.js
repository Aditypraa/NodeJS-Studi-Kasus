const path = require("path");
const express = require("express");

app = express();
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const productRouter = require("./routes/productRouter");

// app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/index", indexRouter);
app.use("/product", productRouter);

module.exports = app;
