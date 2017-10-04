var AsyncReactSelectCompat, H, PropTypes, R, React, ReactSelect, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

H = React.DOM;

R = React.createElement;

ReactSelect = require('react-select');

PropTypes = require('prop-types');

module.exports = AsyncReactSelectCompat = (function(superClass) {
  extend(AsyncReactSelectCompat, superClass);

  function AsyncReactSelectCompat() {
    this.handleChange = bind(this.handleChange, this);
    return AsyncReactSelectCompat.__super__.constructor.apply(this, arguments);
  }

  AsyncReactSelectCompat.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    multiple: PropTypes.bool,
    loadOptions: PropTypes.func,
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    optionRenderer: PropTypes.func,
    valueRenderer: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool
  };

  AsyncReactSelectCompat.prototype.handleChange = function(value) {
    if (this.props.multiple) {
      return this.props.onChange(value.map(function(sel) {
        return sel.value;
      }));
    } else {
      return this.props.onChange(value ? value.value : value);
    }
  };

  AsyncReactSelectCompat.prototype.render = function() {
    var autoload, val;
    autoload = (this.props.value == null) || this.props.value.length === 0 || this.props.value === '';
    val = this.props.value;
    if ((this.props.value != null) || this.props.value === '') {
      val = {
        label: this.props.value,
        value: this.props.value
      };
    }
    if (this.props.multiple && (this.props.value != null)) {
      val = this.props.value.map(function(val) {
        return {
          value: val
        };
      });
    }
    return R(ReactSelect.Async, {
      value: val,
      cacheAsyncResults: false,
      multi: this.props.multiple || false,
      clearable: this.props.allowClear,
      placeholder: this.props.placeholder != null ? this.props.placeholder : "Select...",
      onChange: this.handleChange,
      loadOptions: this.props.loadOptions,
      optionRenderer: this.props.optionRenderer,
      valueRenderer: this.props.valueRenderer,
      filterOption: function() {
        return true;
      },
      filterOptions: (function(_this) {
        return function(options, filter, currentValues) {
          options = options || [];
          if ((_this.props.value == null) || _this.props.value.length === 0 || _this.props.value === '') {
            return options;
          }
          if (_this.props.multiple) {
            return _.filter(options, function(o) {
              return _this.props.value.indexOf(o.value) < 0;
            });
          } else {
            return _.filter(options, function(o) {
              return _this.props.value !== o.value;
            });
          }
        };
      })(this),
      disabled: this.props.disabled,
      inputProps: {
        readOnly: this.props.readOnly
      }
    });
  };

  return AsyncReactSelectCompat;

})(React.Component);
