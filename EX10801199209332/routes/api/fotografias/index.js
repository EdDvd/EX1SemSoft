var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');

var galeria=fileModel.getFoto();


router.get('/all', function(req, res){
  galeria = fileModel.getFoto();
  res.json(galeria);
});// fin del get



router.post('/new', function(req, res){
   galeria = fileModel.getFoto();
   var newFoto = Object.assign(
      {},
      req.body,
      {
          "titulo": req.body.titulo,
          "url": req.body.url,
          "thumb":req.body.thumb
      }
   );
   var fotoExists = galeria.find(
     function(o, i){
       return o.id === newFoto.id;
     }
   )
   if( ! fotoExists ){
     galeria.push(newFoto);
     fileModel.setFoto(
        galeria,
        function(err, savedSuccesfully){
          if(err){
            res.status(400).json({ "error": "No se pudo ingresar objeto" });
          } else {
            res.json(newFoto);  // req.body ===  $_POST[]
          }
        }
      );
   } else {
     res.status(400).json({"error":"No se pudo ingresar objeto"});
   }
});// fin del post

module.exports=router;
