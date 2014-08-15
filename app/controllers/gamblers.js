'use strict';

var Gambler = require('../models/gambler');


exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(g){
    g.sellAsset(req.query.asset);
    Gambler.collection.save(g, function(){
      res.send({id:req.params.id, asset:req.query.asset, newCash:g.cash});
    });
  });
};
//remove asset

