var FillDownwardComponent, H, R, React, ReactDOM, Resizable,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

Resizable = require('./react-component-resizable');

module.exports = FillDownwardComponent = (function(superClass) {
  extend(FillDownwardComponent, superClass);

  function FillDownwardComponent() {
    this.updateSize = bind(this.updateSize, this);
    this.state = {
      height: null
    };
  }

  FillDownwardComponent.prototype.componentDidMount = function() {
    $(window).on('resize', this.updateSize);
    return this.updateSize();
  };

  FillDownwardComponent.prototype.componentWillUnmount = function() {
    return $(window).off('resize', this.updateSize);
  };

  FillDownwardComponent.prototype.updateSize = function() {
    var height, self, vpos;
    self = this.refs.self;
    if (!self) {
      return;
    }
    vpos = self.getBoundingClientRect().top + window.scrollY;
    height = window.innerHeight - vpos;
    return this.setState({
      height: Math.max(height, 50)
    });
  };

  FillDownwardComponent.prototype.render = function() {
    if (!this.state.height) {
      return H.div({
        style: {
          height: 100
        },
        ref: "self"
      });
    }
    return H.div({
      style: {
        height: this.state.height
      },
      ref: "self"
    }, this.props.children);
  };

  return FillDownwardComponent;

})(React.Component);
