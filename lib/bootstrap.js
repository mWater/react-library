var Button, Checkbox, CollapsibleSection, FormGroup, H, Icon, NavPills, NumberInput, PropTypes, R, Radio, React, Select, TextInput, classnames,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PropTypes = require('prop-types');

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
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    size: PropTypes.string
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
    id: PropTypes.string.isRequired
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
    label: PropTypes.node,
    labelMuted: PropTypes.bool,
    hint: PropTypes.node,
    help: PropTypes.node,
    hasSuccess: PropTypes.bool,
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool
  };

  FormGroup.prototype.render = function() {
    var classes;
    classes = {
      "form-group": true,
      "has-error": this.props.hasErrors,
      "has-warning": this.props.hasWarnings,
      "has-success": this.props.hasSuccess
    };
    return H.div({
      className: classnames(classes)
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
    value: PropTypes.bool,
    onChange: PropTypes.func,
    inline: PropTypes.bool
  };

  Checkbox.prototype.render = function() {
    if (this.props.inline) {
      return H.label({
        className: "checkbox-inline"
      }, H.input({
        type: "checkbox",
        checked: this.props.value || false,
        onChange: this.props.onChange ? (function(_this) {
          return function(ev) {
            return _this.props.onChange(ev.target.checked);
          };
        })(this) : void 0
      }), this.props.children);
    } else {
      return H.div({
        className: "checkbox"
      }, H.label(null, H.input({
        type: "checkbox",
        checked: this.props.value || false,
        onChange: this.props.onChange ? (function(_this) {
          return function(ev) {
            return _this.props.onChange(ev.target.checked);
          };
        })(this) : void 0
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
    value: PropTypes.any,
    radioValue: PropTypes.any,
    onChange: PropTypes.func,
    inline: PropTypes.bool
  };

  Radio.prototype.render = function() {
    return H.div({
      className: (this.props.inline ? "radio-inline" : "radio")
    }, H.label(null, H.input({
      type: "radio",
      checked: this.props.value === this.props.radioValue,
      onChange: function() {},
      onClick: this.props.onChange ? (function(_this) {
        return function(ev) {
          return _this.props.onChange(_this.props.radioValue);
        };
      })(this) : void 0
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
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })),
    size: PropTypes.string,
    nullLabel: PropTypes.string,
    style: PropTypes.object
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
      style: this.props.style,
      className: classnames("form-control", {
        "input-sm": this.props.size === "sm"
      }, {
        "input-lg": this.props.size === "lg"
      }),
      value: JSON.stringify(this.props.value != null ? this.props.value : null),
      onChange: (this.props.onChange ? this.handleChange : void 0)
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
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    emptyNull: PropTypes.bool,
    style: PropTypes.object
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
      style: this.props.style,
      onChange: this.props.onChange ? this.handleChange : void 0,
      placeholder: this.props.placeholder
    });
  };

  return TextInput;

})(React.Component);

exports.NumberInput = NumberInput = (function(superClass) {
  extend(NumberInput, superClass);

  NumberInput.propTypes = {
    decimal: PropTypes.bool.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func,
    style: PropTypes.object,
    size: PropTypes.string,
    onTab: PropTypes.func,
    onEnter: PropTypes.func
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
    if (this.props.onEnter && ev.keyCode === 13) {
      this.props.onEnter(ev);
      ev.preventDefault();
    }
    if (this.props.onTab && ev.keyCode === 9 && this.props.onTab) {
      this.props.onTab(ev);
      return ev.preventDefault();
    }
  };

  NumberInput.prototype.handleBlur = function() {
    var base, base1, base2, val;
    if (this.isValid()) {
      val = this.props.decimal ? parseFloat(this.state.inputText) : parseInt(this.state.inputText);
      if (isNaN(val)) {
        return typeof (base = this.props).onChange === "function" ? base.onChange(null) : void 0;
      } else {
        return typeof (base1 = this.props).onChange === "function" ? base1.onChange(val) : void 0;
      }
    } else {
      return typeof (base2 = this.props).onChange === "function" ? base2.onChange(this.props.value) : void 0;
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
      onChange: this.props.onChange ? (function(_this) {
        return function(ev) {
          return _this.setState({
            inputText: ev.target.value
          });
        };
      })(this) : void 0,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown
    });
  };

  return NumberInput;

})(React.Component);

exports.CollapsibleSection = CollapsibleSection = (function(superClass) {
  extend(CollapsibleSection, superClass);

  CollapsibleSection.propTypes = {
    initiallyOpen: PropTypes.bool,
    label: PropTypes.node,
    labelMuted: PropTypes.bool,
    hint: PropTypes.node
  };

  function CollapsibleSection(props) {
    this.handleToggle = bind(this.handleToggle, this);
    CollapsibleSection.__super__.constructor.call(this, props);
    this.state = {
      open: props.initiallyOpen || false
    };
  }

  CollapsibleSection.prototype.handleToggle = function() {
    return this.setState({
      open: !this.state.open
    });
  };

  CollapsibleSection.prototype.render = function() {
    return H.div({
      className: "form-group"
    }, H.label({
      key: "label",
      onClick: this.handleToggle,
      style: {
        cursor: "pointer"
      }
    }, this.state.open ? H.i({
      className: "fa fa-fw fa-caret-down " + (this.props.labelMuted ? "text-muted" : void 0)
    }) : H.i({
      className: "fa fa-fw fa-caret-right " + (this.props.labelMuted ? "text-muted" : void 0)
    }), this.props.labelMuted ? H.span({
      className: "text-muted"
    }, this.props.label) : this.props.label, this.props.hint ? H.span({
      className: "text-muted",
      style: {
        fontWeight: this.props.label ? "normal" : void 0
      }
    }, this.props.label ? " - " : void 0, this.props.hint) : void 0), this.state.open ? H.div({
      key: "contents",
      style: {
        marginLeft: 5
      }
    }, this.props.children) : void 0);
  };

  return CollapsibleSection;

})(React.Component);

exports.NavPills = NavPills = (function(superClass) {
  extend(NavPills, superClass);

  function NavPills() {
    return NavPills.__super__.constructor.apply(this, arguments);
  }

  NavPills.propTypes = {
    pills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      href: PropTypes.string
    })),
    activePill: PropTypes.string,
    onPillClick: PropTypes.func
  };

  NavPills.prototype.render = function() {
    return H.ul({
      className: "nav nav-pills"
    }, _.map(this.props.pills, (function(_this) {
      return function(pill) {
        return H.li({
          key: pill.id,
          className: (pill.id === _this.props.activePill ? "active" : "")
        }, H.a({
          href: pill.href,
          onClick: (function() {
            var base;
            return typeof (base = _this.props).onPillClick === "function" ? base.onPillClick(pill.id) : void 0;
          })
        }, pill.label));
      };
    })(this)));
  };

  return NavPills;

})(React.Component);
