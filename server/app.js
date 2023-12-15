var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../', 'client', 'public')));

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});