var Divider, PropTypes, R, React,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

R = React.createElement;

module.exports = Divider = (function(superClass) {
  extend(Divider, superClass);

  function Divider() {
    this.onMouseDown = bind(this.onMouseDown, this);
    return Divider.__super__.constructor.apply(this, arguments);
  }

  Divider.propTypes = {
    split: PropTypes.oneOf(['vertical', 'horizontal'])
  };

  Divider.defaultProps = function() {
    return {
      split: 'vertical'
    };
  };

  Divider.prototype.onMouseDown = function(event) {
    return this.props.onMouseDown(event);
  };

  Divider.prototype.render = function() {
    var classNames;
    classNames = ["divider"];
    if (this.props.split === "vertical") {
      classNames.push("vertical");
    }
    if (this.props.split === "horizontal") {
      classNames.push("horizontal");
    }
    return R('div', {
      className: classNames.join(" "),
      onMouseDown: this.onMouseDown
    });
  };

  return Divider;

})(React.Component);
