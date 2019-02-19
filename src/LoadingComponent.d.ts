import { ReactNode, Component } from 'react'

declare class LoadingComponent extends Component<{
  /** Defaults to 100% */
  width?: string | number 
  /** Defaults to 100% */
  height?: string | number 
  /** Defaults to Loading... */
  label?: ReactNode
}> {}

export default LoadingComponent