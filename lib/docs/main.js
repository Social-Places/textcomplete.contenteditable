'use strict';

var _textcomplete = require('../textcomplete.contenteditable');

var _textcomplete2 = _interopRequireDefault(_textcomplete);

var _textcomplete3 = require('textcomplete');

var _textcomplete4 = _interopRequireDefault(_textcomplete3);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Textcomplete = _textcomplete4.default;
global.Textcomplete.editors = { ContentEditable: _textcomplete2.default };

_highlight2.default.initHighlightingOnLoad();

(function () {
  var els = document.getElementsByClassName('auto-eval');
  for (var i = 0, l = els.length; i < l; i++) {
    var el = els[i];
    eval('(function () {' + (el.innerText || el.textContent) + '})()');
  }
})();
//# sourceMappingURL=main.js.map