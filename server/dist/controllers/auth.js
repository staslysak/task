"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupController = exports.loginController = void 0;

var _utils = require("../utils");

var _user = require("../models/user");

const loginController = async (req, res) => {
  const {
    password,
    username
  } = req.body;

  try {
    const user = await _user.User.findOne({
      username
    }).populate('jobs');

    if (!user) {
      throw new Error("User doesn't exists");
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      throw new Error("Credantials doesn't match");
    }

    const tokens = (0, _utils.createTokens)(user._id);
    res.status(200).json({
      user,
      ...tokens
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.loginController = loginController;

const signupController = async (req, res) => {
  const {
    password,
    username
  } = req.body;

  try {
    const existingUser = await _user.User.findOne({
      username
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = new _user.User({
      username,
      password
    });
    await newUser.save();
    const tokens = (0, _utils.createTokens)(newUser._id);
    res.status(200).json({
      user: newUser,
      ...tokens
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

exports.signupController = signupController;