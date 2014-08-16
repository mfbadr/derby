'use strict';

var Gambler = require('../models/gambler');


exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(g){ //find gambler by id
    g.sellAsset(req.params.asset); //sell asset
    Gambler.collection.save(g, function(){ //update gambler
      res.send({id:req.params.id, asset:req.params.asset, newCash:g.cash, isDivorced:!!!g.assets.length}); //isDivorced is true if length = 0
    });
  });
};

exports.newAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/newAsset', {gambler:gambler});
  });
};

exports.addAsset = function(req, res){
  Gambler.findById(req.params.id, function(g){
    g.addAsset(req.body);
    Gambler.collection.save(g, function(){
      res.redirect('/gamblers');
    });
  });
};

exports.newGambler = function(req, res){
  res.render('gamblers/newGambler');
};

exports.addGambler = function(req,res){
  var g = new Gambler(req.body);
  Gambler.collection.save(g, function(){
    Gambler.all(function(err, gamblers){
      res.render('gamblers/index', {gamblers:gamblers});
    });
  });
};

//emove asset

