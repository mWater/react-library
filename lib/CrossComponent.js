var CrossComponent, H, React,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

H = React.DOM;

module.exports = CrossComponent = (function(superClass) {
  extend(CrossComponent, superClass);

  function CrossComponent() {
    return CrossComponent.__super__.constructor.apply(this, arguments);
  }

  CrossComponent.propTypes = {
    n: React.PropTypes.string,
    e: React.PropTypes.string,
    s: React.PropTypes.string,
    w: React.PropTypes.string,
    width: React.PropTypes.any,
    height: React.PropTypes.any,
    collapseTop: React.PropTypes.bool
  };

  CrossComponent.defaultProps = {
    width: "100%",
    height: "100%"
  };

  CrossComponent.prototype.render = function() {
    return H.div({
      style: {
        display: "flex",
        flexDirection: "column",
        width: this.props.width,
        height: this.props.height
      }
    }, H.div({
      style: {
        display: "flex",
        flex: (this.props.collapseTop ? "0 1 0px" : "1 1 0px")
      }
    }, H.div({
      style: {
        flex: "1 1 0px",
        borderRight: this.props.n,
        borderBottom: this.props.w
      }
    }), H.div({
      style: {
        flex: "1 1 0px",
        borderBottom: this.props.e
      }
    })), H.div({
      style: {
        display: "flex",
        flex: "1 1 0px"
      }
    }, H.div({
      style: {
        flex: "1 1 0px",
        borderRight: this.props.s
      }
    }), H.div({
      style: {
        flex: "1 1 0px"
      }
    })));
  };

  return CrossComponent;

})(React.Component);
