"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PropTypes,
    R,
    React,
    ReorderableListComponent,
    ReorderableListItemComponent,
    _,
    uuid,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
uuid = require('uuid');
R = React.createElement;
ReorderableListItemComponent = require("./ReorderableListItemComponent");

ReorderableListComponent = function () {
  // Reorderable component for nested items
  // Currently supports reordering within the same list
  var ReorderableListComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(ReorderableListComponent, _React$Component);

    var _super = _createSuper(ReorderableListComponent);

    function ReorderableListComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, ReorderableListComponent);
      _this = _super.call(this, props); // Put beforeId right before id

      _this.handlePutBefore = _this.handlePutBefore.bind((0, _assertThisInitialized2["default"])(_this)); // Put afterId right after id

      _this.handlePutAfter = _this.handlePutAfter.bind((0, _assertThisInitialized2["default"])(_this));
      _this.handleEndDrag = _this.handleEndDrag.bind((0, _assertThisInitialized2["default"])(_this)); // Re-arrange items to match the order of order (list of ids)
      // If order is null, return list

      _this.fixOrder = _this.fixOrder.bind((0, _assertThisInitialized2["default"])(_this));
      _this.state = {
        order: null,
        // Ordered list of ids. Only present when dragging
        listId: _this.props.listId ? _this.props.listId : uuid()
      };
      return _this;
    }

    (0, _createClass2["default"])(ReorderableListComponent, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var newOrder, oldOrder;
        newOrder = _.map(nextProps.items, function (item) {
          return _this2.props.getItemId(item);
        });
        oldOrder = _.map(this.props.items, function (item) {
          return _this2.props.getItemId(item);
        }); // If order changed, reset order

        if (!_.isEqual(newOrder, oldOrder)) {
          this.setState({
            order: null
          });
        }

        return this.setState({
          listId: nextProps.listId ? nextProps.listId : uuid()
        });
      }
    }, {
      key: "handlePutBefore",
      value: function handlePutBefore(id, beforeId) {
        var _this3 = this;

        var index, order;
        boundMethodCheck(this, ReorderableListComponent);
        order = _.map(this.props.items, function (item) {
          return _this3.props.getItemId(item);
        }); // Remove beforeId and splice in

        order = _.without(order, beforeId);
        index = order.indexOf(id);
        order.splice(index, 0, beforeId); // Set state if different

        if (!_.isEqual(order, this.state.order)) {
          return this.setState({
            order: order
          });
        }
      }
    }, {
      key: "handlePutAfter",
      value: function handlePutAfter(id, afterId) {
        var _this4 = this;

        var index, order;
        boundMethodCheck(this, ReorderableListComponent);
        order = _.map(this.props.items, function (item) {
          return _this4.props.getItemId(item);
        }); // Remove afterId and splice in

        order = _.without(order, afterId);
        index = order.indexOf(id);
        order.splice(index + 1, 0, afterId); // Set state if different

        if (!_.isEqual(order, this.state.order)) {
          return this.setState({
            order: order
          });
        }
      }
    }, {
      key: "handleEndDrag",
      value: function handleEndDrag() {
        var order;
        boundMethodCheck(this, ReorderableListComponent);

        if (!this.state.order) {
          return;
        }

        order = this.state.order.slice();
        this.setState({
          order: null
        });
        return this.props.onReorder(this.fixOrder(this.props.items.slice(), order));
      }
    }, {
      key: "fixOrder",
      value: function fixOrder(items, order) {
        var _this5 = this;

        boundMethodCheck(this, ReorderableListComponent);

        if (!order) {
          return items;
        }

        return items.sort(function (left, right) {
          if (order.indexOf(_this5.props.getItemId(left)) < order.indexOf(_this5.props.getItemId(right))) {
            return -1;
          }

          if (order.indexOf(_this5.props.getItemId(left)) > order.indexOf(_this5.props.getItemId(right))) {
            return 1;
          }

          return 0;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var items;
        items = this.props.items.slice();
        this.fixOrder(items, this.state.order);
        return React.cloneElement(this.props.element, null, _.map(items, function (item, index) {
          return R(ReorderableListItemComponent, {
            key: _this6.props.getItemId(item),
            item: item,
            index: index,
            renderItem: _this6.props.renderItem,
            constrainTo: _this6.state.listId,
            getItemId: _this6.props.getItemId,
            onPutAfter: _this6.handlePutAfter,
            onPutBefore: _this6.handlePutBefore,
            onEndDrag: _this6.handleEndDrag
          });
        }));
      }
    }]);
    return ReorderableListComponent;
  }(React.Component);

  ;
  ReorderableListComponent.propTypes = {
    items: PropTypes.array.isRequired,
    // items to be reordered
    onReorder: PropTypes.func.isRequired,
    // callback function, called when an item is dropped, gets passed the reordered item list
    // function which renders the item, gets passed the current item and react dnd connectors
    // signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
    renderItem: PropTypes.func.isRequired,
    listId: PropTypes.string,
    // a uniqid for the list
    getItemId: PropTypes.func.isRequired,
    // function which should return the identifier of the current item, gets passed the current item
    element: PropTypes.object // the element to render this component as

  };
  ReorderableListComponent.defaultProps = {
    element: R('div', null)
  };
  return ReorderableListComponent;
}.call(void 0);

module.exports = ReorderableListComponent;