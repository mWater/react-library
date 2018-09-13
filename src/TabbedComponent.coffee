PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
R = React.createElement

# Simple bootstrap tabbed component
module.exports = class TabbedComponent extends React.Component
  @propTypes:
    tabs: PropTypes.array.isRequired # Array of { id, label, elem, onRemove (optional) }
    initialTabId: PropTypes.string # Initially selected id of tab
    tabId: PropTypes.string # Selected id of tab
    onAddTab: PropTypes.func    # Set to have a plus to add a tab
    onTabClick: PropTypes.func    # Set to be called back when a tab is clicked (tabId) instead of setting internal state

  constructor: ->
    super
    @state = { tabId: @props.initialTabId }

  handleClick: (tabId) =>
    if @props.onTabClick?
      @props.onTabClick(tabId)
    else
      @setState(tabId: tabId)

  handleRemove: (tab, ev) =>
    ev.stopPropagation()
    tab.onRemove()

  renderTab: (tab) =>
    if @props.tabId?
      tabId = @props.tabId
    else
      tabId =  @state.tabId
    R 'li', key: tab.id, className: (if tabId == tab.id then "active"),
      R 'a', onClick: @handleClick.bind(null, tab.id), style: { cursor: "pointer" },
        tab.label
        if tab.onRemove
          R 'button', type: "button", className: "btn btn-xs btn-link", onClick: @handleRemove.bind(null, tab),
            R 'span', className: "fa fa-times"

  render: ->
    if @props.tabId?
      tabId = @props.tabId
    else
      tabId =  @state.tabId
    currentTab = _.findWhere(@props.tabs, id: tabId)

    R 'div', null,
      R 'ul', key: "tabs", className: "nav nav-tabs", style: { marginBottom: 10 },
        _.map(@props.tabs, @renderTab)
        if @props.onAddTab
          R 'li', key: "_add", 
            R 'a', onClick: @props.onAddTab, style: { cursor: "pointer" },
              R 'span', className: "glyphicon glyphicon-plus"

      R 'div', key: "currentTab", 
        if currentTab
          currentTab.elem
