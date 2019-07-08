"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var PropTypes,
    R,
    React,
    TabbedComponent,
    _,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
R = React.createElement; // Simple bootstrap tabbed component

module.exports = TabbedComponent = function () {
  var TabbedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(TabbedComponent, _React$Component);

    function TabbedComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, TabbedComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TabbedComponent).call(this, props));
      _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
      _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2["default"])(_this));
      _this.renderTab = _this.renderTab.bind((0, _assertThisInitialized2["default"])(_this));
      _this.state = {
        tabId: _this.props.initialTabId
      };
      return _this;
    }

    (0, _createClass2["default"])(TabbedComponent, [{
      key: "handleClick",
      value: function handleClick(tabId) {
        boundMethodCheck(this, TabbedComponent);

        if (this.props.onTabClick != null) {
          return this.props.onTabClick(tabId);
        } else {
          return this.setState({
            tabId: tabId
          });
        }
      }
    }, {
      key: "handleRemove",
      value: function handleRemove(tab, ev) {
        boundMethodCheck(this, TabbedComponent);
        ev.stopPropagation();
        return tab.onRemove();
      }
    }, {
      key: "renderTab",
      value: function renderTab(tab) {
        var tabId;
        boundMethodCheck(this, TabbedComponent);

        if (this.props.tabId != null) {
          tabId = this.props.tabId;
        } else {
          tabId = this.state.tabId;
        }

        return R('li', {
          key: tab.id,
          className: tabId === tab.id ? "active" : void 0
        }, R('a', {
          onClick: this.handleClick.bind(null, tab.id),
          style: {
            cursor: "pointer"
          }
        }, tab.label, tab.onRemove ? R('button', {
          type: "button",
          className: "btn btn-xs btn-link",
          onClick: this.handleRemove.bind(null, tab)
        }, R('span', {
          className: "fa fa-times"
        })) : void 0));
      }
    }, {
      key: "render",
      value: function render() {
        var currentTab, tabId;

        if (this.props.tabId != null) {
          tabId = this.props.tabId;
        } else {
          tabId = this.state.tabId;
        }

        currentTab = _.findWhere(this.props.tabs, {
          id: tabId
        });
        return R('div', null, R('ul', {
          key: "tabs",
          className: "nav nav-tabs",
          style: {
            marginBottom: 10
          }
        }, _.map(this.props.tabs, this.renderTab), this.props.onAddTab ? R('li', {
          key: "_add"
        }, R('a', {
          onClick: this.props.onAddTab,
          style: {
            cursor: "pointer"
          }
        }, R('span', {
          className: "glyphicon glyphicon-plus"
        }))) : void 0), R('div', {
          key: "currentTab"
        }, currentTab ? currentTab.elem : void 0));
      }
    }]);
    return TabbedComponent;
  }(React.Component);

  ;
  TabbedComponent.propTypes = {
    tabs: PropTypes.array.isRequired,
    // Array of { id, label, elem, onRemove (optional) }
    initialTabId: PropTypes.string,
    // Initially selected id of tab
    tabId: PropTypes.string,
    // Selected id of tab
    onAddTab: PropTypes.func,
    // Set to have a plus to add a tab
    onTabClick: PropTypes.func // Set to be called back when a tab is clicked (tabId) instead of setting internal state

  };
  return TabbedComponent;
}.call(void 0);