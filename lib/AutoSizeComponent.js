var AutoSizeComponent, H, PropTypes, R, React, ReactDOM, Resizable,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

Resizable = require('./react-component-resizable');

module.exports = AutoSizeComponent = (function(superClass) {
  extend(AutoSizeComponent, superClass);

  AutoSizeComponent.propTypes = {
    injectWidth: PropTypes.bool,
    injectHeight: PropTypes.bool
  };

  function AutoSizeComponent() {
    this.updateSize = bind(this.updateSize, this);
    this.state = {
      width: null,
      height: null
    };
  }

  AutoSizeComponent.prototype.componentDidMount = function() {
    $(window).on('resize', this.updateSize);
    return this.updateSize();
  };

  AutoSizeComponent.prototype.componentWillUnmount = function() {
    return $(window).off('resize', this.updateSize);
  };

  AutoSizeComponent.prototype.updateSize = function() {
    var node;
    node = ReactDOM.findDOMNode(this);
    return this.setState({
      width: node.clientWidth,
      height: node.clientHeight
    });
  };

  AutoSizeComponent.prototype.render = function() {
    var innerElem, overrides, style;
    innerElem = null;
    if ((this.state.width != null) && (this.state.height != null)) {
      overrides = {};
      if (this.props.injectWidth) {
        overrides.width = this.state.width;
      }
      if (this.props.injectHeight) {
        overrides.height = this.state.height;
      }
      if (typeof this.props.children === "function") {
        innerElem = this.props.children(overrides);
      } else {
        innerElem = React.cloneElement(React.Children.only(this.props.children), overrides);
      }
    }
    style = {};
    if (this.props.injectWidth) {
      style.width = "100%";
    }
    if (this.props.injectHeight) {
      style.height = "100%";
    }
    return R(Resizable, {
      style: style,
      onResize: this.updateSize
    }, innerElem);
  };

  return AutoSizeComponent;

})(React.Component);
