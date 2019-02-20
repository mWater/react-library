import { Component } from 'react'

declare class VerticalLayoutComponent extends Component<{
  /** Height of component */
  height: number

  /** Fraction to allocate for fractional heights. Should total 1.0. Keyed by key of child */
  relativeHeights: { [key: string]: number }
}> {}

export default VerticalLayoutComponent
