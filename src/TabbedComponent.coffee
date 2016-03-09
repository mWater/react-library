React = require 'react'
H = React.DOM

# Simple bootstrap tabbed component
module.exports = class TabbedComponent extends React.Component
  @propTypes:
    tabs: React.PropTypes.array.isRequired # Array of { id, label, elem }
    initialTabId: React.PropTypes.string # Initially selected id of tab
    tabId: React.PropTypes.string # Selected id of tab
    onAddTab: React.PropTypes.func    # Set to have a plus to add a tab
    onTabClick: React.PropTypes.func    # Set to be called back when a tab is clicked (tabId) instead of setting internal state

  constructor: ->
    super
    @state = { tabId: @props.initialTabId }

  handleClick: (tabId) =>
    if @props.onTabClick?
      @props.onTabClick(tabId)
    else
      @setState(tabId: tabId)

  renderTab: (tab) =>
    if @props.tabId?
      tabId = @props.tabId
    else
      tabId =  @state.tabId
    H.li key: tab.id, className: (if tabId == tab.id then "active"),
      H.a onClick: @handleClick.bind(null, tab.id),
        tab.label

  render: ->
    if @props.tabId?
      tabId = @props.tabId
    else
      tabId =  @state.tabId
    currentTab = _.findWhere(@props.tabs, id: tabId)

    H.div null,
      H.ul key: "tabs", className: "nav nav-tabs", style: { marginBottom: 10 },
        _.map(@props.tabs, @renderTab)
        if @props.onAddTab
          H.li key: "_add", 
            H.a onClick: @props.onAddTab,
              H.span className: "glyphicon glyphicon-plus"

      H.div key: "currentTab", 
        if currentTab
          currentTab.elem
