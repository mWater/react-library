import PropTypes from "prop-types"
import React from "react"
const R = React.createElement

interface LoadingComponentProps {
  /** Defaults to 100% */
  width?: any
  /** Defaults to 100% */
  height?: any
  /** Defaults to Loading... */
  label?: any
}

// Displays a spinner with loading in the center
export default class LoadingComponent extends React.Component<LoadingComponentProps> {
  static defaultProps = {
    width: "100%",
    height: "100%",
    label: R(
      "div",
      { className: "text-muted", style: { fontSize: 30 } },
      R("i", { className: "fa fa-spin fa-spinner" }),
      " Loading..."
    )
  }

  render() {
    return R(
      "div",
      {
        style: {
          width: this.props.width,
          height: this.props.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      },
      this.props.label
    )
  }
}
