import React from "react"
const R = React.createElement

export interface VerticalLayoutComponentProps {
  /** Height of component */
  height: number

  /** Fraction to allocate for fractional heights. Should total 1.0. Keyed by key of child */
  relativeHeights: { [key: string]: number }
}

interface VerticalLayoutComponentState {
  availableHeight: any
}

// Lays out divs vertically, allowing fractional allocation combined with auto-sized ones
// Children must all have keys
// Children will be cloned with height: prop set in case of fractional ones
export default class VerticalLayoutComponent extends React.Component<
  VerticalLayoutComponentProps,
  VerticalLayoutComponentState
> {
  constructor(props: any) {
    super(props)
    this.state = { availableHeight: 0 }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.height !== this.props.height) {
      return this.recalculateSize(nextProps)
    }
  }

  componentDidMount() {
    return this.recalculateSize(this.props)
  }

  recalculateSize = (props: any) => {
    // Calculate available height
    let availableHeight = props.height

    for (let child of props.children) {
      if (!child) {
        continue
      }
      if (props.relativeHeights[child.key]) {
        continue
      }

      const node = this[child.key]
      availableHeight -= node.offsetHeight
    }

    return this.setState({ availableHeight })
  }

  // Get a subcomponent
  getComponent(key: any) {
    return this[key]
  }

  render() {
    // Calculate scaling
    return R(
      "div",
      { style: { height: this.props.height } },
      React.Children.map(this.props.children, (child: any) => {
        if (!child) {
          return
        }

        // If variable height
        if (child.key && this.props.relativeHeights[child.key]) {
          // If available height is known, render variable
          if (this.state.availableHeight) {
            const height = this.state.availableHeight * this.props.relativeHeights[child.key]
            return R(
              "div",
              { style: { height, position: "relative" } },
              R(
                "div",
                { style: { height, overflowY: "auto" } },
                React.cloneElement(child, {
                  height,
                  ref: (c: any) => {
                    this[child.key!] = c
                    // Call existing ref
                    if (child.ref) {
                      return child.ref(c)
                    }
                  }
                })
              )
            )
          }
          // Otherwise don't show until available height is known
          return null
        }
        return React.cloneElement(child, {
          ref: (c: any) => {
            return (this[child.key] = c)
          }
        })
      })
    )
  }
}
