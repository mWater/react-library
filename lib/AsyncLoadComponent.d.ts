import { Component } from 'react'

/** React component that asynchronously loads something into state from the props
 * Handles the common case of wanting to load something but having to deal with the complexities
 * of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
 * To use, override isLoadNeeded to determine if a prop change requires a load
 * and load to perform load and call setState with callback value.
 * Sets state of loading to true/false appropriately (automatically part of state)
 * DO NOT call setState or reference props in load
 */
export default class AsyncLoadComponent<P, S> extends Component<P, S> {
  /** Override to determine if a load is needed. Not called on mounting */
  isLoadNeeded(newProps: P, oldProps: P): boolean

  /** Call callback with state changes */
  load(props: P, prevProps: P, callback: (stateUpdate: Partial<S>) => void): void

  /** Call to force load */
  forceLoad(): void

  /** Check if mid-loading */
  isLoading(): boolean
}
