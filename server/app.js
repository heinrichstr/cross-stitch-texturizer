var createError = require('http-errors');
var express = require('express');
var path = require('path');
const multer  = require('multer')
const upload = multer()
const {textureImg} = require('./app/index.js')

var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../', 'client', 'public')));

app.post('/api/create_texture', upload.single('image'), (req, res) => {
  //console.log('Received POST request with file:', req.file);
  //console.log('Received POST request with body:', req.body);
  res.json({ message: 'POST request received' });


  const data = textureImg([100,80], 20, req.body.color, req.file).then(data => {  //inputGridSize, inputBorderSize, inputBackgroundColor, inputFile
    console.log('data: ', data)
  })  

});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});