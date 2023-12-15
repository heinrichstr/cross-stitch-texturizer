var express = require('express');
var router = express.Router();
var path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, '../../', 'client', 'public')));

/* GET home page. */
app.get('*', (req, res) => {
  try {
    // Your route logic here
    res.sendFile(path.join(__dirname, '../../', 'client', 'public', 'index.html'));

    // Send a success response if no error occurs
    res.status(200).send('Success');
  } catch (error) {
    // Catch the error and send an error response
    res.status(500).send({
      error: {
        message: error.message,
      },
    });
  }
});

module.exports = router;
