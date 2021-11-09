import React, { ReactNode } from "react"
const R = React.createElement

export interface LoadingComponentProps {
  /** Defaults to 100% */
  width?: string | number
  /** Defaults to 100% */
  height?: string | number
  /** Defaults to Loading... */
  label?: ReactNode
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
