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
    
    hoveringId = monitor.getItem().id
    myId = props.getItemId(props.item)
    
    sourceList = monitor.getItem().listId
    targetList = props.listId
    
    if not ReactDOM.findDOMNode(component)
      return
    
    # console.log ReactDOM.findDOMNode(component).firstChild
    
    targetBoundingRect = ReactDOM.findDOMNode(component).firstChild.getBoundingClientRect()

    hoverMiddleY = (targetBoundingRect.bottom - targetBoundingRect.top) / 2
    clientOffset = monitor.getClientOffset()

    # Get position within hovered item
    hoverClientY = clientOffset.y - targetBoundingRect.top

    # a weired thing allow to drop over itself when state is refreshed with new list but drag is not released
    # causing dragged items to disappear
    if hoveringId == targetList
      return

    # Hovering over self does nothing
    if hoveringId == myId
      return
      
      # todo: this introduces lots of weiredness, disable for now
      # if clientOffset.x > targetBoundingRect.left + 40 
      #   console.log "Make child of previous sibling"
      #   props.onIndent(sourceList, myId)
      #   return
      # return
      
    # If its not hovering over this component, may be hovering over a child  
    if not monitor.isOver(shallow: true)
      return
    
    # If is at the right than the far left then add to its children instead
    # To add an item to empty children
    if clientOffset.x > targetBoundingRect.left + 40 
      # if _.isEmpty props.item.children 
      console.log "Put indented", sourceList, myId ,hoveringId
      props.onPutAfter(sourceList, myId ,hoveringId, null)
      return

    # If is in top half, and is within the height of the dragged item
    if (hoverClientY < hoverMiddleY) and (hoverClientY < monitor.getItem().height)
      # Put before
      console.log "Put before", sourceList, targetList ,hoveringId, myId
      props.onPutBefore(sourceList, targetList , hoveringId,myId)
      return

    # If is in bottom half, and is within the height of the dragged item
    if (hoverClientY > hoverMiddleY) and (hoverClientY > targetBoundingRect.height - monitor.getItem().height)
      # Put before
      console.log "Put after", sourceList, targetList, hoveringId, myId
      props.onPutAfter(sourceList, targetList, hoveringId,myId)
      return

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
      # Save height of dragged component 
      height: ReactDOM.findDOMNode(component).getBoundingClientRect().height
      listId: props.listId
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

class NestedReorderableListItemComponent extends React.Component
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
    onIndent: React.PropTypes.func.isRequired # Called when item is dragged within itself with some indentation
    index: React.PropTypes.number.isRequired # index of the current item

    renderItem: React.PropTypes.func.isRequired # function to render the current item, passed by ReorderableListComponent
    getItemId: React.PropTypes.func.isRequired # function to return the identifier of the current item
    children: React.PropTypes.node
    listId: React.PropTypes.string

  render: ->
    @props.renderItem(@props.item, @props.index, @props.connectDragSource, @props.connectDragPreview, @props.connectDropTarget, @props.children)

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(NestedReorderableListItemComponent)
