// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement
import ReactDOM from "react-dom"
import { DragSource } from "react-dnd"
import { DropTarget } from "react-dnd"

const itemTarget = {
  // Called when an item hovers over this component
  hover(props: any, monitor: any, component: any) {
    // Hovering over self does nothing
    const hoveringId = monitor.getItem().id
    const myId = props.getItemId(props.item)
    if (hoveringId === myId) {
      return
    }

    // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    if (props.constrainTo !== monitor.getItem().constrainTo) {
      return
    }

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()

    // Get position within hovered item
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // If is in top half, and is within the height of the dragged item
    if (hoverClientY < hoverMiddleY && hoverClientY < monitor.getItem().height) {
      // Put before
      props.onPutBefore(myId, hoveringId)
      return
    }

    // If is in bottom half, and is within the height of the dragged item
    if (hoverClientY > hoverMiddleY && hoverClientY > hoverBoundingRect.height - monitor.getItem().height) {
      // Put before
      props.onPutAfter(myId, hoveringId)
      return
    }
  },

  canDrop(props: any, monitor: any) {
    // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    return props.constrainTo === monitor.getItem().constrainTo
  }
}

function collectTarget(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop(),
    canDrop: monitor.canDrop()
  }
}

const itemSource = {
  beginDrag(props: any, monitor: any, component: any) {
    return {
      id: props.getItemId(props.item),
      constrainTo: props.constrainTo,
      // Save height of dragged component
      height: ReactDOM.findDOMNode(component).getBoundingClientRect().height
    }
  },

  isDragging(props: any, monitor: any) {
    return props.getItemId(props.item) === monitor.getItem().id
  },

  endDrag(props: any, monitor: any, component: any) {
    return props.onEndDrag()
  }
}

function collectSource(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class ReorderableListItemComponent extends React.Component {
  static initClass() {
    this.propTypes = {
      item: PropTypes.any.isRequired, // the item from reorderable list
      isDragging: PropTypes.bool.isRequired, // internally used for tracking if an item is being dragged
      isOver: PropTypes.bool.isRequired, // internally used to check if an item is over the current component
      canDrop: PropTypes.bool.isRequired, // internally used as a flag it the item being dragged can be dropped in place of the item it is over
      connectDragSource: PropTypes.func.isRequired, // the drag source connector, supplied by React DND
      connectDropTarget: PropTypes.func.isRequired, // the drop target connector, supplied by React DND
      connectDragPreview: PropTypes.func.isRequired, // the drag preview connector, supplied by React DND
      onPutBefore: PropTypes.func.isRequired, // Call with (id, beforeId)
      onPutAfter: PropTypes.func.isRequired, // Call with (id, afterId)
      onEndDrag: PropTypes.func.isRequired, // Called when drag is complete
      index: PropTypes.number.isRequired, // index of the current item

      renderItem: PropTypes.func.isRequired, // function to render the current item, passed by ReorderableListComponent
      constrainTo: PropTypes.string.isRequired, // the ID of the list where reordering is constrained to
      getItemId: PropTypes.func.isRequired
    }
    // function to return the identifier of the current item
  }

  render() {
    return this.props.renderItem(
      this.props.item,
      this.props.index,
      this.props.connectDragSource,
      this.props.connectDragPreview,
      this.props.connectDropTarget
    )
  }
}
ReorderableListItemComponent.initClass()

export default _.flow(
  DragSource("form-item", itemSource, collectSource),
  DropTarget("form-item", itemTarget, collectTarget)
)(ReorderableListItemComponent)
