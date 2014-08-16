'use strict';

var _   = require('lodash'),
  Mongo = require('mongodb');

function Gambler(o){
  this.name = o.name;
  this.cash = parseFloat(o.cash);
  this.spouse= {name:o.spouse.name, photo:o.spouse.photo};
  this.assets = [];
  this.photo = o.photo;
  this.results = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

module.exports = Gambler;

//find by id
Gambler.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:id}, function(err, obj){
    obj = reProto(obj);
    cb(obj);
  });
};
//remove asset

Gambler.prototype.sellAsset = function(name){
  var asset = _.remove(this.assets, function(a){
    return a.name === name;
  });
  this.cash += asset[0].value;
};

Gambler.prototype.addAsset = function(o){
  //console.log(this.assets);
  this.assets.push({name:o.name, photo:o.photo, value:o.value * 1});
};

//helpers

function reProto(gambler){
  return _.create(Gambler.prototype, gambler);
}
