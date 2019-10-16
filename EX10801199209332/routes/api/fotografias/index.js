var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');

var galeria=fileModel.getFoto();


router.get('/all', function(req, res){
  galeria = fileModel.getFoto();
  res.json(galeria);
});

module.exports=router;
