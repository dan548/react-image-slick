"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("../../src/index"));

var _bg = _interopRequireDefault(require("./bg.jpg"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render(_react.default.createElement(_index.default, {
  height: 500,
  image: _bg.default,
  width: 1920,
  basis: [200, 500, 300]
}), document.getElementById('root'));