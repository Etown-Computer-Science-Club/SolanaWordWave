var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (_req, res) {
  res.send('API is healthy');
});

module.exports = router;
