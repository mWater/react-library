PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
uuid = require 'uuid'
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
ReorderableListItemComponent = require "./ReorderableListItemComponent"

# Reorderable component for nested items
# Currently supports reordering within the same list
class ReorderableListComponent extends React.Component
  @propTypes:
    items: PropTypes.array.isRequired # items to be reordered
    onReorder: PropTypes.func.isRequired # callback function, called when an item is dropped, gets passed the reordered item list
    # function which renders the item, gets passed the current item and react dnd connectors
    # signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
    renderItem: PropTypes.func.isRequired
    listId: PropTypes.string # a uniqid for the list
    getItemId: PropTypes.func.isRequired # function which should return the identifier of the current item, gets passed the current item
    element: PropTypes.object # the element to render this component as

  constructor: ->
    super

    @state = {
      order: null   # Ordered list of ids. Only present when dragging
      listId: if @props.listId then @props.listId else uuid()
    }

  @defaultProps:
    element: R 'div', null

  componentWillReceiveProps: (nextProps) ->
    newOrder = _.map nextProps.items, (item) => @props.getItemId(item)
    oldOrder = _.map @props.items, (item) => @props.getItemId(item)

    # If order changed, reset order
    if not _.isEqual(newOrder, oldOrder)
      @setState(order: null)
      
    @setState(listId: if nextProps.listId then nextProps.listId else uuid())

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
    if not @state.order
      return

    order = @state.order.slice()
    @setState(order: null)
    @props.onReorder(@fixOrder(@props.items.slice(), order))

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
    items = @props.items.slice()
    @fixOrder(items, @state.order)

    React.cloneElement(
      @props.element
      null
      _.map items, (item, index) =>
        R ReorderableListItemComponent, 
          key: @props.getItemId(item)
          item: item
          index: index
          renderItem: @props.renderItem
          constrainTo: @state.listId
          getItemId: @props.getItemId
          onPutAfter: @handlePutAfter
          onPutBefore: @handlePutBefore
          onEndDrag: @handleEndDrag
    )

module.exports = ReorderableListComponent