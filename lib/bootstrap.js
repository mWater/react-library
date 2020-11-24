"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Button,
    Checkbox,
    CollapsibleSection,
    FormGroup,
    Icon,
    NavPills,
    NumberInput,
    PropTypes,
    R,
    Radio,
    React,
    Select,
    TextInput,
    Toggle,
    _,
    classnames,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types');
classnames = require('classnames');
React = require('react');
R = React.createElement;
_ = require('lodash'); // Bootstrap components
// Simple spinner

exports.Spinner = function () {
  return R('i', {
    className: "fa fa-spinner fa-spin"
  });
}; // Standard button


exports.Button = Button = function () {
  var Button = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(Button, _React$Component);

    var _super = _createSuper(Button);

    function Button() {
      (0, _classCallCheck2["default"])(this, Button);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(Button, [{
      key: "render",
      value: function render() {
        return R('button', {
          type: "button",
          className: classnames("btn", "btn-".concat(this.props.type), {
            active: this.props.active
          }, (0, _defineProperty2["default"])({}, "btn-".concat(this.props.size), this.props.size != null)),
          onClick: this.props.onClick,
          disabled: this.props.disabled
        }, this.props.children);
      }
    }]);
    return Button;
  }(React.Component);

  ;
  Button.propTypes = {
    type: PropTypes.string.isRequired,
    // e.g. "primary"
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    size: PropTypes.string // e.g. "sm", "xs"

  };
  Button.defaultProps = {
    type: "default"
  };
  return Button;
}.call(void 0); // Icon, either font-awesome or glyphicon


exports.Icon = Icon = function () {
  var Icon = /*#__PURE__*/function (_React$Component2) {
    (0, _inherits2["default"])(Icon, _React$Component2);

    var _super2 = _createSuper(Icon);

    function Icon() {
      (0, _classCallCheck2["default"])(this, Icon);
      return _super2.apply(this, arguments);
    }

    (0, _createClass2["default"])(Icon, [{
      key: "render",
      value: function render() {
        if (this.props.id.match(/^fa-/)) {
          return R('i', {
            className: "fa ".concat(this.props.id)
          });
        } else if (this.props.id.match(/^glyphicon-/)) {
          return R('i', {
            className: "glyphicon ".concat(this.props.id)
          });
        } else {
          return null;
        }
      }
    }]);
    return Icon;
  }(React.Component);

  ;
  Icon.propTypes = {
    id: PropTypes.string.isRequired // e.g. "fa-check", 'glyphicon-ok', 'fa-check fa-fw'

  };
  return Icon;
}.call(void 0); // Indented form group with a label, optional help text. Label and indented contents


exports.FormGroup = FormGroup = function () {
  var FormGroup = /*#__PURE__*/function (_React$Component3) {
    (0, _inherits2["default"])(FormGroup, _React$Component3);

    var _super3 = _createSuper(FormGroup);

    function FormGroup() {
      (0, _classCallCheck2["default"])(this, FormGroup);
      return _super3.apply(this, arguments);
    }

    (0, _createClass2["default"])(FormGroup, [{
      key: "render",
      value: function render() {
        var classes;
        classes = {
          "form-group": true,
          "has-error": this.props.hasErrors,
          "has-warning": this.props.hasWarnings,
          "has-success": this.props.hasSuccess
        };
        return R('div', {
          className: classnames(classes)
        }, R('label', {
          key: "label"
        }, this.props.labelMuted ? R('span', {
          className: "text-muted"
        }, this.props.label) : this.props.label, this.props.hint ? R('span', {
          className: "text-muted",
          style: {
            fontWeight: this.props.label ? "normal" : void 0
          }
        }, this.props.label ? " - " : void 0, this.props.hint) : void 0), R('div', {
          key: "contents",
          style: {
            marginLeft: 5
          }
        }, this.props.children), this.props.help ? R('p', {
          key: "help",
          className: "help-block",
          style: {
            marginLeft: 5
          }
        }, this.props.help) : void 0);
      }
    }]);
    return FormGroup;
  }(React.Component);

  ;
  FormGroup.propTypes = {
    label: PropTypes.node,
    // Label to display
    labelMuted: PropTypes.bool,
    // True to mute label
    hint: PropTypes.node,
    // Hint to append to label. Makes label faded if only hint presented
    help: PropTypes.node,
    // Help block at bottom
    hasSuccess: PropTypes.bool,
    // True to display as success
    hasWarning: PropTypes.bool,
    // True to display as warning
    hasError: PropTypes.bool // True to display as error

  };
  return FormGroup;
}.call(void 0);

exports.Checkbox = Checkbox = function () {
  var Checkbox = /*#__PURE__*/function (_React$Component4) {
    (0, _inherits2["default"])(Checkbox, _React$Component4);

    var _super4 = _createSuper(Checkbox);

    function Checkbox() {
      var _this;

      (0, _classCallCheck2["default"])(this, Checkbox);
      _this = _super4.apply(this, arguments);
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2["default"])(_this));
      return _this;
    }

    (0, _createClass2["default"])(Checkbox, [{
      key: "handleChange",
      value: function handleChange(ev) {
        boundMethodCheck(this, Checkbox);

        if (this.props.nullForFalse) {
          return this.props.onChange(ev.target.checked || null);
        } else {
          return this.props.onChange(ev.target.checked);
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.inline) {
          return R('label', {
            className: "checkbox-inline"
          }, R('input', {
            type: "checkbox",
            checked: this.props.value || false,
            onChange: this.props.onChange ? this.handleChange : void 0
          }), this.props.children);
        } else {
          return R('div', {
            className: "checkbox"
          }, R('label', null, R('input', {
            type: "checkbox",
            checked: this.props.value || false,
            onChange: this.props.onChange ? this.handleChange : void 0
          }), this.props.children));
        }
      }
    }]);
    return Checkbox;
  }(React.Component);

  ;
  Checkbox.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    // Makes horizontal
    nullForFalse: PropTypes.bool // Uses null for false

  };
  return Checkbox;
}.call(void 0);

exports.Radio = Radio = function () {
  var Radio = /*#__PURE__*/function (_React$Component5) {
    (0, _inherits2["default"])(Radio, _React$Component5);

    var _super5 = _createSuper(Radio);

    function Radio() {
      (0, _classCallCheck2["default"])(this, Radio);
      return _super5.apply(this, arguments);
    }

    (0, _createClass2["default"])(Radio, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this.props.inline) {
          return R('label', {
            className: "radio-inline"
          }, R('input', {
            type: "radio",
            checked: this.props.value === this.props.radioValue,
            onChange: function onChange() {},
            // Do nothing
            onClick: this.props.onChange ? function (ev) {
              return _this2.props.onChange(_this2.props.radioValue);
            } : void 0
          }), this.props.children);
        } else {
          return R('div', {
            className: "radio"
          }, R('label', null, R('input', {
            type: "radio",
            checked: this.props.value === this.props.radioValue,
            onChange: function onChange() {},
            // Do nothing
            onClick: this.props.onChange ? function (ev) {
              return _this2.props.onChange(_this2.props.radioValue);
            } : void 0
          }), this.props.children));
        }
      }
    }]);
    return Radio;
  }(React.Component);

  ;
  Radio.propTypes = {
    value: PropTypes.any,
    // Value to display
    radioValue: PropTypes.any,
    // Value that radio button represents. If equal to value, button is checked
    onChange: PropTypes.func,
    // Called with radio value
    inline: PropTypes.bool // Makes horizontal

  };
  return Radio;
}.call(void 0); // Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
// all work as possible options.


exports.Select = Select = function () {
  var Select = /*#__PURE__*/function (_React$Component6) {
    (0, _inherits2["default"])(Select, _React$Component6);

    var _super6 = _createSuper(Select);

    function Select() {
      var _this3;

      (0, _classCallCheck2["default"])(this, Select);
      _this3 = _super6.apply(this, arguments);
      _this3.handleChange = _this3.handleChange.bind((0, _assertThisInitialized2["default"])(_this3));
      return _this3;
    }

    (0, _createClass2["default"])(Select, [{
      key: "handleChange",
      value: function handleChange(ev) {
        var value;
        boundMethodCheck(this, Select);
        value = JSON.parse(ev.target.value);
        return this.props.onChange(value);
      }
    }, {
      key: "render",
      value: function render() {
        var options, style;
        options = this.props.options.slice();

        if (this.props.nullLabel != null) {
          options.unshift({
            value: null,
            label: this.props.nullLabel
          });
        }

        style = {};

        if (this.props.inline) {
          style = {
            width: "auto",
            display: "inline-block"
          };
        }

        _.extend(style, this.props.style || {});

        return R('select', {
          style: style,
          disabled: this.props.onChange == null,
          className: classnames("form-control", {
            "input-sm": this.props.size === "sm"
          }, {
            "input-lg": this.props.size === "lg"
          }),
          value: JSON.stringify(this.props.value != null ? this.props.value : null),
          onChange: this.props.onChange ? this.handleChange : function () {}
        }, _.map(options, function (option) {
          return R('option', {
            key: JSON.stringify(option.value),
            value: JSON.stringify(option.value)
          }, option.label);
        }));
      }
    }]);
    return Select;
  }(React.Component);

  ;
  Select.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      // Can be any JS type that has a consistent stringification (boolean, null, string, number)
      label: PropTypes.string
    })),
    size: PropTypes.string,
    // "sm" or "lg"
    nullLabel: PropTypes.string,
    // True to make extra option of null with the label. Can be ""
    style: PropTypes.object,
    // Will be merged with style of select box
    inline: PropTypes.bool // True to make auto-width, inline

  };
  return Select;
}.call(void 0);

exports.TextInput = TextInput = function () {
  var TextInput = /*#__PURE__*/function (_React$Component7) {
    (0, _inherits2["default"])(TextInput, _React$Component7);

    var _super7 = _createSuper(TextInput);

    function TextInput() {
      var _this4;

      (0, _classCallCheck2["default"])(this, TextInput);
      _this4 = _super7.apply(this, arguments);
      _this4.handleChange = _this4.handleChange.bind((0, _assertThisInitialized2["default"])(_this4));
      return _this4;
    }

    (0, _createClass2["default"])(TextInput, [{
      key: "handleChange",
      value: function handleChange(ev) {
        var value;
        boundMethodCheck(this, TextInput);
        value = ev.target.value;

        if (this.props.emptyNull) {
          value = value || null;
        }

        return this.props.onChange(value);
      }
    }, {
      key: "focus",
      value: function focus() {
        var ref;
        return (ref = this.input) != null ? ref.focus() : void 0;
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        return R('input', {
          ref: function ref(c) {
            return _this5.input = c;
          },
          type: "text",
          className: classnames("form-control", {
            "input-sm": this.props.size === "sm"
          }, {
            "input-lg": this.props.size === "lg"
          }),
          value: this.props.value || "",
          style: this.props.style,
          onChange: this.props.onChange ? this.handleChange : void 0,
          placeholder: this.props.placeholder,
          disabled: this.props.onChange == null
        });
      }
    }]);
    return TextInput;
  }(React.Component);

  ;
  TextInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    // "sm" or "lg"
    emptyNull: PropTypes.bool,
    // True to make empty null
    style: PropTypes.object // Will be merged with style of input box

  };
  return TextInput;
}.call(void 0); // Number input component that handles parsing and maintains state when number is invalid


exports.NumberInput = NumberInput = function () {
  var NumberInput = /*#__PURE__*/function (_React$Component8) {
    (0, _inherits2["default"])(NumberInput, _React$Component8);

    var _super8 = _createSuper(NumberInput);

    function NumberInput(props) {
      var _this6;

      (0, _classCallCheck2["default"])(this, NumberInput);
      _this6 = _super8.call(this, props);
      _this6.handleKeyDown = _this6.handleKeyDown.bind((0, _assertThisInitialized2["default"])(_this6));
      _this6.handleBlur = _this6.handleBlur.bind((0, _assertThisInitialized2["default"])(_this6));
      _this6.getNumericValue = _this6.getNumericValue.bind((0, _assertThisInitialized2["default"])(_this6)); // Parsing happens on blur

      _this6.state = {
        inputText: _this6.formatInput(props)
      };
      return _this6;
    }

    (0, _createClass2["default"])(NumberInput, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        // If different, override text
        if (nextProps.value !== this.props.value) {
          return this.setState({
            inputText: this.formatInput(nextProps)
          });
        }
      } // Format the input based on props

    }, {
      key: "formatInput",
      value: function formatInput(props) {
        // Blank
        if (props.value == null) {
          return "";
        } // Integer


        if (!props.decimal) {
          return "" + Math.floor(props.value);
        } // Decimal


        if (props.decimalPlaces != null) {
          return props.value.toFixed(props.decimalPlaces);
        }

        return "" + props.value;
      }
    }, {
      key: "focus",
      value: function focus() {
        var ref;
        return (ref = this.input) != null ? ref.focus() : void 0;
      }
    }, {
      key: "handleKeyDown",
      value: function handleKeyDown(ev) {
        boundMethodCheck(this, NumberInput); // When pressing ENTER or TAB

        if (ev.keyCode === 13) {
          // First parse value as if blur will be done
          this.handleBlur();

          if (this.props.onEnter) {
            this.props.onEnter(ev);
            ev.preventDefault();
          }
        }

        if (ev.keyCode === 9) {
          // First parse value as if blur will be done
          this.handleBlur();

          if (this.props.onTab) {
            this.props.onTab(ev); // It's important to prevent the default behavior when handling tabs (or else the tab is applied after the focus change)

            return ev.preventDefault();
          }
        }
      }
    }, {
      key: "handleBlur",
      value: function handleBlur() {
        var base, val;
        boundMethodCheck(this, NumberInput); // Parse and set value if valid

        if (this.isValid()) {
          val = this.getNumericValue();

          if (val !== this.props.value) {
            return typeof (base = this.props).onChange === "function" ? base.onChange(val) : void 0;
          }
        }
      }
    }, {
      key: "getNumericValue",
      value: function getNumericValue() {
        var val;
        boundMethodCheck(this, NumberInput);
        val = this.props.decimal ? parseFloat(this.state.inputText) : parseInt(this.state.inputText);

        if (isNaN(val)) {
          return null;
        } else {
          // Round if necessary
          if (this.props.decimalPlaces != null) {
            val = parseFloat(val.toFixed(this.props.decimalPlaces));
          }
        }

        return val;
      } // Check regex matching of numbers

    }, {
      key: "isValid",
      value: function isValid() {
        var val, valid;

        if (this.state.inputText.length === 0) {
          return true;
        }

        if (this.props.decimal) {
          valid = this.state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) && !isNaN(parseFloat(this.state.inputText));

          if (!valid) {
            return false;
          }
        } else {
          valid = this.state.inputText.match(/^-?\d+$/);

          if (!valid) {
            return false;
          }
        }

        val = this.getNumericValue();

        if (val && this.props.max != null && val > this.props.max) {
          return false;
        }

        if (val && this.props.min != null && val < this.props.min) {
          return false;
        }

        return true;
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var inputType, style; // Display red border if not valid

        style = _.clone(this.props.style || {});
        style.width = style.width || "8em";

        if (!this.isValid()) {
          style.borderColor = "#a94442";
          style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
          style.backgroundColor = "rgba(132, 53, 52, 0.12)"; // Faded red
        }

        inputType = this.props.decimal ? "number" : "tel"; // Special problem with Galaxy Tab 3V (SM-T116NU) missing decimal place

        if (this.props.decimal && navigator.userAgent.match(/SM-/)) {
          inputType = "text";
        }

        return R('input', {
          ref: function ref(c) {
            return _this7.input = c;
          },
          type: inputType,
          className: "form-control ".concat(this.props.size ? "input-".concat(this.props.size) : ""),
          lang: "en",
          style: style,
          value: this.state.inputText,
          onChange: this.props.onChange ? function (ev) {
            return _this7.setState({
              inputText: ev.target.value
            });
          } : function () {},
          onBlur: this.handleBlur,
          onKeyDown: this.handleKeyDown,
          placeholder: this.props.placeholder,
          disabled: this.props.onChange == null
        });
      }
    }]);
    return NumberInput;
  }(React.Component);

  ;
  NumberInput.propTypes = {
    decimal: PropTypes.bool.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func,
    style: PropTypes.object,
    // Will be merged with style of input box
    size: PropTypes.string,
    // "sm", "lg"
    onTab: PropTypes.func,
    onEnter: PropTypes.func,
    decimalPlaces: PropTypes.number,
    // Force an exact number of decimal places, rounding value as necessary
    placeholder: PropTypes.string,
    min: PropTypes.number,
    // The minimum number allowed
    max: PropTypes.number // The maximum number allowed

  };
  return NumberInput;
}.call(void 0); // Indented section than can be opened and closed. Defaults closed


exports.CollapsibleSection = CollapsibleSection = function () {
  var CollapsibleSection = /*#__PURE__*/function (_React$Component9) {
    (0, _inherits2["default"])(CollapsibleSection, _React$Component9);

    var _super9 = _createSuper(CollapsibleSection);

    function CollapsibleSection(props) {
      var _this8;

      (0, _classCallCheck2["default"])(this, CollapsibleSection);
      _this8 = _super9.call(this, props);
      _this8.handleToggle = _this8.handleToggle.bind((0, _assertThisInitialized2["default"])(_this8));
      _this8.state = {
        open: props.initiallyOpen || false
      };
      return _this8;
    }

    (0, _createClass2["default"])(CollapsibleSection, [{
      key: "handleToggle",
      value: function handleToggle() {
        boundMethodCheck(this, CollapsibleSection);
        return this.setState({
          open: !this.state.open
        });
      }
    }, {
      key: "render",
      value: function render() {
        return R('div', {
          className: "form-group"
        }, R('label', {
          key: "label",
          onClick: this.handleToggle,
          style: {
            cursor: "pointer"
          }
        }, this.state.open ? R('i', {
          className: "fa fa-fw fa-caret-down ".concat(this.props.labelMuted ? "text-muted" : void 0)
        }) : R('i', {
          className: "fa fa-fw fa-caret-right ".concat(this.props.labelMuted ? "text-muted" : void 0)
        }), this.props.labelMuted ? R('span', {
          className: "text-muted"
        }, this.props.label) : this.props.label, this.props.hint ? R('span', {
          className: "text-muted",
          style: {
            fontWeight: this.props.label ? "normal" : void 0
          }
        }, this.props.label ? " - " : void 0, this.props.hint) : void 0), this.state.open ? R('div', {
          key: "contents",
          style: {
            marginLeft: 5
          }
        }, this.props.children) : void 0);
      }
    }]);
    return CollapsibleSection;
  }(React.Component);

  ;
  CollapsibleSection.propTypes = {
    initiallyOpen: PropTypes.bool,
    label: PropTypes.node,
    // Label to display
    labelMuted: PropTypes.bool,
    // True to mute label
    hint: PropTypes.node // Hint to append to label. Makes label faded if only hint presented

  };
  return CollapsibleSection;
}.call(void 0); // Displays bootstrap pills with one active    


exports.NavPills = NavPills = function () {
  var NavPills = /*#__PURE__*/function (_React$Component10) {
    (0, _inherits2["default"])(NavPills, _React$Component10);

    var _super10 = _createSuper(NavPills);

    function NavPills() {
      (0, _classCallCheck2["default"])(this, NavPills);
      return _super10.apply(this, arguments);
    }

    (0, _createClass2["default"])(NavPills, [{
      key: "render",
      value: function render() {
        var _this9 = this;

        return R('ul', {
          className: "nav nav-pills"
        }, _.map(this.props.pills, function (pill) {
          return R('li', {
            key: pill.id,
            className: pill.id === _this9.props.activePill ? "active" : ""
          }, R('a', {
            href: pill.href,
            onClick: function onClick() {
              var base;
              return typeof (base = _this9.props).onPillClick === "function" ? base.onPillClick(pill.id) : void 0;
            }
          }, pill.label));
        }));
      }
    }]);
    return NavPills;
  }(React.Component);

  ;
  NavPills.propTypes = {
    pills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      // Id of the tab
      label: PropTypes.node.isRequired,
      // Label of the tab
      href: PropTypes.string // href optional

    })),
    activePill: PropTypes.string,
    onPillClick: PropTypes.func // Called with id

  };
  return NavPills;
}.call(void 0); // Button toggle component


exports.Toggle = Toggle = function () {
  var Toggle = /*#__PURE__*/function (_React$Component11) {
    (0, _inherits2["default"])(Toggle, _React$Component11);

    var _super11 = _createSuper(Toggle);

    function Toggle() {
      var _this10;

      (0, _classCallCheck2["default"])(this, Toggle);
      _this10 = _super11.apply(this, arguments);
      _this10.renderOption = _this10.renderOption.bind((0, _assertThisInitialized2["default"])(_this10));
      return _this10;
    }

    (0, _createClass2["default"])(Toggle, [{
      key: "renderOption",
      value: function renderOption(option, index) {
        var btnClasses, props, value;
        boundMethodCheck(this, Toggle);
        value = this.props.value === option.value && this.props.allowReset ? null : option.value;
        btnClasses = classnames("btn", {
          "btn-default": !(this.props.value === option.value),
          "btn-primary": this.props.value === option.value,
          active: this.props.value === option.value
        });
        props = {
          key: index,
          type: "button",
          className: btnClasses
        };

        if (!(this.props.value === option.value) || this.props.allowReset) {
          props['onClick'] = this.props.onChange ? this.props.onChange.bind(null, value) : null;
        }

        return R('button', props, option.label);
      }
    }, {
      key: "render",
      value: function render() {
        return R('div', {
          className: "btn-group ".concat(this.props.size ? "btn-group-".concat(this.props.size) : "")
        }, _.map(this.props.options, this.renderOption));
      }
    }]);
    return Toggle;
  }(React.Component);

  ;
  Toggle.propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node.isRequired
    })).isRequired,
    onChange: PropTypes.func,
    size: PropTypes.string,
    // "xs", "sm", "lg"
    allowReset: PropTypes.bool
  };
  return Toggle;
}.call(void 0);