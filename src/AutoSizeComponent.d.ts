import { Component } from 'react'

declare class AutoSizeComponent extends Component<{
  /** True to inject width */
  injectWidth?: boolean
  /** True to inject height */
  injectHeight?: boolean
  children: (size: { width?: number, height?: number }) => React.ReactElement<any>
}> {}

export default AutoSizeComponent