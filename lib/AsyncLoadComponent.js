var AsyncLoadComponent, R, React, ReactDOM,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

R = React.createElement;

module.exports = AsyncLoadComponent = (function(superClass) {
  extend(AsyncLoadComponent, superClass);

  function AsyncLoadComponent() {
    this.state = {
      loading: false
    };
    this._mounted = false;
    this._loadSeqStarted = 0;
    this._loadSeqCompleted = 0;
  }

  AsyncLoadComponent.prototype.isLoadNeeded = function(newProps, oldProps) {
    throw new Error("Not implemented");
  };

  AsyncLoadComponent.prototype.load = function(props, prevProps, callback) {
    throw new Error("Not implemented");
  };

  AsyncLoadComponent.prototype.forceLoad = function() {
    return this._performLoad(this.props, this.props);
  };

  AsyncLoadComponent.prototype._performLoad = function(newProps, oldProps) {
    var callback, seq;
    this._loadSeqStarted += 1;
    seq = this._loadSeqStarted;
    callback = (function(_this) {
      return function(state) {
        if (!_this._mounted) {
          return;
        }
        if (seq < _this._loadSeqCompleted) {
          return;
        }
        _this._loadSeqCompleted = seq;
        _this.setState(state);
        if (seq === _this._loadSeqStarted) {
          return _this.setState({
            loading: false
          });
        }
      };
    })(this);
    return this.setState({
      loading: true
    }, (function(_this) {
      return function() {
        return _this.load(newProps, oldProps, callback);
      };
    })(this));
  };

  AsyncLoadComponent.prototype.componentWillMount = function() {
    this._mounted = true;
    return this._performLoad(this.props, {});
  };

  AsyncLoadComponent.prototype.componentWillReceiveProps = function(nextProps) {
    if (this.isLoadNeeded(nextProps, this.props)) {
      return this._performLoad(nextProps, this.props);
    }
  };

  AsyncLoadComponent.prototype.componentWillUnmount = function() {
    return this._mounted = false;
  };

  return AsyncLoadComponent;

})(React.Component);
