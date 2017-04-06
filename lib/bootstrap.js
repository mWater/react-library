var Button, Checkbox, FormGroup, H, Icon, NumberInput, R, Radio, React, Select, TextInput, classnames,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

classnames = require('classnames');

React = require('react');

H = React.DOM;

R = React.createElement;

exports.Spinner = function() {
  return H.i({
    className: "fa fa-spinner fa-spin"
  });
};

exports.Button = Button = (function(superClass) {
  extend(Button, superClass);

  function Button() {
    return Button.__super__.constructor.apply(this, arguments);
  }

  Button.propTypes = {
    type: React.PropTypes.string,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    size: React.PropTypes.string
  };

  Button.defaultProps = {
    type: "default"
  };

  Button.prototype.render = function() {
    var obj;
    return H.button({
      type: "button",
      className: classnames("btn", "btn-" + this.props.type, {
        active: this.props.active
      }, (
        obj = {},
        obj["btn-" + this.props.size] = this.props.size != null,
        obj
      )),
      onClick: this.props.onClick,
      disabled: this.props.disabled
    }, this.props.children);
  };

  return Button;

})(React.Component);

exports.Icon = Icon = (function(superClass) {
  extend(Icon, superClass);

  function Icon() {
    return Icon.__super__.constructor.apply(this, arguments);
  }

  Icon.propTypes = {
    id: React.PropTypes.string.isRequired
  };

  Icon.prototype.render = function() {
    if (this.props.id.match(/^fa-/)) {
      return H.i({
        className: "fa " + this.props.id
      });
    } else if (this.props.id.match(/^glyphicon-/)) {
      return H.i({
        className: "glyphicon " + this.props.id
      });
    } else {
      return null;
    }
  };

  return Icon;

})(React.Component);

exports.FormGroup = FormGroup = (function(superClass) {
  extend(FormGroup, superClass);

  function FormGroup() {
    return FormGroup.__super__.constructor.apply(this, arguments);
  }

  FormGroup.propTypes = {
    label: React.PropTypes.node,
    labelMuted: React.PropTypes.bool,
    hint: React.PropTypes.node,
    help: React.PropTypes.node
  };

  FormGroup.prototype.render = function() {
    return H.div({
      className: "form-group"
    }, H.label({
      key: "label"
    }, this.props.labelMuted ? H.span({
      className: "text-muted"
    }, this.props.label) : this.props.label, this.props.hint ? H.span({
      className: "text-muted",
      style: {
        fontWeight: this.props.label ? "normal" : void 0
      }
    }, this.props.label ? " - " : void 0, this.props.hint) : void 0), H.div({
      key: "contents",
      style: {
        marginLeft: 5
      }
    }, this.props.children), this.props.help ? H.p({
      key: "help",
      className: "help-block",
      style: {
        marginLeft: 5
      }
    }, this.props.help) : void 0);
  };

  return FormGroup;

})(React.Component);

exports.Checkbox = Checkbox = (function(superClass) {
  extend(Checkbox, superClass);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  Checkbox.propTypes = {
    value: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    inline: React.PropTypes.bool
  };

  Checkbox.prototype.render = function() {
    if (this.props.inline) {
      return H.label({
        className: "checkbox-inline"
      }, H.input({
        type: "checkbox",
        checked: this.props.value || false,
        onChange: (function(_this) {
          return function(ev) {
            return _this.props.onChange(ev.target.checked);
          };
        })(this)
      }), this.props.children);
    } else {
      return H.div({
        className: "checkbox"
      }, H.label(null, H.input({
        type: "checkbox",
        checked: this.props.value || false,
        onChange: (function(_this) {
          return function(ev) {
            return _this.props.onChange(ev.target.checked);
          };
        })(this)
      }), this.props.children));
    }
  };

  return Checkbox;

})(React.Component);

exports.Radio = Radio = (function(superClass) {
  extend(Radio, superClass);

  function Radio() {
    return Radio.__super__.constructor.apply(this, arguments);
  }

  Radio.propTypes = {
    value: React.PropTypes.any,
    radioValue: React.PropTypes.any,
    onChange: React.PropTypes.func,
    inline: React.PropTypes.bool
  };

  Radio.prototype.render = function() {
    return H.div({
      className: (this.props.inline ? "radio-inline" : "radio")
    }, H.label(null, H.input({
      type: "radio",
      checked: this.props.value === this.props.radioValue,
      onChange: function() {},
      onClick: (function(_this) {
        return function(ev) {
          return _this.props.onChange(_this.props.radioValue);
        };
      })(this)
    }), this.props.children));
  };

  return Radio;

})(React.Component);

exports.Select = Select = (function(superClass) {
  extend(Select, superClass);

  function Select() {
    this.handleChange = bind(this.handleChange, this);
    return Select.__super__.constructor.apply(this, arguments);
  }

  Select.propTypes = {
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.any,
      label: React.PropTypes.string
    })),
    size: React.PropTypes.string,
    nullLabel: React.PropTypes.string
  };

  Select.prototype.handleChange = function(ev) {
    var value;
    value = JSON.parse(ev.target.value);
    return this.props.onChange(value);
  };

  Select.prototype.render = function() {
    var options;
    options = this.props.options.slice();
    if (this.props.nullLabel != null) {
      options.unshift({
        value: null,
        label: this.props.nullLabel
      });
    }
    return H.select({
      className: classnames("form-control", {
        "input-sm": this.props.size === "sm"
      }, {
        "input-lg": this.props.size === "lg"
      }),
      value: JSON.stringify(this.props.value != null ? this.props.value : null),
      onChange: this.handleChange
    }, _.map(options, (function(_this) {
      return function(option) {
        return H.option({
          key: JSON.stringify(option.value),
          value: JSON.stringify(option.value)
        }, option.label);
      };
    })(this)));
  };

  return Select;

})(React.Component);

exports.TextInput = TextInput = (function(superClass) {
  extend(TextInput, superClass);

  function TextInput() {
    this.handleChange = bind(this.handleChange, this);
    return TextInput.__super__.constructor.apply(this, arguments);
  }

  TextInput.propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    size: React.PropTypes.string,
    emptyNull: React.PropTypes.bool
  };

  TextInput.prototype.handleChange = function(ev) {
    var value;
    value = ev.target.value;
    if (this.props.emptyNull) {
      value = value || null;
    }
    return this.props.onChange(value);
  };

  TextInput.prototype.render = function() {
    return H.input({
      type: "text",
      className: classnames("form-control", {
        "input-sm": this.props.size === "sm"
      }, {
        "input-lg": this.props.size === "lg"
      }),
      value: this.props.value || "",
      onChange: this.handleChange,
      placeholder: this.props.placeholder
    });
  };

  return TextInput;

})(React.Component);

exports.NumberInput = NumberInput = (function(superClass) {
  extend(NumberInput, superClass);

  NumberInput.propTypes = {
    decimal: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
    size: React.PropTypes.string,
    onTab: React.PropTypes.func,
    onEnter: React.PropTypes.func
  };

  function NumberInput(props) {
    this.handleBlur = bind(this.handleBlur, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
    NumberInput.__super__.constructor.apply(this, arguments);
    this.state = {
      inputText: this.props.value != null ? "" + this.props.value : ""
    };
  }

  NumberInput.prototype.componentWillReceiveProps = function(nextProps) {
    if (nextProps.value !== this.props.value) {
      return this.setState({
        inputText: nextProps.value != null ? "" + nextProps.value : ""
      });
    }
  };

  NumberInput.prototype.focus = function() {
    var ref;
    return (ref = this.input) != null ? ref.focus() : void 0;
  };

  NumberInput.prototype.handleKeyDown = function(ev) {
    if (ev.keyCode === 13) {
      this.props.onEnter(ev);
      ev.preventDefault();
    }
    if (ev.keyCode === 9 && this.props.onTab) {
      this.props.onTab(ev);
      return ev.preventDefault();
    }
  };

  NumberInput.prototype.handleBlur = function() {
    var val;
    if (this.isValid()) {
      val = this.props.decimal ? parseFloat(this.state.inputText) : parseInt(this.state.inputText);
      if (isNaN(val)) {
        return this.props.onChange(null);
      } else {
        return this.props.onChange(val);
      }
    } else {
      return this.props.onChange(this.props.value);
    }
  };

  NumberInput.prototype.isValid = function() {
    if (this.state.inputText.length === 0) {
      return true;
    }
    if (this.props.decimal) {
      return this.state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) && !isNaN(parseFloat(this.state.inputText));
    } else {
      return this.state.inputText.match(/^-?\d+$/);
    }
  };

  NumberInput.prototype.render = function() {
    var style;
    style = _.clone(this.props.style || {});
    style.width = style.width || "8em";
    if (!this.isValid()) {
      style.borderColor = "#a94442";
      style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
      style.backgroundColor = "rgba(132, 53, 52, 0.12)";
    }
    return H.input({
      ref: (function(_this) {
        return function(c) {
          return _this.input = c;
        };
      })(this),
      type: this.props.decimal ? "number" : "tel",
      className: "form-control " + (this.props.size ? "input-" + this.props.size : ""),
      lang: "en",
      style: style,
      value: this.state.inputText,
      onChange: (function(_this) {
        return function(ev) {
          return _this.setState({
            inputText: ev.target.value
          });
        };
      })(this),
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown
    });
  };

  return NumberInput;

})(React.Component);
