// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let AsyncLoadComponent
import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement

// React component that asynchronously loads something into state from the props
// Handles the common case of wanting to load something but having to deal with the complexities
// of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
// To use, override isLoadNeeded to determine if a prop change requires a load
// and load to perform load and call setState with callback value.
// Sets state of loading to true/false appropriately
// DO NOT call @setState or reference @props in load
export default AsyncLoadComponent = class AsyncLoadComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }

    // Keep track if mounted
    this._mounted = false

    // Keep track of load number started and completed to ignore old ones
    this._loadSeqStarted = 0
    this._loadSeqCompleted = 0
  }

  isLoading = () => {
    return this.state.loading
  }

  // Override to determine if a load is needed. Not called on mounting
  isLoadNeeded(newProps, oldProps) {
    throw new Error("Not implemented")
  }

  // Call callback with state changes
  load(props, prevProps, callback) {
    throw new Error("Not implemented")
  }

  // Call to force load
  forceLoad() {
    return this._performLoad(this.props, this.props)
  }

  _performLoad(newProps, oldProps) {
    this._loadSeqStarted += 1

    const seq = this._loadSeqStarted

    // Create callback
    const callback = (state) => {
      // Check if unmounted
      if (!this._mounted) {
        return
      }

      // Check if out of date
      if (seq < this._loadSeqCompleted) {
        return
      }

      this._loadSeqCompleted = seq

      // Apply state
      this.setState(state)

      // Check if latest
      if (seq === this._loadSeqStarted) {
        return this.setState({ loading: false })
      }
    }

    return this.setState({ loading: true }, () => {
      return this.load(newProps, oldProps, callback)
    })
  }

  componentWillMount() {
    this._mounted = true
    return this._performLoad(this.props, {})
  }

  componentWillReceiveProps(nextProps) {
    if (this.isLoadNeeded(nextProps, this.props)) {
      return this._performLoad(nextProps, this.props)
    }
  }

  componentWillUnmount() {
    return (this._mounted = false)
  }
}
