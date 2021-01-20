"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Job = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const Job = _mongoose.default.model('Job', _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  }
}));

exports.Job = Job;