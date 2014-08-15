'use strict';

var Gambler = require('../models/gambler');


exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(g){
    g.sellAsset(req.params.asset);
    Gambler.collection.save(g, function(){
      res.send({id:req.params.id, asset:req.params.asset, newCash:g.cash, isDivorced:!!!g.assets.length});
    });
  });
};

exports.newAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/newAsset', {gambler:gambler});
  });
};

exports.addAsset = function(req, res){
  Gambler.findById(req.body.id, function(g){
    g.addAsset({name:req.body.name, photo:req.body.photo, value:req.body.value});
    Gambler.collection.save(g, function(){
      Gambler.all(function(err, gamblers){
        res.render('gamblers/index', {gamblers:gamblers});
      });
    });
  });
};

//emove asset

