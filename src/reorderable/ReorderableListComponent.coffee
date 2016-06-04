_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
HTML5Backend = require('react-dnd-html5-backend')
ReorderableListItemComponent = require "./ReorderableListItemComponent"

class ReorderableListComponent extends React.Component
  @propTypes:
    items: React.PropTypes.array.isRequired # items to be sorted
    onReorder: React.PropTypes.func.isRequired #callback
    renderItem: React.PropTypes.func.isRequired
    listId: React.PropTypes.string.isRequired
    getItemIdentifier: React.PropTypes.func.isRequired

  constructor: ->
    super
    order = _.map @props.items, (item) => @props.getItemIdentifier(item)
    @state = {
      initialOrder: order
      order: order
      dropItem: null
    }

  dragPast: (dragIndex, hoverIndex) =>
    if @state.dropItem == hoverIndex
      return

    items = @state.initialOrder.slice(0)

    draggedItem = items[dragIndex]

    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, draggedItem);

    @setState(order: items, dropItem: hoverIndex)

  reorder: (dragIndex, hoverIndex) =>
    items = @props.items.slice(0)
    draggedItem = items[dragIndex]

    items.splice(dragIndex, 1)
    items.splice(hoverIndex, 0, draggedItem)

    order = _.map items, (item) => @props.getItemIdentifier(item)
    @setState(initialOrder: order, dropItem: null, order: order)
    @props.onReorder(items)

  fixOrder: (items) =>
    items.sort (left, right) =>
      if @state.order.indexOf(@props.getItemIdentifier(left)) < @state.order.indexOf(@props.getItemIdentifier(right))
        return -1
      if @state.order.indexOf(@props.getItemIdentifier(left)) > @state.order.indexOf(@props.getItemIdentifier(right))
        return 1
      return 0

  render: ->
    style=
      paddingLeft: 20

    items = @props.items.slice(0)
    @fixOrder(items)

    H.div {style: style},
      _.map items, (item, index) =>
        params =
          item: item
          index: index
          renderItem: @props.renderItem
          updateOrder: @reorder
          key: @props.getItemIdentifier(item)
          constrainTo: @props.listId
          dragPast: @dragPast
          getItemIdentifier: @props.getItemIdentifier
        R ReorderableListItemComponent, params

module.exports = DragDropContext(HTML5Backend)(ReorderableListComponent)