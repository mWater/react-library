import React from "react"
const R = React.createElement

export interface FillDownwardComponentProps {
  /** Optional bottom margin */
  margin?: number
}

/** Component which sets its height to automatically fill all remaining vertical space, minus an optional margin */
export default class FillDownwardComponent extends React.Component<FillDownwardComponentProps, { height: number | null }> {
  self: any

  constructor(props: FillDownwardComponentProps) {
    super(props)
    this.state = { height: null }
  }

  componentDidMount() {
    // Listen for changes
    window.addEventListener("resize", this.updateSize)
    this.updateSize()
  }

  componentWillUnmount() {
    // Stop listening to resize events
    window.removeEventListener("resize", this.updateSize)
  }

  updateSize = () => {
    const { self } = this
    if (!self) {
      return
    }

    // Get vertical position of self
    const vpos = self.getBoundingClientRect().top + window.scrollY

    // Get vertical space remaining
    const height = window.innerHeight - vpos - (this.props.margin || 0)

    // Limit to 50 at smallest
    this.setState({ height: Math.max(height, 50) })
  }

  render() {
    // If height is not known, render placeholder
    if (!this.state.height) {
      return R("div", {
        style: { height: 100, position: "relative" },
        ref: (c) => {
          this.self = c
        }
      })
    }

    // Render with correct height
    return R(
      "div",
      {
        style: { height: this.state.height, position: "relative" },
        ref: (c) => {
          this.self = c
        }
      },
      this.props.children
    )
  }
}
