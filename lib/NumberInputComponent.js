var H, NumberInputComponent, PropTypes, React, _, ui,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

_ = require('lodash');

React = require('react');

H = React.DOM;

ui = require('./bootstrap');

module.exports = NumberInputComponent = (function(superClass) {
  extend(NumberInputComponent, superClass);

  function NumberInputComponent() {
    return NumberInputComponent.__super__.constructor.apply(this, arguments);
  }

  NumberInputComponent.propTypes = {
    decimal: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    small: PropTypes.bool,
    placeholder: PropTypes.string
  };

  NumberInputComponent.defaultProps = {
    decimal: true
  };

  NumberInputComponent.prototype.render = function() {
    return React.createElement(ui.NumberInput, {
      decimal: this.props.decimal,
      value: this.props.value,
      onChange: this.props.onChange,
      style: this.props.style,
      size: this.props.small ? "sm" : null
    });
  };

  return NumberInputComponent;

})(React.Component);
