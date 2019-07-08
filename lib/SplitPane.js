"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Divider,
    Pane,
    PropTypes,
    R,
    React,
    ReactDOM,
    SplitPane,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types'); // SplitPane component
// Create a resizable split pane with a draggable divider
// React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 200}, [
//   R 'div', null
//   R 'div', null
// ]) 
// Vertical splitpane gets the classes "splitpane vertical"
// Horizontal splitpane divider gets the classes "splitpane horizontal"

React = require('react');
R = React.createElement;
Pane = require('./Pane');
Divider = require('./Divider');
ReactDOM = require('react-dom');

module.exports = SplitPane = function () {
  var SplitPane =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(SplitPane, _React$Component);

    function SplitPane(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, SplitPane);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SplitPane).call(this, props));
      _this.onMouseUp = _this.onMouseUp.bind((0, _assertThisInitialized2["default"])(_this));
      _this.onMouseDown = _this.onMouseDown.bind((0, _assertThisInitialized2["default"])(_this));
      _this.onMouseMove = _this.onMouseMove.bind((0, _assertThisInitialized2["default"])(_this));
      _this.state = {
        resizing: false,
        firstPaneSize: _this.props.firstPaneSize
      };
      return _this;
    }

    (0, _createClass2["default"])(SplitPane, [{
      key: "onMouseUp",
      value: function onMouseUp() {
        var base;
        boundMethodCheck(this, SplitPane);

        if (this.state.resizing) {
          this.setState({
            resizing: false
          });
          return typeof (base = this.props).onResize === "function" ? base.onResize(this.state.firstPaneSize) : void 0;
        }
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(event) {
        var dragStartAt;
        boundMethodCheck(this, SplitPane);
        dragStartAt = this.props.split === "vertical" ? event.clientX : event.clientY;
        return this.setState({
          resizing: true,
          dragStartAt: dragStartAt
        });
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(event) {
        var currentPosition, firstPaneSize, newSize;
        boundMethodCheck(this, SplitPane);

        if (this.state.resizing) {
          if (this.props.split === "vertical") {
            firstPaneSize = ReactDOM.findDOMNode(this.firstPane).offsetWidth;
            currentPosition = event.clientX;
          } else {
            firstPaneSize = ReactDOM.findDOMNode(this.firstPane).offsetHeight;
            currentPosition = event.clientY;
          }

          newSize = firstPaneSize - (this.state.dragStartAt - currentPosition);
          this.setState({
            dragStartAt: currentPosition
          });

          if (this.props.minFirstPaneSize < newSize) {
            return this.setState({
              firstPaneSize: newSize
            });
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var classNames, style;
        classNames = ["splitpane"];
        style = {
          display: "flex",
          flex: 1,
          height: "100%",
          position: "absolute"
        };

        if (this.props.split === "horizontal") {
          style.width = "100%";
          style.top = 0;
          style.bottom = 0;
          style.flexDirection = "column";
          classNames.push('horizontal');
        }

        if (this.props.split === "vertical") {
          style.right = 0;
          style.left = 0;
          style.flexDirection = "row";
          classNames.push('vertical');
        }

        return R('div', {
          style: style,
          className: classNames.join(" "),
          onMouseMove: this.onMouseMove,
          onMouseUp: this.onMouseUp
        }, React.createElement(Pane, {
          split: this.props.split,
          width: this.state.firstPaneSize,
          ref: function ref(c) {
            return _this2.firstPane = c;
          }
        }, this.props.children[0]), React.createElement(Divider, {
          ref: "divider",
          split: this.props.split,
          onMouseDown: this.onMouseDown
        }), React.createElement(Pane, {
          split: this.props.split,
          ref: "rightPane"
        }, this.props.children[1]));
      }
    }], [{
      key: "defaultProps",
      value: function defaultProps() {
        return {
          split: 'vertical'
        };
      }
    }]);
    return SplitPane;
  }(React.Component);

  ;
  SplitPane.propTypes = {
    // The split type "vertical" or "horizontal"
    split: PropTypes.oneOf(['vertical', 'horizontal']),
    // Size of the first pane. Takes a string with percentage value ("20%") or a number in pixels (300)
    firstPaneSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // Minimum size of the first pane. The first pane cannot be resized past this size. Takes a number in pixels
    minFirstPaneSize: PropTypes.number,
    // Callback function that will be called when the resizing is done. 
    // The current size of the firstpane is passed as first argument
    onResize: PropTypes.func
  };
  return SplitPane;
}.call(void 0);