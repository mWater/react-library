var FillDownwardComponent, R, React, ReactDOM, Resizable,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

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
    self = this.self;
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
      return R('div', {
        style: {
          height: 100
        },
        ref: (function(_this) {
          return function(c) {
            return _this.self = c;
          };
        })(this)
      });
    }
    return R('div', {
      style: {
        height: this.state.height
      },
      ref: ((function(_this) {
        return function(c) {
          return _this.self = c;
        };
      })(this))
    }, this.props.children);
  };

  return FillDownwardComponent;

})(React.Component);
