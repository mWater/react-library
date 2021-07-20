// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let Button, Checkbox, CollapsibleSection, FormGroup, Icon, NavPills, NumberInput, Radio, Select, TextInput, Toggle
import PropTypes from "prop-types"
import classnames from "classnames"
import React from "react"
const R = React.createElement
import _ from "lodash"

// Bootstrap components

// Simple spinner
export function Spinner() {
  return R("i", { className: "fa fa-spinner fa-spin" })
}

// Standard button
let _Button = (Button = (function () {
  Button = class Button extends React.Component {
    static initClass() {
      this.propTypes = {
        type: PropTypes.string.isRequired, // e.g. "primary"
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        active: PropTypes.bool,
        size: PropTypes.string // e.g. "sm", "xs"
      }

      this.defaultProps = { type: "default" }
    }

    render() {
      return R(
        "button",
        {
          type: "button",
          className: classnames(
            "btn",
            `btn-${this.props.type}`,
            { active: this.props.active },
            { [`btn-${this.props.size}`]: this.props.size != null }
          ),
          onClick: this.props.onClick,
          disabled: this.props.disabled
        },
        this.props.children
      )
    }
  }
  Button.initClass()
  return Button
})())

export { _Button as Button }

// Icon, either font-awesome or glyphicon
let _Icon = (Icon = (function () {
  Icon = class Icon extends React.Component {
    static initClass() {
      this.propTypes = { id: PropTypes.string.isRequired }
      // e.g. "fa-check", 'glyphicon-ok', 'fa-check fa-fw'
    }

    render() {
      if (this.props.id.match(/^fa-/)) {
        return R("i", { className: `fa ${this.props.id}` })
      } else if (this.props.id.match(/^glyphicon-/)) {
        return R("i", { className: `glyphicon ${this.props.id}` })
      } else {
        return null
      }
    }
  }
  Icon.initClass()
  return Icon
})())

export { _Icon as Icon }

// Indented form group with a label, optional help text. Label and indented contents
let _FormGroup = (FormGroup = (function () {
  FormGroup = class FormGroup extends React.Component {
    static initClass() {
      this.propTypes = {
        label: PropTypes.node, // Label to display
        labelMuted: PropTypes.bool, // True to mute label
        hint: PropTypes.node, // Hint to append to label. Makes label faded if only hint presented
        help: PropTypes.node, // Help block at bottom
        hasSuccess: PropTypes.bool, // True to display as success
        hasWarning: PropTypes.bool, // True to display as warning
        hasError: PropTypes.bool
      }
      // True to display as error
    }

    render() {
      const classes = {
        "form-group": true,
        "has-error": this.props.hasErrors,
        "has-warning": this.props.hasWarnings,
        "has-success": this.props.hasSuccess
      }

      return R(
        "div",
        { className: classnames(classes) },
        R(
          "label",
          { key: "label" },
          this.props.labelMuted ? R("span", { className: "text-muted" }, this.props.label) : this.props.label,

          this.props.hint
            ? R(
                "span",
                { className: "text-muted", style: { fontWeight: this.props.label ? "normal" : undefined } },
                this.props.label ? " - " : undefined,
                this.props.hint
              )
            : undefined
        ),

        R("div", { key: "contents", style: { marginLeft: 5 } }, this.props.children),
        this.props.help
          ? R("p", { key: "help", className: "help-block", style: { marginLeft: 5 } }, this.props.help)
          : undefined
      )
    }
  }
  FormGroup.initClass()
  return FormGroup
})())

export { _FormGroup as FormGroup }

let _Checkbox = (Checkbox = (function () {
  Checkbox = class Checkbox extends React.Component {
    static initClass() {
      this.propTypes = {
        value: PropTypes.bool,
        onChange: PropTypes.func,
        inline: PropTypes.bool, // Makes horizontal
        nullForFalse: PropTypes.bool
      }
      // Uses null for false
    }

    handleChange = (ev: any) => {
      if (this.props.nullForFalse) {
        return this.props.onChange(ev.target.checked || null)
      } else {
        return this.props.onChange(ev.target.checked)
      }
    }

    render() {
      if (this.props.inline) {
        return R(
          "label",
          { className: "checkbox-inline" },
          R("input", {
            type: "checkbox",
            checked: this.props.value || false,
            onChange: this.props.onChange ? this.handleChange : undefined
          }),
          this.props.children
        )
      } else {
        return R(
          "div",
          { className: "checkbox" },
          R(
            "label",
            null,
            R("input", {
              type: "checkbox",
              checked: this.props.value || false,
              onChange: this.props.onChange ? this.handleChange : undefined
            }),
            this.props.children
          )
        )
      }
    }
  }
  Checkbox.initClass()
  return Checkbox
})())

export { _Checkbox as Checkbox }

let _Radio = (Radio = (function () {
  Radio = class Radio extends React.Component {
    static initClass() {
      this.propTypes = {
        value: PropTypes.any, // Value to display
        radioValue: PropTypes.any, // Value that radio button represents. If equal to value, button is checked
        onChange: PropTypes.func, // Called with radio value
        inline: PropTypes.bool
      }
      // Makes horizontal
    }

    render() {
      if (this.props.inline) {
        return R(
          "label",
          { className: "radio-inline" },
          R("input", {
            type: "radio",
            checked: this.props.value === this.props.radioValue,
            onChange() {}, // Do nothing
            onClick: this.props.onChange ? (ev) => this.props.onChange(this.props.radioValue) : undefined
          }),
          this.props.children
        )
      } else {
        return R(
          "div",
          { className: "radio" },
          R(
            "label",
            null,
            R("input", {
              type: "radio",
              checked: this.props.value === this.props.radioValue,
              onChange() {}, // Do nothing
              onClick: this.props.onChange ? (ev) => this.props.onChange(this.props.radioValue) : undefined
            }),
            this.props.children
          )
        )
      }
    }
  }
  Radio.initClass()
  return Radio
})())

export { _Radio as Radio }

// Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
// all work as possible options.
let _Select = (Select = (function () {
  Select = class Select extends React.Component {
    static initClass() {
      this.propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.any, // Can be any JS type that has a consistent stringification (boolean, null, string, number)
            label: PropTypes.string
          })
        ),
        size: PropTypes.string, // "sm" or "lg"
        nullLabel: PropTypes.string, // True to make extra option of null with the label. Can be ""
        style: PropTypes.object, // Will be merged with style of select box
        inline: PropTypes.bool
      }
      // True to make auto-width, inline
    }

    handleChange = (ev: any) => {
      const value = JSON.parse(ev.target.value)
      return this.props.onChange(value)
    }

    render() {
      const options = this.props.options.slice()
      if (this.props.nullLabel != null) {
        options.unshift({ value: null, label: this.props.nullLabel })
      }

      let style = {}
      if (this.props.inline) {
        style = { width: "auto", display: "inline-block" }
      }
      _.extend(style, this.props.style || {})

      return R(
        "select",
        {
          style,
          disabled: this.props.onChange == null,
          className: classnames(
            "form-control",
            { "input-sm": this.props.size === "sm" },
            { "input-lg": this.props.size === "lg" }
          ),
          value: JSON.stringify(this.props.value != null ? this.props.value : null),
          onChange: this.props.onChange ? this.handleChange : function () {}
        },
        _.map(options, (option) =>
          R("option", { key: JSON.stringify(option.value), value: JSON.stringify(option.value) }, option.label)
        )
      )
    }
  }
  Select.initClass()
  return Select
})())

export { _Select as Select }

let _TextInput = (TextInput = (function () {
  TextInput = class TextInput extends React.Component {
    static initClass() {
      this.propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        size: PropTypes.string, // "sm" or "lg"
        emptyNull: PropTypes.bool, // True to make empty null
        style: PropTypes.object
      }
      // Will be merged with style of input box
    }

    handleChange = (ev: any) => {
      let { value } = ev.target
      if (this.props.emptyNull) {
        value = value || null
      }

      return this.props.onChange(value)
    }

    focus() {
      return this.input?.focus()
    }

    render() {
      return R("input", {
        ref: (c) => {
          return (this.input = c)
        },
        type: "text",
        className: classnames(
          "form-control",
          { "input-sm": this.props.size === "sm" },
          { "input-lg": this.props.size === "lg" }
        ),
        value: this.props.value || "",
        style: this.props.style,
        onChange: this.props.onChange ? this.handleChange : undefined,
        placeholder: this.props.placeholder,
        disabled: this.props.onChange == null
      })
    }
  }
  TextInput.initClass()
  return TextInput
})())

export { _TextInput as TextInput }

// Number input component that handles parsing and maintains state when number is invalid
let _NumberInput = (NumberInput = (function () {
  NumberInput = class NumberInput extends React.Component {
    static initClass() {
      this.propTypes = {
        decimal: PropTypes.bool.isRequired,
        value: PropTypes.number,
        onChange: PropTypes.func,
        style: PropTypes.object, // Will be merged with style of input box
        size: PropTypes.string, // "sm", "lg"
        onTab: PropTypes.func,
        onEnter: PropTypes.func,
        decimalPlaces: PropTypes.number, // Force an exact number of decimal places, rounding value as necessary
        placeholder: PropTypes.string,
        min: PropTypes.number, // The minimum number allowed
        max: PropTypes.number
      }
      // The maximum number allowed
    }

    constructor(props: any) {
      super(props)

      // Parsing happens on blur
      this.state = {
        inputText: this.formatInput(props)
      }
    }

    componentWillReceiveProps(nextProps: any) {
      // If different, override text
      if (nextProps.value !== this.props.value) {
        return this.setState({ inputText: this.formatInput(nextProps) })
      }
    }

    // Format the input based on props
    formatInput(props: any) {
      // Blank
      if (props.value == null) {
        return ""
      }

      // Integer
      if (!props.decimal) {
        return "" + Math.floor(props.value)
      }

      // Decimal
      if (props.decimalPlaces != null) {
        return props.value.toFixed(props.decimalPlaces)
      }

      return "" + props.value
    }

    focus() {
      return this.input?.focus()
    }

    handleKeyDown = (ev: any) => {
      // When pressing ENTER or TAB
      if (ev.keyCode === 13) {
        // First parse value as if blur will be done
        this.handleBlur()

        if (this.props.onEnter) {
          this.props.onEnter(ev)
          ev.preventDefault()
        }
      }

      if (ev.keyCode === 9) {
        // First parse value as if blur will be done
        this.handleBlur()

        if (this.props.onTab) {
          this.props.onTab(ev)
          // It's important to prevent the default behavior when handling tabs (or else the tab is applied after the focus change)
          return ev.preventDefault()
        }
      }
    }

    handleBlur = () => {
      // Parse and set value if valid
      if (this.isValid()) {
        const val = this.getNumericValue()
        if (val !== this.props.value) {
          return this.props.onChange?.(val)
        }
      }
    }

    getNumericValue = () => {
      let val = this.props.decimal ? parseFloat(this.state.inputText) : parseInt(this.state.inputText)
      if (isNaN(val)) {
        return null
      } else {
        // Round if necessary
        if (this.props.decimalPlaces != null) {
          val = parseFloat(val.toFixed(this.props.decimalPlaces))
        }
      }

      return val
    }

    // Check regex matching of numbers
    isValid() {
      let valid
      if (this.state.inputText.length === 0) {
        return true
      }

      if (this.props.decimal) {
        valid = this.state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) && !isNaN(parseFloat(this.state.inputText))
        if (!valid) {
          return false
        }
      } else {
        valid = this.state.inputText.match(/^-?\d+$/)

        if (!valid) {
          return false
        }
      }

      const val = this.getNumericValue()

      if (val && this.props.max != null && val > this.props.max) {
        return false
      }

      if (val && this.props.min != null && val < this.props.min) {
        return false
      }

      return true
    }

    render() {
      // Display red border if not valid
      const style = _.clone(this.props.style || {})
      style.width = style.width || "8em"
      if (!this.isValid()) {
        style.borderColor = "#a94442"
        style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)"
        style.backgroundColor = "rgba(132, 53, 52, 0.12)" // Faded red
      }

      let inputType = this.props.decimal ? "number" : "tel"

      // Special problem with Galaxy Tab 3V (SM-T116NU) missing decimal place
      if (this.props.decimal && navigator.userAgent.match(/SM-/)) {
        inputType = "text"
      }

      return R("input", {
        ref: (c) => {
          return (this.input = c)
        },
        type: inputType,
        className: `form-control ${this.props.size ? `input-${this.props.size}` : ""}`,
        lang: "en",
        style,
        value: this.state.inputText,
        onChange: this.props.onChange ? (ev) => this.setState({ inputText: ev.target.value }) : function () {},
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown,
        placeholder: this.props.placeholder,
        disabled: this.props.onChange == null
      })
    }
  }
  NumberInput.initClass()
  return NumberInput
})())

export { _NumberInput as NumberInput }

// Indented section than can be opened and closed. Defaults closed
let _CollapsibleSection = (CollapsibleSection = (function () {
  CollapsibleSection = class CollapsibleSection extends React.Component {
    static initClass() {
      this.propTypes = {
        initiallyOpen: PropTypes.bool,
        label: PropTypes.node, // Label to display
        labelMuted: PropTypes.bool, // True to mute label
        hint: PropTypes.node
      }
      // Hint to append to label. Makes label faded if only hint presented
    }

    constructor(props: any) {
      super(props)

      this.state = {
        open: props.initiallyOpen || false
      }
    }

    handleToggle = () => {
      return this.setState({ open: !this.state.open })
    }

    render() {
      return R(
        "div",
        { className: "form-group" },
        R(
          "label",
          { key: "label", onClick: this.handleToggle, style: { cursor: "pointer" } },
          this.state.open
            ? R("i", { className: `fa fa-fw fa-caret-down ${this.props.labelMuted ? "text-muted" : undefined}` })
            : R("i", { className: `fa fa-fw fa-caret-right ${this.props.labelMuted ? "text-muted" : undefined}` }),

          this.props.labelMuted ? R("span", { className: "text-muted" }, this.props.label) : this.props.label,

          this.props.hint
            ? R(
                "span",
                { className: "text-muted", style: { fontWeight: this.props.label ? "normal" : undefined } },
                this.props.label ? " - " : undefined,
                this.props.hint
              )
            : undefined
        ),

        this.state.open ? R("div", { key: "contents", style: { marginLeft: 5 } }, this.props.children) : undefined
      )
    }
  }
  CollapsibleSection.initClass()
  return CollapsibleSection
})())

export { _CollapsibleSection as CollapsibleSection }

// Displays bootstrap pills with one active
let _NavPills = (NavPills = (function () {
  NavPills = class NavPills extends React.Component {
    static initClass() {
      this.propTypes = {
        pills: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired, // Id of the tab
            label: PropTypes.node.isRequired, // Label of the tab
            href: PropTypes.string // href optional
          })
        ),

        activePill: PropTypes.string,
        onPillClick: PropTypes.func
      }
      // Called with id
    }

    render() {
      return R(
        "ul",
        { className: "nav nav-pills" },
        _.map(this.props.pills, (pill) => {
          return R(
            "li",
            { key: pill.id, className: pill.id === this.props.activePill ? "active" : "" },
            R("a", { href: pill.href, onClick: () => this.props.onPillClick?.(pill.id) }, pill.label)
          )
        })
      )
    }
  }
  NavPills.initClass()
  return NavPills
})())

export { _NavPills as NavPills }

// Button toggle component
let _Toggle = (Toggle = (function () {
  Toggle = class Toggle extends React.Component {
    static initClass() {
      this.propTypes = {
        value: PropTypes.any,
        options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.node.isRequired }))
          .isRequired,
        onChange: PropTypes.func,
        size: PropTypes.string, // "xs", "sm", "lg"
        allowReset: PropTypes.bool
      }
    }

    renderOption = (option: any, index: any) => {
      const value = this.props.value === option.value && this.props.allowReset ? null : option.value
      const btnClasses = classnames("btn", {
        "btn-default": !(this.props.value === option.value),
        "btn-primary": this.props.value === option.value,
        active: this.props.value === option.value
      })

      const props = {
        key: index,
        type: "button",
        className: btnClasses
      }

      if (!(this.props.value === option.value) || this.props.allowReset) {
        props["onClick"] = this.props.onChange ? this.props.onChange.bind(null, value) : null
      }

      return R("button", props, option.label)
    }

    render() {
      return R(
        "div",
        { className: `btn-group ${this.props.size ? `btn-group-${this.props.size}` : ""}` },
        _.map(this.props.options, this.renderOption)
      )
    }
  }
  Toggle.initClass()
  return Toggle
})())

export { _Toggle as Toggle }
