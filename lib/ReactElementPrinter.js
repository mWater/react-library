"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var $, ReactDOM, ReactElementPrinter, _;

_ = require('lodash');
$ = require('jquery');
ReactDOM = require('react-dom'); // Prints a React element. Requires font-awesome for spinner and jquery

module.exports = ReactElementPrinter =
/*#__PURE__*/
function () {
  function ReactElementPrinter() {
    (0, _classCallCheck2["default"])(this, ReactElementPrinter);
  }

  (0, _createClass2["default"])(ReactElementPrinter, [{
    key: "print",
    // Options include:
    // delay: ms to wait before printing to allow elements to render
    value: function print(element, options) {
      var extraCss; // Add special CSS printing rules

      extraCss = $('<style id="react_element_printer_css">\n  @media print {\n    /* Hide body and get rid of margins */\n    body {\n      visibility: hidden;\n      margin: 0;\n      padding: 0;\n      opacity: 100%\n    }\n\n    /* Hide all children of body */\n    body > * {\n      display: none;\n    }\n\n    /* Setup special region */\n    #react_element_printer {\n      display: block !important;\n      visibility: visible;\n    }\n  }\n\n  /* Don\'t show when not printing */\n  #react_element_printer {\n    /* Removed because causes c3 titles to be hidden for mysterious reasons\n    display: none;\n    */\n  }\n\n  /* Default to letter sized pages */\n  @page  {\n    size: 8.5in 11in; \n    margin: 0.5in 0.5in 0.5in 0.5in; \n  }\n\n  #react_element_printer_splash {\n    display: flex; \n    align-items: center;\n    justify-content: center;    \n    position: fixed; \n    left: 0;\n    top: 0;\n    z-index: 9999;\n    width: 100%;\n    height: 100%;\n    overflow: visible;    \n    background-color: rgba(255,255,255,0.7);\n  }\n\n  @media print {\n    #react_element_printer_splash {\n      display: none;\n    }\n  }\n\n</style>');
      $("body").append(extraCss); // Add special region to body

      $("body").append('<div id="react_element_printer"></div>'); // Add warning that printing

      $("body").append('<div id="react_element_printer_splash">\n  <div style="font-size: 30pt;">\n    <i class="fa fa-spinner fa-spin"></i>\n    Preparing to print...\n  </div>\n</div>'); // Render element into special region

      return ReactDOM.render(element, $("#react_element_printer").get(0), function () {
        // Wait for element to render
        return _.delay(function () {
          // Call print
          window.print(); // Unmount component

          ReactDOM.unmountComponentAtNode($("#react_element_printer").get(0)); // Remove rest of nodes

          $("#react_element_printer").remove();
          $("#react_element_printer_css").remove();
          return $("#react_element_printer_splash").remove();
        }, options.delay || 1000);
      });
    }
  }]);
  return ReactElementPrinter;
}();