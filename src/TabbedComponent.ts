// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let TabbedComponent
import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement

// Simple bootstrap tabbed component
export default TabbedComponent = (function () {
  TabbedComponent = class TabbedComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        tabs: PropTypes.array.isRequired, // Array of { id, label, elem, onRemove (optional) }
        initialTabId: PropTypes.string, // Initially selected id of tab
        tabId: PropTypes.string, // Selected id of tab
        onAddTab: PropTypes.func, // Set to have a plus to add a tab
        onTabClick: PropTypes.func
      }
      // Set to be called back when a tab is clicked (tabId) instead of setting internal state
    }

    constructor(props: any) {
      super(props)
      this.state = { tabId: this.props.initialTabId }
    }

    handleClick = (tabId: any) => {
      if (this.props.onTabClick != null) {
        return this.props.onTabClick(tabId)
      } else {
        return this.setState({ tabId })
      }
    }

    handleRemove = (tab: any, ev: any) => {
      ev.stopPropagation()
      return tab.onRemove()
    }

    renderTab = (tab: any) => {
      let tabId
      if (this.props.tabId != null) {
        ;({ tabId } = this.props)
      } else {
        ;({ tabId } = this.state)
      }
      return R(
        "li",
        { key: tab.id, className: tabId === tab.id ? "active" : undefined },
        R(
          "a",
          { onClick: this.handleClick.bind(null, tab.id), style: { cursor: "pointer" } },
          tab.label,
          tab.onRemove
            ? R(
                "button",
                { type: "button", className: "btn btn-xs btn-link", onClick: this.handleRemove.bind(null, tab) },
                R("span", { className: "fa fa-times" })
              )
            : undefined
        )
      )
    }

    render() {
      let tabId
      if (this.props.tabId != null) {
        ;({ tabId } = this.props)
      } else {
        ;({ tabId } = this.state)
      }
      const currentTab = _.findWhere(this.props.tabs, { id: tabId })

      return R(
        "div",
        null,
        R(
          "ul",
          { key: "tabs", className: "nav nav-tabs", style: { marginBottom: 10 } },
          _.map(this.props.tabs, this.renderTab),
          this.props.onAddTab
            ? R(
                "li",
                { key: "_add" },
                R(
                  "a",
                  { onClick: this.props.onAddTab, style: { cursor: "pointer" } },
                  R("i", { className: "fa fa-plus" })
                )
              )
            : undefined
        ),

        R("div", { key: "currentTab" }, currentTab ? currentTab.elem : undefined)
      )
    }
  }
  TabbedComponent.initClass()
  return TabbedComponent
})()
