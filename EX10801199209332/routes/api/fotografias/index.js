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


router.put('/update/:id',
  function(req, res){
      galeria = fileModel.getFoto();
      var picIdToModify = req.params.id;
      var cambiarTitulo = req.body.nuevoTitulo;
      var cambiarUrl = req.body.nuevoUrl;
      var cambiarThumb=req.body.nuevoThumb;
      var modFoto = {};
      var newFotoArray = galeria.map(
        function(o,i){
          if( picIdToModify === o.id){

             modFoto = Object.assign({}, o);
          }
          return o;
        }
      ); // end map
    galeria = newFotoArray;
    fileModel.setFoto(
    galeria,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modFoto);  // req.body ===  $_POST[]
        }
      }
    );
  }
);

module.exports=router;
