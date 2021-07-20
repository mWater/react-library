import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement

// Component which sets its height to automatically fill all remaining vertical space
export default class FillDownwardComponent extends React.Component<{}, { height: number | null }> {
  self: any

  constructor(props: any) {
    super(props)
    this.state = { height: null }
  }

  componentDidMount() {
    // Listen for changes
    window.addEventListener("resize", this.updateSize)
    return this.updateSize()
  }

  componentWillUnmount() {
    // Stop listening to resize events
    return window.removeEventListener("resize", this.updateSize)
  }

  updateSize = () => {
    const { self } = this
    if (!self) {
      return
    }

    // Get vertical position of self
    const vpos = self.getBoundingClientRect().top + window.scrollY

    // Get vertical space remaining
    const height = window.innerHeight - vpos

    // Limit to 50 at smallest
    return this.setState({ height: Math.max(height, 50) })
  }

  render() {
    // If height is not known, render placeholder
    if (!this.state.height) {
      return R("div", {
        style: { height: 100, position: "relative" },
        ref: (c) => {
          return (this.self = c)
        }
      })
    }

    // Render with correct height
    return R(
      "div",
      {
        style: { height: this.state.height, position: "relative" },
        ref: (c) => {
          return (this.self = c)
        }
      },
      this.props.children
    )
  }
}
