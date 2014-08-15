/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect     = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect  = require('../../app/lib/mongodb'),
    cp         = require('child_process'),
    db         = 'derby-test';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler();
      expect(g).to.be.instanceof(Gambler);
    });
  });
  describe('.all', function(){
    it('should get all Gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should return a single gambler', function(done){
      Gambler.findById('000000000000000000000001', function(g){
        expect(g).to.be.instanceof(Gambler);
        expect(g.name).to.equal('Bob');
        done();
      });
    });
  });
  describe('#removeAsset', function(){
    it('should remove an asset and add value to cash', function(done){
      Gambler.findById('000000000000000000000001', function(g){
        console.log(g);
        g.sellAsset('ring');
        expect(g.assets).to.have.length(1);
        expect(g.cash).to.be.closeTo(1500,1);
        console.log(g);
        done();
      });
    });
  });
  describe('addAsset', function(){
    it('should add an asset', function(done){
      Gambler.findById('000000000000000000000001', function(g){
        g.addAsset({name:'name', photo:'photo', value:500});
        expect(g.assets).to.have.length(3);
        expect(g.assets[2].name).to.equal('name');
        done();
      });
    });
  });
});

