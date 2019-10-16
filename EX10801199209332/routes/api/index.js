var express = require('express');
var router = express.Router();


var fotosApiRoutes = require('./fotografias/index');


router.use('/pic', fotosApiRoutes);

module.exports = router;
