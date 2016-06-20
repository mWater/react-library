var DragSource, DropTarget, H, R, React, ReactDOM, ReorderableListItemComponent, _, collectSource, collectTarget, itemSource, itemTarget,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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
    item: React.PropTypes.object.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    onPutBefore: React.PropTypes.func.isRequired,
    onPutAfter: React.PropTypes.func.isRequired,
    onEndDrag: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    constrainTo: React.PropTypes.string.isRequired,
    getItemId: React.PropTypes.func.isRequired
  };

  ReorderableListItemComponent.prototype.render = function() {
    var connectDragPreview, connectDragSource, connectDropTarget;
    connectDropTarget = this.props.connectDropTarget;
    connectDragPreview = this.props.connectDragPreview;
    connectDragSource = this.props.connectDragSource;
    return this.props.renderItem(this.props.item, this.props.index, connectDragSource, connectDragPreview, connectDropTarget);
  };

  return ReorderableListItemComponent;

})(React.Component);

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent);
