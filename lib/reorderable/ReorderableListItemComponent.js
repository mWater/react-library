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
  drop: function(props, monitor, component) {
    var clientOffset, dragItemIndex, hoverBoundingRect, hoverClientY, hoverItemIndex, hoverMiddleY;
    dragItemIndex = monitor.getItem().index;
    hoverItemIndex = props.index;
    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    clientOffset = monitor.getClientOffset();
    hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
      return {};
    }
    if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
      return {};
    }
    props.onReorder(dragItemIndex, hoverItemIndex);
    return {};
  },
  hover: function(props, monitor, component) {
    var clientOffset, dragIndex, hoverBoundingRect, hoverClientY, hoverIndex, hoverMiddleY;
    dragIndex = monitor.getItem().index;
    hoverIndex = props.index;
    if (props.constrainTo !== monitor.getItem().constrainTo) {
      return;
    }
    hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    clientOffset = monitor.getClientOffset();
    hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    return props.dragPast(dragIndex, hoverIndex);
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
  beginDrag: function(props) {
    return {
      id: props.getItemId(props.item),
      index: props.index,
      constrainTo: props.constrainTo
    };
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
    onReorder: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    dragPast: React.PropTypes.func.isRequired,
    constrainTo: React.PropTypes.string.isRequired,
    getItemId: React.PropTypes.func.isRequired
  };

  ReorderableListItemComponent.prototype.renderItem = function(connectDragSource) {
    var opacity, style;
    opacity = this.props.isDragging ? 0.4 : 1;
    style = {
      opacity: opacity
    };
    if (this.props.isOver) {
      style.border = "1px dashed #eee";
      style.opacity = 0.6;
    }
    return H.div({
      style: style
    }, this.props.renderItem(this.props.item, this.props.index, connectDragSource));
  };

  ReorderableListItemComponent.prototype.render = function() {
    var connectDragPreview, connectDragSource, connectDropTarget;
    connectDropTarget = this.props.connectDropTarget;
    connectDragPreview = this.props.connectDragPreview;
    connectDragSource = this.props.connectDragSource;
    return connectDragPreview(connectDropTarget(this.renderItem(connectDragSource)));
  };

  return ReorderableListItemComponent;

})(React.Component);

module.exports = _.flow(DragSource("form-item", itemSource, collectSource), DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent);
