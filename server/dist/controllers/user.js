"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserJobController = exports.updateUserJobController = exports.createUserJobController = exports.getSelfController = void 0;

var _models = require("../models");

const getSelfController = async (req, res) => {
  try {
    const user = await _models.User.findOne({
      _id: req.userId
    }).populate('jobs');
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.getSelfController = getSelfController;

const createUserJobController = async (req, res) => {
  const {
    name
  } = req.body;

  try {
    const job = new _models.Job({
      name
    });
    await job.save();
    await _models.User.findOneAndUpdate({
      _id: req.userId
    }, {
      $push: {
        jobs: job._id
      }
    }, {
      new: true
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.createUserJobController = createUserJobController;

const updateUserJobController = async (req, res) => {
  try {
    const job = await _models.Job.findOneAndUpdate({
      _id: req.body._id
    }, {
      name: req.body.name
    }, {
      new: true
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.updateUserJobController = updateUserJobController;

const deleteUserJobController = async (req, res) => {
  const {
    jobId
  } = req.params;

  try {
    await _models.User.findOneAndUpdate({
      _id: req.userId
    }, {
      $pull: {
        jobs: jobId
      }
    }, {
      new: true
    });
    res.status(200).send(jobId);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.deleteUserJobController = deleteUserJobController;