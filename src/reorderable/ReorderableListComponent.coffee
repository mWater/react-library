_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
HTML5Backend = require('react-dnd-html5-backend')
ReorderableListItemComponent = require "./ReorderableListItemComponent"

# Reorderable component for nested items
# Currently supports reordering within the same list
class ReorderableListComponent extends React.Component
  @propTypes:
    items: React.PropTypes.array.isRequired # items to be reordered
    onReorder: React.PropTypes.func.isRequired # callback function, called when an item is dropped, gets passed the reordered item list
    renderItem: React.PropTypes.func.isRequired # function which renders the item, gets passed the current item
    listId: React.PropTypes.string.isRequired # a uniqid for the list
    getItemId: React.PropTypes.func.isRequired # function which should return the identifier of the current item, gets passed the current item

  constructor: ->
    super
    order = _.map @props.items, (item) => @props.getItemId(item)
    @state = {
      initialOrder: order
      order: order
      dropItem: null
    }

  dragPast: (dragIndex, hoverIndex) =>
    if @state.dropItem == hoverIndex
      return

    order = @state.initialOrder.slice(0)

    draggedItem = order[dragIndex]

    order.splice(dragIndex, 1);
    order.splice(hoverIndex, 0, draggedItem);

    @setState(order: order, dropItem: hoverIndex)

  reorder: (dragIndex, hoverIndex) =>
    items = @props.items.slice(0)
    draggedItem = items[dragIndex]

    items.splice(dragIndex, 1)
    items.splice(hoverIndex, 0, draggedItem)

    order = _.map items, (item) => @props.getItemId(item)
    @setState(initialOrder: order, dropItem: null, order: order)
    @props.onReorder(items)

  fixOrder: (items) =>
    items.sort (left, right) =>
      if @state.order.indexOf(@props.getItemId(left)) < @state.order.indexOf(@props.getItemId(right))
        return -1
      if @state.order.indexOf(@props.getItemId(left)) > @state.order.indexOf(@props.getItemId(right))
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
          onReorder: @reorder
          key: @props.getItemId(item)
          constrainTo: @props.listId
          dragPast: @dragPast
          getItemId: @props.getItemId
        R ReorderableListItemComponent, params

module.exports = DragDropContext(HTML5Backend)(ReorderableListComponent)