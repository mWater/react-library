import React from "react"
import ReactDOM from "react-dom"
import ReactTestUtils from "react-dom/test-utils"
const R = React.createElement
import _ from "lodash"

// Test component that can be created, have its element changed, have clicks and other actions simulated
// Used for unit testing React components
export default class TestComponent {
  div: any
  comp: any

  constructor(elem: any) {
    this.div = document.createElement("div")
    this.comp = ReactDOM.render(elem, this.div)
  }

  setElement(elem: any) {
    return ReactDOM.render(elem, this.div)
  }

  getComponent() {
    return this.comp
  }

  destroy() {
    return ReactDOM.unmountComponentAtNode(this.div)
  }

  // Finds DOM node by pattern (optional)
  findDOMNodesByText(pattern: any) {
    const matches: any = []

    function findRecursively(node: any): any {
      // Recurse to children
      if (node.nodeType === 1) {
        return (() => {
          const result = []
          for (let subnode of node.childNodes) {
            // Check text match
            if (subnode.nodeType === 3 && subnode.nodeValue.match(pattern)) {
              matches.push(node)
            }

            result.push(findRecursively(subnode))
          }
          return result
        })()
      }
    }

    findRecursively(ReactDOM.findDOMNode(this.comp))
    return matches
  }

  // Finds a DOM node by pattern
  findDOMNodeByText(pattern: any) {
    return this.findDOMNodesByText(pattern)[0]
  }

  // Find a subcomponent by a pattern (deprecated)
  findComponentByText(pattern: any) {
    return this.findDOMNodesByText(pattern)
  }

  // Find input field
  findInput() {
    return ReactTestUtils.findRenderedDOMComponentWithTag(this.comp, "input")
  }

  findComponentById(id: any) {
    return ReactTestUtils.findAllInRenderedTree(this.comp, (c: any) => c.id === id)[0]
  }

  static click(comp: any) {
    return ReactTestUtils.Simulate.click(comp)
  }
  static pressEnter(comp: any) {
    return ReactTestUtils.Simulate.keyDown(comp, { key: "Enter", keyCode: 13, which: 13 })
  }
  static pressTab(comp: any) {
    return ReactTestUtils.Simulate.keyDown(comp, { key: "Tab", keyCode: 9, which: 9 })
  }
  static changeValue(comp: any, value: any) {
    comp.value = value
    return ReactTestUtils.Simulate.change(comp)
  }
}
