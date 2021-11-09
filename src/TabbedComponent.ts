import PropTypes from "prop-types"
import _ from "lodash"
import React, { ReactNode } from "react"
const R = React.createElement

export interface TabbedComponentProps {
  /** Array of { id, label, elem, onRemove (optional) } */
  tabs: Array<{ id: string; label: ReactNode; elem: ReactNode; onRemove?: () => void }>

  /** Initially selected id of tab */
  initialTabId?: string

  /** Selected id of tab if controlled component */
  tabId?: string

  /** Set to have a plus to add a tab */
  onAddTab?: () => void

  /** Set to be called back when a tab is clicked (tabId) instead of setting internal state */
  onTabClick?: (tabId: string) => void
}

// Simple bootstrap tabbed component
export default class TabbedComponent extends React.Component<TabbedComponentProps, { tabId?: string }> {
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
      { key: tab.id, className: "nav-item" },
      R(
        "a",
        {
          onClick: this.handleClick.bind(null, tab.id),
          style: { cursor: "pointer" },
          className: tabId === tab.id ? "nav-link active" : "nav-link"
        },
        tab.label,
        tab.onRemove
          ? R(
              "button",
              { type: "button", className: "btn btn-sm btn-link", onClick: this.handleRemove.bind(null, tab) },
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
              { key: "_add", className: "nav-item" },
              R(
                "a",
                { className: "nav-link", onClick: this.props.onAddTab, style: { cursor: "pointer" } },
                R("i", { className: "fa fa-plus" })
              )
            )
          : undefined
      ),

      R("div", { key: "currentTab" }, currentTab ? currentTab.elem : undefined)
    )
  }
}
