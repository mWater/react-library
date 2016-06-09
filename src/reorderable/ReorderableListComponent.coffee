_ = require 'lodash'
React = require 'react'
uuid = require 'node-uuid'
H = React.DOM
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
HTML5Backend = require('react-dnd-html5-backend')
ReorderableListItemComponent = require "./ReorderableListItemComponent"
NestableDragDropContext = require "../NestableDragDropContext"

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

    @state = {
      order: null   # Ordered list of ids. Only present when dragging
      listId: if @props.listId then @props.listId else uuid.v4()
    }

  componentWillReceiveProps: (nextProps) ->
    newOrder = _.map nextProps.items, (item) => @props.getItemId(item)
    oldOrder = _.map @props.items, (item) => @props.getItemId(item)

    # If order changed, reset order
    if not _.isEqual(newOrder, oldOrder)
      @setState(order: null)
      
    @setState(listId: if nextProps.listId then nextProps.listId else uuid.v4())

  # Put beforeId right before id
  handlePutBefore: (id, beforeId) =>
    order = _.map @props.items, (item) => @props.getItemId(item)

    # Remove beforeId and splice in
    order = _.without(order, beforeId)
    index = order.indexOf(id)
    order.splice(index, 0, beforeId)

    # Set state if different
    if not _.isEqual(order, @state.order)
      @setState(order: order)

  # Put afterId right after id
  handlePutAfter: (id, afterId) =>
    order = _.map @props.items, (item) => @props.getItemId(item)

    # Remove afterId and splice in
    order = _.without(order, afterId)
    index = order.indexOf(id)
    order.splice(index + 1, 0, afterId)

    # Set state if different
    if not _.isEqual(order, @state.order)
      @setState(order: order)

  handleEndDrag: =>
    order = @state.order.slice(0)
    @setState(order: null)
    @props.onReorder(@fixOrder(@props.items, order))

  # Re-arrange items to match the order of order (list of ids)
  # If order is null, return list
  fixOrder: (items, order) =>
    if not order
      return items

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
          onEndDrag: @handleEndDrag
        R ReorderableListItemComponent, params

module.exports = NestableDragDropContext(HTML5Backend)(ReorderableListComponent)