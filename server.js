const express = require("express");
require('dotenv').config();

console.log(process.env)
console.log("hello")

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});