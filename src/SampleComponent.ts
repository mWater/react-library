// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let SampleComponent
import React from "react"
import SplitPane from "./SplitPane"
import AutoSizeComponent from "./AutoSizeComponent"
const R = React.createElement

// This is a nice sample component
export default SampleComponent = class SampleComponent extends React.Component {
  render() {
    const style1 = {
      height: 300,
      width: 300,
      border: "1px solid #000"
    }

    return React.createElement(SplitPane, { split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 100 }, [
      //      R 'div', null
      R(AutoSizeComponent, { injectWidth: true, injectHeight: true }, R("div", null, "width only")),
      React.createElement(SplitPane, { split: "horizontal", firstPaneSize: "20%", minFirstPaneSize: 100 }, [
        R(AutoSizeComponent, { injectWidth: true, injectHeight: true }, R("div", { height: 300 }, "height")),
        React.createElement(SplitPane, { split: "vertical", firstPaneSize: 300, minFirstPaneSize: 200 }, [
          R(
            AutoSizeComponent,
            { injectWidth: true, injectHeight: true },
            R("div", { height: 300 }, "width and height")
          ),
          R("div", null)
        ])
      ])
    ])
  }
}
