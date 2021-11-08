import React, { Component } from "react"
import ReactDOM from "react-dom"
const R = React.createElement

/** React component that asynchronously loads something into state from the props
 * Handles the common case of wanting to load something but having to deal with the complexities
 * of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
 * To use, override isLoadNeeded to determine if a prop change requires a load
 * and load to perform load and call setState with callback value.
 * Sets state of loading to true/false appropriately (automatically part of state)
 * DO NOT call setState or reference props in load
 */
export default abstract class AsyncLoadComponent<P, S extends { loading: boolean }> extends Component<P, S> {
  _mounted: boolean
  _loadSeqStarted: number
  _loadSeqCompleted: number

  constructor(props: P) {
    super(props)

    this.state = {
      loading: false
    } as S

    // Keep track if mounted
    this._mounted = false

    // Keep track of load number started and completed to ignore old ones
    this._loadSeqStarted = 0
    this._loadSeqCompleted = 0
  }

  /** Check if mid-loading */
  isLoading = () => {
    return this.state.loading
  }

  /** Override to determine if a load is needed. Not called on mounting */
  abstract isLoadNeeded(newProps: P, oldProps: P): boolean

  /** Call callback with state changes */
  abstract load(props: P, prevProps: P, callback: (stateUpdate: Partial<S>) => void): void

  /** Call to force load */
  forceLoad(): void {
    this._performLoad(this.props, this.props)
  }

  _performLoad(newProps: any, oldProps: any) {
    this._loadSeqStarted += 1

    const seq = this._loadSeqStarted

    // Create callback
    const callback = (state: any) => {
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

  componentWillReceiveProps(nextProps: any) {
    if (this.isLoadNeeded(nextProps, this.props)) {
      return this._performLoad(nextProps, this.props)
    }
  }

  componentWillUnmount() {
    return (this._mounted = false)
  }
}
