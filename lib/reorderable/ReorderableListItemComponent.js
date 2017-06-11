var DragSource, DropTarget, H, PropTypes, R, React, ReactDOM, ReorderableListItemComponent, _, collectSource, collectTarget, itemSource, itemTarget,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

_ = require('lodash');

React = require('react');

H = React.DOM;

R = React.createElement;

ReactDOM = require('react-dom');

DragSource = require('react-dnd').DragSource;

DropTarget = require('react-dnd').DropTarget;

itemTarget = {
  hover: function(props, monitor, component) {
    var clientOffset, hoverBoundingRect, hoverClientY, hoverMiddleY, hoveringId, myId;
    hoveringId = monitor.getItem().id;
    myId = props.getItemId(props.item);
    if (hoveringId === myId) {
      return;
    }
    if (props.constrainTo !== monitor.getItem().constrainTo) {
      return;
    }
    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    clientOffset = monitor.getClientOffset();
    hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if ((hoverClientY < hoverMiddleY) && (hoverClientY < monitor.getItem().height)) {
      props.onPutBefore(myId, hoveringId);
      return;
    }
    if ((hoverClientY > hoverMiddleY) && (hoverClientY > hoverBoundingRect.height - monitor.getItem().height)) {
      props.onPutAfter(myId, hoveringId);
    }
  },
  canDrop: function(props, monitor) {
    return props.constrainTo === monitor.getItem().constrainTo;
  }
};

collectTarget = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop(),
    canDrop: monitor.canDrop()
  };
};

itemSource = {
  beginDrag: function(props, monitor, component) {
    return {
      id: props.getItemId(props.item),
      constrainTo: props.constrainTo,
      height: ReactDOM.findDOMNode(component).getBoundingClientRect().height
    };
  },
  isDragging: function(props, monitor) {
    return props.getItemId(props.item) === monitor.getItem().id;
  },
  endDrag: function(props, monitor, component) {
    return props.onEndDrag();
  }
};

collectSource = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

ReorderableListItemComponent = (function(superClass) {
  extend(ReorderableListItemComponent, superClass);

  function ReorderableListItemComponent() {
    return ReorderableListItemComponent.__super__.constructor.apply(this, arguments);
  }

  ReorderableListItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    onPutBefore: PropTypes.func.isRequired,
    onPutAfter: PropTypes.func.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    constrainTo: PropTypes.string.isRequired,
    getItemId: PropTypes.func.isRequired
  };

  ReorderableListItemComponent.prototype.render = function() {
    return this.props.renderItem(this.props.item, this.props.index, this.props.connectDragSource, this.props.connectDragPreview, this.props.connectDropTarget);
  };

  return ReorderableListItemComponent;

})(React.Component);

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent);
