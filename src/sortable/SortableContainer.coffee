_ = require 'lodash'
uuid = require 'node-uuid'
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

  reorder: (dragIndex, hoverIndex) =>
    items = @props.items.splice(0)

    draggedItem = items[dragIndex]

    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, draggedItem);
    @props.updateOrder(items)

  render: ->
    id = uuid.v4()
    style=
      paddingLeft: 20
    H.div {style: style},
      _.map @props.items, (item, index) =>
        params =
          item: item
          index: index
          renderItem: @props.renderItem
          updateOrder: @reorder
          key: item.id
          constrainTo: id
        R SortableItem, params

module.exports = DragDropContext(HTML5Backend)(SortableContainer)