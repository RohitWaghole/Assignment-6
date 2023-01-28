const express = require("express");
const Router = require("./router");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

app.listen(port, (request, response) => {
  console.log(`Server Running on Port ${port}`);
});
