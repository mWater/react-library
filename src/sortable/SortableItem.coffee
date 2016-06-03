_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement

DragSource = require('react-dnd').DragSource
DropTarget = require('react-dnd').DropTarget

itemTarget =
  drop: (props, monitor, component) ->
    dragItemIndex = monitor.getItem().index
    hoverItemIndex = props.index

    props.updateOrder(dragItemIndex, hoverItemIndex)
    return {}

  canDrop: (props, monitor) ->
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
      id: props.item
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

class SortableItem extends React.Component
  @propTypes:
    item: React.PropTypes.object.isRequired #the sortable item
    parentId: React.PropTypes.string # parent item id to constrain ordering
    isDragging: React.PropTypes.bool.isRequired #react dnd prop
    isOver: React.PropTypes.bool.isRequired #react dnd prop
    canDrop: React.PropTypes.bool.isRequired #react dnd prop
    connectDragSource: React.PropTypes.func.isRequired
    connectDragSource: React.PropTypes.func.isRequired
    connectDragPreview: React.PropTypes.func.isRequired
    updateOrder: React.PropTypes.func.isRequired #callback when an item is dropped
    index: React.PropTypes.number.isRequired

    renderItem: React.PropTypes.func.isRequired
    constrainTo: React.PropTypes.string

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

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(SortableItem)