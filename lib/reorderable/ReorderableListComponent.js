var DragDropContext, H, HTML5Backend, R, React, ReorderableListComponent, ReorderableListItemComponent, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

H = React.DOM;

R = React.createElement;

DragDropContext = require('react-dnd').DragDropContext;

HTML5Backend = require('react-dnd-html5-backend');

ReorderableListItemComponent = require("./ReorderableListItemComponent");

ReorderableListComponent = (function(superClass) {
  extend(ReorderableListComponent, superClass);

  ReorderableListComponent.propTypes = {
    items: React.PropTypes.array.isRequired,
    onReorder: React.PropTypes.func.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    listId: React.PropTypes.string.isRequired,
    getItemIdentifier: React.PropTypes.func.isRequired
  };

  function ReorderableListComponent() {
    this.fixOrder = bind(this.fixOrder, this);
    this.reorder = bind(this.reorder, this);
    this.dragPast = bind(this.dragPast, this);
    var order;
    ReorderableListComponent.__super__.constructor.apply(this, arguments);
    order = _.map(this.props.items, (function(_this) {
      return function(item) {
        return _this.props.getItemIdentifier(item);
      };
    })(this));
    this.state = {
      initialOrder: order,
      order: order,
      dropItem: null
    };
  }

  ReorderableListComponent.prototype.dragPast = function(dragIndex, hoverIndex) {
    var draggedItem, order;
    if (this.state.dropItem === hoverIndex) {
      return;
    }
    order = this.state.initialOrder.slice(0);
    draggedItem = order[dragIndex];
    order.splice(dragIndex, 1);
    order.splice(hoverIndex, 0, draggedItem);
    return this.setState({
      order: order,
      dropItem: hoverIndex
    });
  };

  ReorderableListComponent.prototype.reorder = function(dragIndex, hoverIndex) {
    var draggedItem, items, order;
    items = this.props.items.slice(0);
    draggedItem = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, draggedItem);
    order = _.map(items, (function(_this) {
      return function(item) {
        return _this.props.getItemIdentifier(item);
      };
    })(this));
    this.setState({
      initialOrder: order,
      dropItem: null,
      order: order
    });
    return this.props.onReorder(items);
  };

  ReorderableListComponent.prototype.fixOrder = function(items) {
    return items.sort((function(_this) {
      return function(left, right) {
        if (_this.state.order.indexOf(_this.props.getItemIdentifier(left)) < _this.state.order.indexOf(_this.props.getItemIdentifier(right))) {
          return -1;
        }
        if (_this.state.order.indexOf(_this.props.getItemIdentifier(left)) > _this.state.order.indexOf(_this.props.getItemIdentifier(right))) {
          return 1;
        }
        return 0;
      };
    })(this));
  };

  ReorderableListComponent.prototype.render = function() {
    var items, style;
    style = {
      paddingLeft: 20
    };
    items = this.props.items.slice(0);
    this.fixOrder(items);
    return H.div({
      style: style
    }, _.map(items, (function(_this) {
      return function(item, index) {
        var params;
        params = {
          item: item,
          index: index,
          renderItem: _this.props.renderItem,
          onReorder: _this.reorder,
          key: _this.props.getItemIdentifier(item),
          constrainTo: _this.props.listId,
          dragPast: _this.dragPast,
          getItemIdentifier: _this.props.getItemIdentifier
        };
        return R(ReorderableListItemComponent, params);
      };
    })(this)));
  };

  return ReorderableListComponent;

})(React.Component);

module.exports = DragDropContext(HTML5Backend)(ReorderableListComponent);
