'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleEventer = require('simple-eventer');

var _simpleEventer2 = _interopRequireDefault(_simpleEventer);

var _viewport = require('viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  segments: [{
    name: 'mobile',
    min: 0,
    max: 750,
    base: {
      width: 750,
      fontSize: 10
    },
    factor: 0.6
  }, {
    name: 'desktop',
    min: 751,
    max: Number.MAX_SAFE_INTEGER,
    base: {
      width: 1920,
      fontSize: 10
    },
    factor: 0.5
  }]
};

var Scaler = function (_SimpleEventer) {
  _inherits(Scaler, _SimpleEventer);

  function Scaler(options) {
    _classCallCheck(this, Scaler);

    var _this = _possibleConstructorReturn(this, (Scaler.__proto__ || Object.getPrototypeOf(Scaler)).call(this));

    if (Scaler.singletonInstance) {
      var _ret;

      return _ret = Scaler.singletonInstance, _possibleConstructorReturn(_this, _ret);
    }

    Scaler.singletonInstance = _this;

    _this.settings = Object.assign({}, defaults, options);

    _this.viewport = null;
    _this.segment = null;
    _this.fontSize = null;

    _this.init();
    return _this;
  }

  _createClass(Scaler, [{
    key: 'init',
    value: function init() {
      window.addEventListener('resize', this.rescale.bind(this));
      this.rescale();
    }
  }, {
    key: 'rescale',
    value: function rescale() {
      this.updateViewport();
      this.updateSegment();
      this.updateFontSize();
      this.fire('changed');
    }
  }, {
    key: 'updateViewport',
    value: function updateViewport() {
      this.viewport = (0, _viewport2.default)();
    }
  }, {
    key: 'updateSegment',
    value: function updateSegment() {
      for (var i = 0, sLen = this.settings.segments.length; i < sLen; i++) {
        var segment = this.settings.segments[i];

        if (this.viewport.width <= segment.max && this.viewport.width >= segment.min) {
          if (this.segment !== segment) {
            this.segment = segment;
            this.fire('changed.segment');
          }
          return;
        }
      }

      this.segment = null;
    }
  }, {
    key: 'updateFontSize',
    value: function updateFontSize() {
      if (this.segment) {
        this.fontSize = (this.segment.base.fontSize * this.viewport.width / this.segment.base.width - this.segment.base.fontSize) * this.segment.factor + this.segment.base.fontSize;
        window.document.documentElement.style.fontSize = this.fontSize + 'px';
      } else {
        window.document.documentElement.style.fontSize = 'auto';
      }
    }
  }]);

  return Scaler;
}(_simpleEventer2.default);

exports.default = Scaler;