_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
ReactDOM = require 'react-dom'

DragSource = require('react-dnd').DragSource
DropTarget = require('react-dnd').DropTarget

itemTarget =
  # Called when an item hovers over this component
  hover: (props, monitor, component) ->
    # Hovering over self does nothing
    hoveringId = monitor.getItem().id
    myId = props.getItemId(props.item)
    if hoveringId == myId
      return

    # If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    if props.constrainTo != monitor.getItem().constrainTo
      return

    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect()

    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    clientOffset = monitor.getClientOffset()

    # Get position within hovered item
    hoverClientY = clientOffset.y - hoverBoundingRect.top

    # If is in top half, and is within the height of the dragged item
    if (hoverClientY < hoverMiddleY) and (hoverClientY < monitor.getItem().height)
      # Put before
      props.onPutBefore(myId, hoveringId)
      return

    # If is in bottom half, and is within the height of the dragged item
    if (hoverClientY > hoverMiddleY) and (hoverClientY > hoverBoundingRect.height - monitor.getItem().height)
      # Put before
      props.onPutAfter(myId, hoveringId)
      return

  canDrop: (props, monitor) ->
    # If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    props.constrainTo == monitor.getItem().constrainTo

collectTarget = (connect, monitor) ->
  return {
    connectDropTarget: connect.dropTarget()
    isOver: monitor.isOver() and monitor.canDrop()
    canDrop: monitor.canDrop()
  }

itemSource = {
  beginDrag: (props, monitor, component) ->
    return {
      id: props.getItemId(props.item)
      constrainTo: props.constrainTo
      # Save height of dragged component 
      height: ReactDOM.findDOMNode(component).getBoundingClientRect().height
    }

  isDragging: (props, monitor) ->
    return props.getItemId(props.item) == monitor.getItem().id

  endDrag: (props, monitor, component) ->
    props.onEndDrag()
}

collectSource = (connect, monitor) ->
  return {
    connectDragSource: connect.dragSource()
    connectDragPreview: connect.dragPreview()
    isDragging: monitor.isDragging()
  }

class ReorderableListItemComponent extends React.Component
  @propTypes:
    item: React.PropTypes.object.isRequired # the item from reorderable list
    isDragging: React.PropTypes.bool.isRequired # internally used for tracking if an item is being dragged
    isOver: React.PropTypes.bool.isRequired # internally used to check if an item is over the current component
    canDrop: React.PropTypes.bool.isRequired # internally used as a flag it the item being dragged can be dropped in place of the item it is over
    connectDragSource: React.PropTypes.func.isRequired # the drag source connector, supplied by React DND
    connectDropTarget: React.PropTypes.func.isRequired # the drop target connector, supplied by React DND
    connectDragPreview: React.PropTypes.func.isRequired # the drag preview connector, supplied by React DND
    onPutBefore: React.PropTypes.func.isRequired # Call with (id, beforeId)
    onPutAfter: React.PropTypes.func.isRequired # Call with (id, afterId)
    onEndDrag: React.PropTypes.func.isRequired  # Called when drag is complete
    index: React.PropTypes.number.isRequired # index of the current item

    renderItem: React.PropTypes.func.isRequired # function to render the current item, passed by ReorderableListComponent
    constrainTo: React.PropTypes.string.isRequired # the ID of the list where reordering is constrained to
    getItemId: React.PropTypes.func.isRequired # function to return the identifier of the current item

  render: ->
    @props.renderItem(@props.item, @props.index, @props.connectDragSource, @props.connectDragPreview, @props.connectDropTarget)

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent)
