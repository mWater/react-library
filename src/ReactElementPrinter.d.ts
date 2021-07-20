import React from "react"

/** Prints a React element. Requires font-awesome for spinner and jquery */
export default class ReactElementPrinter {
  /** delay: ms to wait before printing to allow elements to render */
  print(elem: React.ReactNode, options: { delay?: number; text?: string }): void
}
