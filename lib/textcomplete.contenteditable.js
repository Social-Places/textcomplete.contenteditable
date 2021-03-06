"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _editor = require("textcomplete/lib/editor");

var _editor2 = _interopRequireDefault(_editor);

var _search_result = require("textcomplete/lib/search_result");

var _search_result2 = _interopRequireDefault(_search_result);

var _utils = require("textcomplete/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CALLBACK_METHODS = ["onInput", "onKeydown"];

var _class = function (_Editor) {
  _inherits(_class, _Editor);

  function _class(el) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    _this.el = el;
    _this.document = el.ownerDocument;
    _this.view = _this.document.defaultView;
    _this.selection = _this.view.getSelection();

    CALLBACK_METHODS.forEach(function (method) {
      ;_this[method] = _this[method].bind(_this);
    });

    _this.startListening();
    return _this;
  }

  _createClass(_class, [{
    key: "destroy",
    value: function destroy() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
      this.stopListening();this.el = null;
      return this;
    }
  }, {
    key: "applySearchResult",
    value: function applySearchResult(searchResult) {
      var before = this.getBeforeCursor();
      var after = this.getAfterCursor();
      if (before != null && after != null) {
        var replace = searchResult.replace(before, after);
        if (Array.isArray(replace)) {
          var range = this.getRange();
          range.selectNode(range.startContainer);
          range.deleteContents();
          this.document.execCommand("insertHTML", false, replace[0] + replace[1]);
          range.detach();
          var newRange = this.getRange();
          newRange.setStart(newRange.startContainer, newRange.startContainer.length);
          newRange.collapse(true);
        }
      }
    }
  }, {
    key: "getCursorOffset",
    value: function getCursorOffset() {
      var range = this.getRange();
      var rangeRects = range.getBoundingClientRect();
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        rangeRects = range.getClientRects()[0];
      }

      var docRects = this.document.body.getBoundingClientRect();
      var container = range.startContainer;
      var el = container instanceof Text ? container.parentElement : container;

      var left = rangeRects.left - docRects.left;
      var lineHeight = (0, _utils.getLineHeightPx)(el);
      var top = rangeRects.top - docRects.top + lineHeight;
      return this.el.dir !== "rtl" ? { left: left, lineHeight: lineHeight, top: top } : { right: document.documentElement.clientWidth - left, lineHeight: lineHeight, top: top };
    }
  }, {
    key: "getBeforeCursor",
    value: function getBeforeCursor() {
      var range = this.getRange();
      if (range.collapsed && range.startContainer instanceof Text) {
        return range.startContainer.wholeText.substring(0, range.startOffset);
      }
      return null;
    }
  }, {
    key: "getAfterCursor",
    value: function getAfterCursor() {
      var range = this.getRange();
      if (range.collapsed && range.startContainer instanceof Text) {
        return range.startContainer.wholeText.substring(range.startOffset);
      }
      return null;
    }

    /** @private */

  }, {
    key: "onInput",
    value: function onInput(_) {
      // if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      // Safari behaves much stranger than Chrome and Firefox.
      // return
      // }
      this.emitChangeEvent();
    }

    /** @private */

  }, {
    key: "onKeydown",
    value: function onKeydown(e) {
      var code = this.getCode(e);
      var event = void 0;
      if (code === "UP" || code === "DOWN") {
        event = this.emitMoveEvent(code);
      } else if (code === "ENTER") {
        event = this.emitEnterEvent();
      } else if (code === "ESC") {
        event = this.emitEscEvent();
      }
      if (event && event.defaultPrevented) {
        e.preventDefault();
      }
    }

    /** @private */

  }, {
    key: "startListening",
    value: function startListening() {
      this.el.addEventListener("input", this.onInput);
      this.el.addEventListener("keydown", this.onKeydown);
    }

    /** @private */

  }, {
    key: "stopListening",
    value: function stopListening() {
      this.el.removeEventListener("input", this.onInput);
      this.el.removeEventListener("keydown", this.onKeydown);
    }

    /** @private */

  }, {
    key: "getRange",
    value: function getRange(force) {
      for (var i = 0, l = this.selection.rangeCount; i < l; i++) {
        var _range = this.selection.getRangeAt(i);
        if (this.el.contains(_range.startContainer)) {
          return _range;
        }
      }
      // The element is not active.
      if (force) {
        throw new Error("Unexpected");
      }
      var activeElement = this.document.activeElement;
      this.el.focus();
      var range = this.getRange(true);
      activeElement && activeElement.focus();
      return range;
    }
  }]);

  return _class;
}(_editor2.default);

exports.default = _class;
//# sourceMappingURL=textcomplete.contenteditable.js.map