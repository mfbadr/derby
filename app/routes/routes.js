'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    gamblers       = require('../controllers/gamblers'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/gamblers', gamblers.index);
  app.get('/gamblers/:id/assets/new', gamblers.newAsset);
  app.post('/gamblers/:id/assets', gamblers.addAsset);
  app.delete('/gamblers/:id/assets/:asset', gamblers.sellAsset);
  console.log('Routes Loaded');
  app.get('/gamblers/new', gamblers.newGambler);
  app.post('/gamblers', gamblers.addGambler);
};

