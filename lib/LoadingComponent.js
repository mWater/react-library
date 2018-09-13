var LoadingComponent, PropTypes, R, React,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

R = React.createElement;

module.exports = LoadingComponent = (function(superClass) {
  extend(LoadingComponent, superClass);

  function LoadingComponent() {
    return LoadingComponent.__super__.constructor.apply(this, arguments);
  }

  LoadingComponent.propTypes = {
    width: PropTypes.any,
    height: PropTypes.any,
    label: PropTypes.node
  };

  LoadingComponent.defaultProps = {
    width: "100%",
    height: "100%",
    label: R('div', {
      className: "text-muted",
      style: {
        fontSize: 30
      }
    }, R('i', {
      className: "fa fa-spin fa-spinner"
    }), " Loading...")
  };

  LoadingComponent.prototype.render = function() {
    return R('div', {
      style: {
        width: this.props.width,
        height: this.props.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, this.props.label);
  };

  return LoadingComponent;

})(React.Component);
