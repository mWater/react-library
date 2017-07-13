var H, PropTypes, React, TabbedComponent, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

_ = require('lodash');

React = require('react');

H = React.DOM;

module.exports = TabbedComponent = (function(superClass) {
  extend(TabbedComponent, superClass);

  TabbedComponent.propTypes = {
    tabs: PropTypes.array.isRequired,
    initialTabId: PropTypes.string,
    tabId: PropTypes.string,
    onAddTab: PropTypes.func,
    onTabClick: PropTypes.func
  };

  function TabbedComponent() {
    this.renderTab = bind(this.renderTab, this);
    this.handleRemove = bind(this.handleRemove, this);
    this.handleClick = bind(this.handleClick, this);
    TabbedComponent.__super__.constructor.apply(this, arguments);
    this.state = {
      tabId: this.props.initialTabId
    };
  }

  TabbedComponent.prototype.handleClick = function(tabId) {
    if (this.props.onTabClick != null) {
      return this.props.onTabClick(tabId);
    } else {
      return this.setState({
        tabId: tabId
      });
    }
  };

  TabbedComponent.prototype.handleRemove = function(tab, ev) {
    ev.stopPropagation();
    return tab.onRemove();
  };

  TabbedComponent.prototype.renderTab = function(tab) {
    var tabId;
    if (this.props.tabId != null) {
      tabId = this.props.tabId;
    } else {
      tabId = this.state.tabId;
    }
    return H.li({
      key: tab.id,
      className: (tabId === tab.id ? "active" : void 0)
    }, H.a({
      onClick: this.handleClick.bind(null, tab.id)
    }, tab.label, tab.onRemove ? H.button({
      type: "button",
      className: "btn btn-xs btn-link",
      onClick: this.handleRemove.bind(null, tab)
    }, H.span({
      className: "fa fa-times"
    })) : void 0));
  };

  TabbedComponent.prototype.render = function() {
    var currentTab, tabId;
    if (this.props.tabId != null) {
      tabId = this.props.tabId;
    } else {
      tabId = this.state.tabId;
    }
    currentTab = _.findWhere(this.props.tabs, {
      id: tabId
    });
    return H.div(null, H.ul({
      key: "tabs",
      className: "nav nav-tabs",
      style: {
        marginBottom: 10
      }
    }, _.map(this.props.tabs, this.renderTab), this.props.onAddTab ? H.li({
      key: "_add"
    }, H.a({
      onClick: this.props.onAddTab
    }, H.span({
      className: "glyphicon glyphicon-plus"
    }))) : void 0), H.div({
      key: "currentTab"
    }, currentTab ? currentTab.elem : void 0));
  };

  return TabbedComponent;

})(React.Component);
