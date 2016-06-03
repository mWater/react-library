_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
HTML5Backend = require('react-dnd-html5-backend')
SortableItem = require "./SortableItem"

class SortableContainer extends React.Component
  @propTypes:
    items: React.PropTypes.array.isRequired # items to be sorted
    updateOrder: React.PropTypes.func.isRequired #callback
    renderItem: React.PropTypes.func.isRequired
    onReorder: React.PropTypes.func.isRequired
  render: ->
    style=
      paddingLeft: 20
    H.div {style: style},
      _.map @props.items, (item, index) =>
        params =
          item: item
          index: index
          renderItem: @props.renderItem
          updateOrder: @props.updateOrder
          key: item.id
          parentIndex: @props.parentIndex
          constrainTo: @props.constrainTo
        R SortableItem, params

module.exports = DragDropContext(HTML5Backend)(SortableContainer)