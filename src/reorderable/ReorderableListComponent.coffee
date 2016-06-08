_ = require 'lodash'
React = require 'react'
uuid = require 'node-uuid'
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
    listId: React.PropTypes.string # a uniqid for the list
    getItemId: React.PropTypes.func.isRequired # function which should return the identifier of the current item, gets passed the current item

  constructor: ->
    super

    order = _.map @props.items, (item) => @props.getItemId(item)
    @state = {
      initialOrder: order
      order: order
      listId: if @props.listId then @props.listId else uuid.v4()
    }

  componentWillReceiveProps: (nextProps) ->
    order = _.map nextProps.items, (item) => @props.getItemId(item)
    if not _.isEqual(order, @state.initialOrder)
      @setState(initialOrder: order, order: order)

    if nextProps.listId
      @setState(listId: nextProps.listId)

  # Put beforeId right before id
  handlePutBefore: (id, beforeId, isDrop) =>
    order = @state.initialOrder.slice()

    # Remove beforeId and splice in
    order = _.without(order, beforeId)
    index = order.indexOf(id)
    order.splice(index, 0, beforeId)

    @setState(order: order)

    # Make permanent
    if isDrop
      @props.onReorder(@fixOrder(@props.items, order))

  # Put afterId right after id
  handlePutAfter: (id, afterId, isDrop) =>
    order = @state.initialOrder.slice()

    # Remove afterId and splice in
    order = _.without(order, afterId)
    index = order.indexOf(id)
    order.splice(index + 1, 0, afterId)

    @setState(order: order)

    # Make permanent
    if isDrop
      @props.onReorder(@fixOrder(@props.items, order))

  # Re-arrange items to match the order of order (list of ids)
  fixOrder: (items, order) =>
    items.sort (left, right) =>
      if order.indexOf(@props.getItemId(left)) < order.indexOf(@props.getItemId(right))
        return -1
      if order.indexOf(@props.getItemId(left)) > order.indexOf(@props.getItemId(right))
        return 1
      return 0

  render: ->
    style=
      paddingLeft: 20

    items = @props.items.slice()
    @fixOrder(items, @state.order)

    H.div {style: style},
      _.map items, (item, index) =>
        params =
          item: item
          index: index
          renderItem: @props.renderItem
          key: @props.getItemId(item)
          constrainTo: @state.listId
          getItemId: @props.getItemId
          onPutAfter: @handlePutAfter
          onPutBefore: @handlePutBefore
        R ReorderableListItemComponent, params

module.exports = DragDropContext(HTML5Backend)(ReorderableListComponent)