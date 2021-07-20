// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let NumberInputComponent
import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement

import * as ui from "./bootstrap"

// Number input component that handles parsing and maintains state when number is invalid
export default NumberInputComponent = (function () {
  NumberInputComponent = class NumberInputComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        decimal: PropTypes.bool,
        value: PropTypes.number,
        onChange: PropTypes.func.isRequired,

        style: PropTypes.object, // Will be merged with style of input box
        small: PropTypes.bool, // True to render with input-sm
        placeholder: PropTypes.string // Placeholder text
      }

      this.defaultProps = { decimal: true }
    }

    render() {
      return React.createElement(ui.NumberInput, {
        decimal: this.props.decimal,
        value: this.props.value,
        onChange: this.props.onChange,
        style: this.props.style,
        size: this.props.small ? "sm" : null
      })
    }
  }
  NumberInputComponent.initClass()
  return NumberInputComponent
})()
