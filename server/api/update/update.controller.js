'use strict';

var _ = require('lodash');
var Update = require('./update.model');
var Deal = require('../deal/deal.model');

// Get list of updates
exports.index = function(req, res) {
  Update.find(function (err, updates) {
    if(err) { return handleError(res, err); }
    return res.json(200, updates);
  });
};

// Get a single update
exports.show = function (req, res) {
  Update.findById(req.params.id, function (err, update) {
    if(err) { return handleError(res, err); }
    if(!update) { return res.send(404); }
    return res.json(update);
  });
};

// Creates a new update in the DB.
exports.create = function (req, res) {
  console.log(req.body);
  req.body.createdBy = req.user._id;
  req.body.lastEditedBy = req.user._id;
  req.body.createdOn = Date.now();
  req.body.updatedOn = Date.now();
  // need to check for the permissions here
  // check if the current logged in user is assigned to tha deal or not. 
/*  Update.create(req.body, function (err, update) {
    if(err) { return handleError(res, err); }
    Deal.findById(req.body.deal, function (err, deal) {
      if(err) { return handleError(res, err); }
      deal.updates.push(update.id);
      deal.save(function (err) {
        if(err)  { return handleError(res, err); }
      })
    })
    return res.json(201, update);
  });*/
  Deal.findById(req.body.deal,function(err,deal){
    if(err){return handleError(res,err);}
    if(deal.assignees.indexOf(req.user._id)!=-1 || req.user.role=='core')
    {
      Update.create(req.body,function(err,update){
        if(err){return handleError(res,err);}
        deal.updates.push(update._id);
        deal.save(function(err,dealfin){
         if(err){ return handleError(res,err);}
         return res.json(201,dealfin);
        })   
      })
    }
    else
      return res.sendStatus(403);
  })
};

// Updates an existing update in the DB.
exports.update = function (req, res) {
  req.body.updatedOn=Date.now();
  req.body.lastEditedBy = req.user._id;
  if(req.body._id) { delete req.body._id; }
  Update.findById(req.params.id, function (err, update) {
    if (err) { return handleError(res, err); }
    if(!update) { return res.send(404); }
    var updated = _.merge(update, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, update);
    });
  });
};

// Deletes a update from the DB.
exports.destroy = function(req, res) {
  Update.findById(req.params.id, function (err, update) {
    if(err) { return handleError(res, err); }
    if(!update) { return res.send(404); }
    update.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}