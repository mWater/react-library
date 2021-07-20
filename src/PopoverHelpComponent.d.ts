import { default as React, Component, ReactNode } from "react"

/** Shows a popover when help icon is clicked. Needs bootstrap */
export default class PopoverHelpComponent extends Component<{
  placement?: "top" | "right" | "bottom" | "left"

  /** hover is default */
  trigger?: "hover" | "click"

  /** Override content */
  content?: ReactNode
}> {}
