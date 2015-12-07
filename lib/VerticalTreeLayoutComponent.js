var CrossComponent, H, R, React, ReactDOM, VerticalTreeLayoutComponent, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

CrossComponent = require('./CrossComponent');

module.exports = VerticalTreeLayoutComponent = (function(superClass) {
  extend(VerticalTreeLayoutComponent, superClass);

  function VerticalTreeLayoutComponent() {
    return VerticalTreeLayoutComponent.__super__.constructor.apply(this, arguments);
  }

  VerticalTreeLayoutComponent.propTypes = {
    headElem: React.PropTypes.node,
    height: React.PropTypes.number,
    line: React.PropTypes.string.isRequired
  };

  VerticalTreeLayoutComponent.prototype.renderChildren = function() {
    var child, children, i, isCenter, j, len, ref;
    len = React.Children.count(this.props.children);
    children = [];
    for (i = j = 0, ref = len * 2 + 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      isCenter = i === len;
      if (i === 0) {
        children.push(R(CrossComponent, {
          key: i,
          height: this.props.height
        }));
      } else if (i === len * 2) {
        children.push(R(CrossComponent, {
          key: i,
          height: this.props.height
        }));
      } else if (i % 2 === 0) {
        children.push(R(CrossComponent, {
          key: i,
          height: this.props.height,
          e: this.props.line,
          w: this.props.line,
          n: (isCenter ? this.props.line : void 0)
        }));
      } else {
        child = React.Children.toArray(this.props.children)[Math.floor(i / 2)];
        children.push(H.div({
          key: i,
          style: {
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "flex-start"
          }
        }, React.createElement(CrossComponent, {
          n: (isCenter ? this.props.line : void 0),
          s: this.props.line,
          e: i < (len * 2 - 1) ? this.props.line : void 0,
          w: i > 1 ? this.props.line : void 0,
          height: this.props.height
        }), child));
      }
    }
    return children;
  };

  VerticalTreeLayoutComponent.prototype.render = function() {
    return H.div(null, H.div({
      key: "head",
      style: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center"
      }
    }, this.props.headElem), H.div({
      key: "children",
      style: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start"
      }
    }, this.renderChildren()));
  };

  return VerticalTreeLayoutComponent;

})(React.Component);
