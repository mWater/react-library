"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var DragSource, DropTarget, PropTypes, R, React, ReactDOM, ReorderableListItemComponent, _, collectSource, collectTarget, itemSource, itemTarget;

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
R = React.createElement;
ReactDOM = require('react-dom');
DragSource = require('react-dnd').DragSource;
DropTarget = require('react-dnd').DropTarget;
itemTarget = {
  // Called when an item hovers over this component
  hover: function hover(props, monitor, component) {
    var clientOffset, hoverBoundingRect, hoverClientY, hoverMiddleY, hoveringId, myId; // Hovering over self does nothing

    hoveringId = monitor.getItem().id;
    myId = props.getItemId(props.item);

    if (hoveringId === myId) {
      return;
    } // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing


    if (props.constrainTo !== monitor.getItem().constrainTo) {
      return;
    }

    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    clientOffset = monitor.getClientOffset(); // Get position within hovered item

    hoverClientY = clientOffset.y - hoverBoundingRect.top; // If is in top half, and is within the height of the dragged item

    if (hoverClientY < hoverMiddleY && hoverClientY < monitor.getItem().height) {
      // Put before
      props.onPutBefore(myId, hoveringId);
      return;
    } // If is in bottom half, and is within the height of the dragged item


    if (hoverClientY > hoverMiddleY && hoverClientY > hoverBoundingRect.height - monitor.getItem().height) {
      // Put before
      props.onPutAfter(myId, hoveringId);
    }
  },
  canDrop: function canDrop(props, monitor) {
    // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
    return props.constrainTo === monitor.getItem().constrainTo;
  }
};

collectTarget = function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop(),
    canDrop: monitor.canDrop()
  };
};

itemSource = {
  beginDrag: function beginDrag(props, monitor, component) {
    return {
      id: props.getItemId(props.item),
      constrainTo: props.constrainTo,
      // Save height of dragged component 
      height: ReactDOM.findDOMNode(component).getBoundingClientRect().height
    };
  },
  isDragging: function isDragging(props, monitor) {
    return props.getItemId(props.item) === monitor.getItem().id;
  },
  endDrag: function endDrag(props, monitor, component) {
    return props.onEndDrag();
  }
};

collectSource = function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

ReorderableListItemComponent = function () {
  var ReorderableListItemComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(ReorderableListItemComponent, _React$Component);

    function ReorderableListItemComponent() {
      (0, _classCallCheck2["default"])(this, ReorderableListItemComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ReorderableListItemComponent).apply(this, arguments));
    }

    (0, _createClass2["default"])(ReorderableListItemComponent, [{
      key: "render",
      value: function render() {
        return this.props.renderItem(this.props.item, this.props.index, this.props.connectDragSource, this.props.connectDragPreview, this.props.connectDropTarget);
      }
    }]);
    return ReorderableListItemComponent;
  }(React.Component);

  ;
  ReorderableListItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
    // the item from reorderable list
    isDragging: PropTypes.bool.isRequired,
    // internally used for tracking if an item is being dragged
    isOver: PropTypes.bool.isRequired,
    // internally used to check if an item is over the current component
    canDrop: PropTypes.bool.isRequired,
    // internally used as a flag it the item being dragged can be dropped in place of the item it is over
    connectDragSource: PropTypes.func.isRequired,
    // the drag source connector, supplied by React DND
    connectDropTarget: PropTypes.func.isRequired,
    // the drop target connector, supplied by React DND
    connectDragPreview: PropTypes.func.isRequired,
    // the drag preview connector, supplied by React DND
    onPutBefore: PropTypes.func.isRequired,
    // Call with (id, beforeId)
    onPutAfter: PropTypes.func.isRequired,
    // Call with (id, afterId)
    onEndDrag: PropTypes.func.isRequired,
    // Called when drag is complete
    index: PropTypes.number.isRequired,
    // index of the current item
    renderItem: PropTypes.func.isRequired,
    // function to render the current item, passed by ReorderableListComponent
    constrainTo: PropTypes.string.isRequired,
    // the ID of the list where reordering is constrained to
    getItemId: PropTypes.func.isRequired // function to return the identifier of the current item

  };
  return ReorderableListItemComponent;
}.call(void 0);

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent);