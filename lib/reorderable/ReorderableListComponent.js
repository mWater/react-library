var DragDropContext, H, HTML5Backend, R, React, ReorderableListComponent, ReorderableListItemComponent, _, uuid,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

uuid = require('node-uuid');

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
    listId: React.PropTypes.string,
    getItemId: React.PropTypes.func.isRequired
  };

  function ReorderableListComponent() {
    this.fixOrder = bind(this.fixOrder, this);
    this.handlePutAfter = bind(this.handlePutAfter, this);
    this.handlePutBefore = bind(this.handlePutBefore, this);
    var order;
    ReorderableListComponent.__super__.constructor.apply(this, arguments);
    order = _.map(this.props.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    this.state = {
      initialOrder: order,
      order: order,
      listId: this.props.listId ? this.props.listId : uuid.v4()
    };
  }

  ReorderableListComponent.prototype.componentWillReceiveProps = function(nextProps) {
    var order;
    order = _.map(nextProps.items, (function(_this) {
      return function(item) {
        return _this.props.getItemId(item);
      };
    })(this));
    if (!_.isEqual(order, this.state.initialOrder)) {
      this.setState({
        initialOrder: order,
        order: order
      });
    }
    return this.setState({
      listId: this.props.listId ? this.props.listId : uuid.v4()
    });
  };

  ReorderableListComponent.prototype.handlePutBefore = function(id, beforeId, isDrop) {
    var index, order;
    order = this.state.initialOrder.slice();
    order = _.without(order, beforeId);
    index = order.indexOf(id);
    order.splice(index, 0, beforeId);
    this.setState({
      order: order
    });
    if (isDrop) {
      return this.props.onReorder(this.fixOrder(this.props.items, order));
    }
  };

  ReorderableListComponent.prototype.handlePutAfter = function(id, afterId, isDrop) {
    var index, order;
    order = this.state.initialOrder.slice();
    order = _.without(order, afterId);
    index = order.indexOf(id);
    order.splice(index + 1, 0, afterId);
    this.setState({
      order: order
    });
    if (isDrop) {
      return this.props.onReorder(this.fixOrder(this.props.items, order));
    }
  };

  ReorderableListComponent.prototype.fixOrder = function(items, order) {
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
    var items, style;
    style = {
      paddingLeft: 20
    };
    items = this.props.items.slice();
    this.fixOrder(items, this.state.order);
    return H.div({
      style: style
    }, _.map(items, (function(_this) {
      return function(item, index) {
        var params;
        params = {
          item: item,
          index: index,
          renderItem: _this.props.renderItem,
          key: _this.props.getItemId(item),
          constrainTo: _this.state.listId,
          getItemId: _this.props.getItemId,
          onPutAfter: _this.handlePutAfter,
          onPutBefore: _this.handlePutBefore
        };
        return R(ReorderableListItemComponent, params);
      };
    })(this)));
  };

  return ReorderableListComponent;

})(React.Component);

module.exports = DragDropContext(HTML5Backend)(ReorderableListComponent);
