_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
ReactDOM = require 'react-dom'

DragSource = require('react-dnd').DragSource
DropTarget = require('react-dnd').DropTarget

itemTarget =
  # called when an item is dropped on this component
  drop: (props, monitor, component) ->
    dragItemIndex = monitor.getItem().index
    hoverItemIndex = props.index

    props.onReorder(dragItemIndex, hoverItemIndex)
    return {}

  # called when an item hovers over this component
  hover: (props, monitor, component) ->
    dragIndex = monitor.getItem().index
    hoverIndex = props.index

    # if the item being dragged and the current component is same do nothing
    if dragIndex == hoverIndex
      return

    # if the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    if props.constrainTo != monitor.getItem().constrainTo
      return

    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect()
    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    clientOffset = monitor.getClientOffset()
    hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
      return

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      return

    props.dragPast(dragIndex, hoverIndex)

  canDrop: (props, monitor) ->
    # if the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    props.constrainTo == monitor.getItem().constrainTo

collectTarget = (connect, monitor) ->
  return {
    connectDropTarget: connect.dropTarget()
    isOver: monitor.isOver() and monitor.canDrop()
    canDrop: monitor.canDrop()
  }

itemSource = {
  beginDrag: (props) ->
    return {
      id: props.getItemId(props.item)
      index: props.index
      constrainTo: props.constrainTo
    }
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
    onReorder: React.PropTypes.func.isRequired # callback function, called when an item is dropped, gets passed the reordered item list
    index: React.PropTypes.number.isRequired # index of the current item

    renderItem: React.PropTypes.func.isRequired # function to render the current item, passed by ReorderableListComponent
    dragPast: React.PropTypes.func.isRequired # function called when an item is drag passed another item
    constrainTo: React.PropTypes.string.isRequired # the ID of the list where reordering is constrained to
    getItemId: React.PropTypes.func.isRequired # function to return the identifier of the current item

  renderItem: (connectDragSource) ->
    opacity = if @props.isDragging then 0 else 1

    style =
      opacity: opacity

    if @props.isOver
      style.border = "1px dashed #eee"
      style.opacity = 0.6
    H.div style: style,
      @props.renderItem(@props.item, @props.index, connectDragSource)

  render: ->
    connectDropTarget = @props.connectDropTarget
    connectDragPreview = @props.connectDragPreview
    connectDragSource = @props.connectDragSource
    connectDragPreview(connectDropTarget(@renderItem(connectDragSource)))

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent)