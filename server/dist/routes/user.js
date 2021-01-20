"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../utils");

var _controllers = require("../controllers");

const router = (0, _express.Router)();
router.get('/user', _utils.jwtMiddleware, _controllers.getSelfController);
router.post('/user/job', _utils.jwtMiddleware, _controllers.createUserJobController);
router.put('/user/job', _utils.jwtMiddleware, _controllers.updateUserJobController);
router.delete('/user/job/:jobId', _utils.jwtMiddleware, _controllers.deleteUserJobController);
var _default = router;
exports.default = _default;