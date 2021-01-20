"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

const router = (0, _express.Router)();
router.post('/login', _controllers.loginController);
router.post('/signup', _controllers.signupController);
var _default = router;
exports.default = _default;