var DragDropContext, H, HTML5Backend, NestableDragDropContext, R, React, ReorderableListComponent, ReorderableListItemComponent, _, uuid,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

uuid = require('uuid');

H = React.DOM;

R = React.createElement;

DragDropContext = require('react-dnd').DragDropContext;

HTML5Backend = require('react-dnd-html5-backend');

ReorderableListItemComponent = require("./ReorderableListItemComponent");

NestableDragDropContext = require("../NestableDragDropContext");

ReorderableListComponent = (function(superClass) {
  extend(ReorderableListComponent, superClass);

  ReorderableListComponent.propTypes = {
    items: React.PropTypes.array.isRequired,
    onReorder: React.PropTypes.func.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    listId: React.PropTypes.string,
    getItemId: React.PropTypes.func.isRequired,
    element: React.PropTypes.object
  };

  function ReorderableListComponent() {
    this.fixOrder = bind(this.fixOrder, this);
    this.handleEndDrag = bind(this.handleEndDrag, this);
    this.handlePutAfter = bind(this.handlePutAfter, this);
    this.handlePutBefore = bind(this.handlePutBefore, this);
    ReorderableListComponent.__super__.constructor.apply(this, arguments);
    this.state = {
      order: null,
      listId: this.props.listId ? this.props.listId : uuid()
    };
  }

  ReorderableListComponent.defaultProps = {
    element: H.div(null)
  };

  ReorderableListComponent.prototype.componentWillReceiveProps = function(nextProps) {
    var newOrder, oldOrder;
    newOrder = _.map(nextProps.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    oldOrder = _.map(this.props.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    if (!_.isEqual(newOrder, oldOrder)) {
      this.setState({
        order: null
      });
    }
    return this.setState({
      listId: nextProps.listId ? nextProps.listId : uuid()
    });
  };

  ReorderableListComponent.prototype.handlePutBefore = function(id, beforeId) {
    var index, order;
    order = _.map(this.props.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    order = _.without(order, beforeId);
    index = order.indexOf(id);
    order.splice(index, 0, beforeId);
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({
        order: order
      });
    }
  };

  ReorderableListComponent.prototype.handlePutAfter = function(id, afterId) {
    var index, order;
    order = _.map(this.props.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    order = _.without(order, afterId);
    index = order.indexOf(id);
    order.splice(index + 1, 0, afterId);
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({
        order: order
      });
    }
  };

  ReorderableListComponent.prototype.handleEndDrag = function() {
    var order;
    if (!this.state.order) {
      return;
    }
    order = this.state.order.slice();
    this.setState({
      order: null
    });
    return this.props.onReorder(this.fixOrder(this.props.items.slice(), order));
  };

  ReorderableListComponent.prototype.fixOrder = function(items, order) {
    if (!order) {
      return items;
    }
    return items.sort((function(_this) {
      return function(left, right) {
        if (order.indexOf(_this.props.getItemId(left)) < order.indexOf(_this.props.getItemId(right))) {
          return -1;
        }
        if (order.indexOf(_this.props.getItemId(left)) > order.indexOf(_this.props.getItemId(right))) {
          return 1;
        }
        return 0;
      };
    })(this));
  };

  ReorderableListComponent.prototype.render = function() {
    var items;
    items = this.props.items.slice();
    this.fixOrder(items, this.state.order);
    return React.cloneElement(this.props.element, null, _.map(items, (function(_this) {
      return function(item, index) {
        return R(ReorderableListItemComponent, {
          key: _this.props.getItemId(item),
          item: item,
          index: index,
          renderItem: _this.props.renderItem,
          constrainTo: _this.state.listId,
          getItemId: _this.props.getItemId,
          onPutAfter: _this.handlePutAfter,
          onPutBefore: _this.handlePutBefore,
          onEndDrag: _this.handleEndDrag
        });
      };
    })(this)));
  };

  return ReorderableListComponent;

})(React.Component);

module.exports = NestableDragDropContext(HTML5Backend)(ReorderableListComponent);
