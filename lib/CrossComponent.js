var CrossComponent, PropTypes, R, React,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

R = React.createElement;

module.exports = CrossComponent = (function(superClass) {
  extend(CrossComponent, superClass);

  function CrossComponent() {
    return CrossComponent.__super__.constructor.apply(this, arguments);
  }

  CrossComponent.propTypes = {
    n: PropTypes.string,
    e: PropTypes.string,
    s: PropTypes.string,
    w: PropTypes.string,
    width: PropTypes.any,
    height: PropTypes.any,
    collapseTop: PropTypes.bool
  };

  CrossComponent.defaultProps = {
    width: "100%",
    height: "100%"
  };

  CrossComponent.prototype.render = function() {
    return R('div', {
      className: "flexBox",
      style: {
        display: "flex",
        flexDirection: "column",
        width: this.props.width,
        height: this.props.height
      }
    }, R('div', {
      className: "flexBox",
      style: {
        display: "flex",
        flex: (this.props.collapseTop ? "0 1 0px" : "1 1 0px")
      }
    }, R('div', {
      className: "flexBox",
      style: {
        flex: "1 1 0px",
        borderRight: this.props.n,
        borderBottom: this.props.w
      }
    }), R('div', {
      className: "flexBox",
      style: {
        flex: "1 1 0px",
        borderBottom: this.props.e
      }
    })), R('div', {
      className: "flexBox",
      style: {
        display: "flex",
        flex: "1 1 0px"
      }
    }, R('div', {
      className: "flexBox",
      style: {
        flex: "1 1 0px",
        borderRight: this.props.s
      }
    }), R('div', {
      className: "flexBox",
      style: {
        flex: "1 1 0px"
      }
    })));
  };

  return CrossComponent;

})(React.Component);
