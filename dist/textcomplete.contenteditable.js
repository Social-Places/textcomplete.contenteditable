/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _strategy = __webpack_require__(2);

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Encapsulate an result of each search results.
 */
var SearchResult = function () {

  /**
   * @param {object} data - An element of array callbacked by search function.
   */
  function SearchResult(data, term, strategy) {
    _classCallCheck(this, SearchResult);

    this.data = data;
    this.term = term;
    this.strategy = strategy;
  }

  _createClass(SearchResult, [{
    key: "replace",
    value: function replace(beforeCursor, afterCursor) {
      var replacement = this.strategy.replace(this.data);
      if (replacement !== null) {
        if (Array.isArray(replacement)) {
          afterCursor = replacement[1] + afterCursor;
          replacement = replacement[0];
        }
        var match = this.strategy.matchText(beforeCursor);
        if (match) {
          replacement = replacement.replace(/\$&/g, match[0]).replace(/\$(\d)/g, function (_, p1) {
            return match[parseInt(p1, 10)];
          });
          return [[beforeCursor.slice(0, match.index), replacement, beforeCursor.slice(match.index + match[0].length)].join(""), afterCursor];
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.strategy.template(this.data, this.term);
    }
  }]);

  return SearchResult;
}();

exports.default = SearchResult;
//# sourceMappingURL=search_result.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateElementOffset = calculateElementOffset;
exports.getLineHeightPx = getLineHeightPx;


/**
 * Create a custom event
 *
 * @private
 */
var createCustomEvent = exports.createCustomEvent = function () {
  if (typeof window.CustomEvent === "function") {
    return function (type, options) {
      return new document.defaultView.CustomEvent(type, {
        cancelable: options && options.cancelable || false,
        detail: options && options.detail || undefined
      });
    };
  } else {
    // Custom event polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
    return function (type, options) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type,
      /* bubbles */false, options && options.cancelable || false, options && options.detail || undefined);
      return event;
    };
  }
}();

/**
 * Get the current coordinates of the `el` relative to the document.
 *
 * @private
 */
function calculateElementOffset(el) {
  var rect = el.getBoundingClientRect();
  var _el$ownerDocument = el.ownerDocument,
      defaultView = _el$ownerDocument.defaultView,
      documentElement = _el$ownerDocument.documentElement;

  var offset = {
    top: rect.top + defaultView.pageYOffset,
    left: rect.left + defaultView.pageXOffset
  };
  if (documentElement) {
    offset.top -= documentElement.clientTop;
    offset.left -= documentElement.clientLeft;
  }
  return offset;
}

var CHAR_CODE_ZERO = "0".charCodeAt(0);
var CHAR_CODE_NINE = "9".charCodeAt(0);

function isDigit(charCode) {
  return charCode >= CHAR_CODE_ZERO && charCode <= CHAR_CODE_NINE;
}

/**
 * Returns the line-height of the given node in pixels.
 *
 * @private
 */
function getLineHeightPx(node) {
  var computedStyle = window.getComputedStyle(node);

  // If the char code starts with a digit, it is either a value in pixels,
  // or unitless, as per:
  // https://drafts.csswg.org/css2/visudet.html#propdef-line-height
  // https://drafts.csswg.org/css2/cascade.html#computed-value
  if (isDigit(computedStyle.lineHeight.charCodeAt(0))) {
    // In real browsers the value is *always* in pixels, even for unit-less
    // line-heights. However, we still check as per the spec.
    if (isDigit(computedStyle.lineHeight.charCodeAt(computedStyle.lineHeight.length - 1))) {
      return parseFloat(computedStyle.lineHeight) * parseFloat(computedStyle.fontSize);
    } else {
      return parseFloat(computedStyle.lineHeight);
    }
  }

  // Otherwise, the value is "normal".
  // If the line-height is "normal", calculate by font-size
  var body = document.body;
  if (!body) {
    return 0;
  }
  var tempNode = document.createElement(node.nodeName);
  tempNode.innerHTML = "&nbsp;";
  tempNode.style.fontSize = computedStyle.fontSize;
  tempNode.style.fontFamily = computedStyle.fontFamily;
  body.appendChild(tempNode);
  // Assume the height of the element is the line-height
  var height = tempNode.offsetHeight;
  body.removeChild(tempNode);
  return height;
}
//# sourceMappingURL=utils.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _query = __webpack_require__(8);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_INDEX = 2;

function DEFAULT_TEMPLATE(value) {
  return value;
}

/**
 * Properties for a strategy.
 *
 * @typedef
 */

/**
 * Encapsulate a single strategy.
 */
var Strategy = function () {
  function Strategy(props) {
    _classCallCheck(this, Strategy);

    this.props = props;
    this.cache = props.cache ? {} : null;
  }

  /**
   * @return {this}
   */


  _createClass(Strategy, [{
    key: "destroy",
    value: function destroy() {
      this.cache = null;
      return this;
    }

    /**
     * Build a Query object by the given string if this matches to the string.
     *
     * @param {string} text - Head to input cursor.
     */

  }, {
    key: "buildQuery",
    value: function buildQuery(text) {
      if (typeof this.props.context === "function") {
        var _context = this.props.context(text);
        if (typeof _context === "string") {
          text = _context;
        } else if (!_context) {
          return null;
        }
      }
      var match = this.matchText(text);
      return match ? new _query2.default(this, match[this.index], match) : null;
    }
  }, {
    key: "search",
    value: function search(term, callback, match) {
      if (this.cache) {
        this.searchWithCache(term, callback, match);
      } else {
        this.props.search(term, callback, match);
      }
    }

    /**
     * @param {object} data - An element of array callbacked by search function.
     */

  }, {
    key: "replace",
    value: function replace(data) {
      return this.props.replace(data);
    }

    /** @private */

  }, {
    key: "searchWithCache",
    value: function searchWithCache(term, callback, match) {
      var _this = this;

      if (this.cache && this.cache[term]) {
        callback(this.cache[term]);
      } else {
        this.props.search(term, function (results) {
          if (_this.cache) {
            _this.cache[term] = results;
          }
          callback(results);
        }, match);
      }
    }

    /** @private */

  }, {
    key: "matchText",
    value: function matchText(text) {
      if (typeof this.match === "function") {
        return this.match(text);
      } else {
        return text.match(this.match);
      }
    }

    /** @private */

  }, {
    key: "match",
    get: function get() {
      return this.props.match;
    }

    /** @private */

  }, {
    key: "index",
    get: function get() {
      return typeof this.props.index === "number" ? this.props.index : DEFAULT_INDEX;
    }
  }, {
    key: "template",
    get: function get() {
      return this.props.template || DEFAULT_TEMPLATE;
    }
  }]);

  return Strategy;
}();

exports.default = Strategy;
//# sourceMappingURL=strategy.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _textcomplete = __webpack_require__(5);

var _textcomplete2 = _interopRequireDefault(_textcomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Textcomplete || (global.Textcomplete = {});
global.Textcomplete.editors || (global.Textcomplete.editors = {});
global.Textcomplete.editors.ContentEditable = _textcomplete2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _editor = __webpack_require__(6);

var _editor2 = _interopRequireDefault(_editor);

var _search_result = __webpack_require__(0);

var _search_result2 = _interopRequireDefault(_search_result);

var _utils = __webpack_require__(1);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(7);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _utils = __webpack_require__(1);

var _search_result = __webpack_require__(0);

var _search_result2 = _interopRequireDefault(_search_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/*eslint no-unused-vars: off*/

/**
 * Abstract class representing a editor target.
 *
 * Editor classes must implement `#applySearchResult`, `#getCursorOffset` and
 * `#getBeforeCursor` methods.
 *
 * Editor classes must invoke `#emitMoveEvent`, `#emitEnterEvent`,
 * `#emitChangeEvent` and `#emitEscEvent` at proper timing.
 *
 * @abstract
 */


/** @typedef */
var Editor = function (_EventEmitter) {
  _inherits(Editor, _EventEmitter);

  function Editor() {
    _classCallCheck(this, Editor);

    return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
  }

  _createClass(Editor, [{
    key: "destroy",

    /**
     * It is called when associated textcomplete object is destroyed.
     *
     * @return {this}
     */
    value: function destroy() {
      return this;
    }

    /**
     * It is called when a search result is selected by a user.
     */

  }, {
    key: "applySearchResult",
    value: function applySearchResult(_) {
      throw new Error("Not implemented.");
    }

    /**
     * The input cursor's absolute coordinates from the window's left
     * top corner.
     */

  }, {
    key: "getCursorOffset",
    value: function getCursorOffset() {
      throw new Error("Not implemented.");
    }

    /**
     * Editor string value from head to cursor.
     * Returns null if selection type is range not cursor.
     */

  }, {
    key: "getBeforeCursor",
    value: function getBeforeCursor() {
      throw new Error("Not implemented.");
    }

    /**
     * Emit a move event, which moves active dropdown element.
     * Child class must call this method at proper timing with proper parameter.
     *
     * @see {@link Textarea} for live example.
     */

  }, {
    key: "emitMoveEvent",
    value: function emitMoveEvent(code) {
      var moveEvent = (0, _utils.createCustomEvent)("move", {
        cancelable: true,
        detail: {
          code: code
        }
      });
      this.emit("move", moveEvent);
      return moveEvent;
    }

    /**
     * Emit a enter event, which selects current search result.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */

  }, {
    key: "emitEnterEvent",
    value: function emitEnterEvent() {
      var enterEvent = (0, _utils.createCustomEvent)("enter", { cancelable: true });
      this.emit("enter", enterEvent);
      return enterEvent;
    }

    /**
     * Emit a change event, which triggers auto completion.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */

  }, {
    key: "emitChangeEvent",
    value: function emitChangeEvent() {
      var changeEvent = (0, _utils.createCustomEvent)("change", {
        detail: {
          beforeCursor: this.getBeforeCursor()
        }
      });
      this.emit("change", changeEvent);
      return changeEvent;
    }

    /**
     * Emit a esc event, which hides dropdown element.
     * Child class must call this method at proper timing.
     *
     * @see {@link Textarea} for live example.
     */

  }, {
    key: "emitEscEvent",
    value: function emitEscEvent() {
      var escEvent = (0, _utils.createCustomEvent)("esc", { cancelable: true });
      this.emit("esc", escEvent);
      return escEvent;
    }

    /**
     * Helper method for parsing KeyboardEvent.
     *
     * @see {@link Textarea} for live example.
     */

  }, {
    key: "getCode",
    value: function getCode(e) {
      return e.keyCode === 9 ? "ENTER" // tab
      : e.keyCode === 13 ? "ENTER" // enter
      : e.keyCode === 27 ? "ESC" // esc
      : e.keyCode === 38 ? "UP" // up
      : e.keyCode === 40 ? "DOWN" // down
      : e.keyCode === 78 && e.ctrlKey ? "DOWN" // ctrl-n
      : e.keyCode === 80 && e.ctrlKey ? "UP" // ctrl-p
      : "OTHER";
    }
  }]);

  return Editor;
}(_eventemitter2.default);

exports.default = Editor;
//# sourceMappingURL=editor.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _search_result = __webpack_require__(0);

var _search_result2 = _interopRequireDefault(_search_result);

var _strategy = __webpack_require__(2);

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Encapsulate matching condition between a Strategy and current editor's value.
 */
var Query = function () {
  function Query(strategy, term, match) {
    _classCallCheck(this, Query);

    this.strategy = strategy;
    this.term = term;
    this.match = match;
  }

  /**
   * Invoke search strategy and callback the given function.
   */


  _createClass(Query, [{
    key: "execute",
    value: function execute(callback) {
      var _this = this;

      this.strategy.search(this.term, function (results) {
        callback(results.map(function (result) {
          return new _search_result2.default(result, _this.term, _this.strategy);
        }));
      }, this.match);
    }
  }]);

  return Query;
}();

exports.default = Query;
//# sourceMappingURL=query.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=textcomplete.contenteditable.js.map