import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement

import * as ui from "./bootstrap"

interface NumberInputComponentProps {
  decimal?: boolean
  value?: number
  onChange: any
  /** Will be merged with style of input box */
  style?: any
  /** True to render with input-sm */
  small?: boolean
  /** Placeholder text */
  placeholder?: string
}

// Number input component that handles parsing and maintains state when number is invalid
export default class NumberInputComponent extends React.Component<NumberInputComponentProps> {
  static defaultProps = { decimal: true }

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
