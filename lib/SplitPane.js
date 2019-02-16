var Divider, Pane, PropTypes, R, React, ReactDOM, SplitPane,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

R = React.createElement;

Pane = require('./Pane');

Divider = require('./Divider');

ReactDOM = require('react-dom');

module.exports = SplitPane = (function(superClass) {
  extend(SplitPane, superClass);

  SplitPane.propTypes = {
    split: PropTypes.oneOf(['vertical', 'horizontal']),
    firstPaneSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minFirstPaneSize: PropTypes.number,
    onResize: PropTypes.func
  };

  function SplitPane(props) {
    this.onMouseMove = bind(this.onMouseMove, this);
    this.onMouseDown = bind(this.onMouseDown, this);
    this.onMouseUp = bind(this.onMouseUp, this);
    SplitPane.__super__.constructor.call(this, props);
    this.state = {
      resizing: false,
      firstPaneSize: this.props.firstPaneSize
    };
  }

  SplitPane.defaultProps = function() {
    return {
      split: 'vertical'
    };
  };

  SplitPane.prototype.onMouseUp = function() {
    var base;
    if (this.state.resizing) {
      this.setState({
        resizing: false
      });
      return typeof (base = this.props).onResize === "function" ? base.onResize(this.state.firstPaneSize) : void 0;
    }
  };

  SplitPane.prototype.onMouseDown = function(event) {
    var dragStartAt;
    dragStartAt = this.props.split === "vertical" ? event.clientX : event.clientY;
    return this.setState({
      resizing: true,
      dragStartAt: dragStartAt
    });
  };

  SplitPane.prototype.onMouseMove = function(event) {
    var currentPosition, firstPaneSize, newSize;
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
  };

  SplitPane.prototype.render = function() {
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
      ref: ((function(_this) {
        return function(c) {
          return _this.firstPane = c;
        };
      })(this))
    }, this.props.children[0]), React.createElement(Divider, {
      ref: "divider",
      split: this.props.split,
      onMouseDown: this.onMouseDown
    }), React.createElement(Pane, {
      split: this.props.split,
      ref: "rightPane"
    }, this.props.children[1]));
  };

  return SplitPane;

})(React.Component);
