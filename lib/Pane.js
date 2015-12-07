var H, Pane, React,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

H = React.DOM;

module.exports = Pane = (function(superClass) {
  extend(Pane, superClass);

  function Pane() {
    return Pane.__super__.constructor.apply(this, arguments);
  }

  Pane.propTypes = {
    split: React.PropTypes.oneOf(['vertical', 'horizontal']),
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  };

  Pane.defaultProps = function() {
    return {
      split: 'vertical'
    };
  };

  Pane.prototype.render = function() {
    var classNames, style;
    classNames = ["pane"];
    style = {
      flex: "0 0 auto",
      position: "relative"
    };
    if (this.props.split === 'vertical') {
      classNames.push('vertical');
      if (this.props.width != null) {
        style.width = this.props.width;
      }
    } else {
      classNames.push('horizontal');
      if (this.props.width != null) {
        style.height = this.props.width;
      }
    }
    if (this.props.width) {
      classNames.push("first");
    } else {
      style.flex = 1;
    }
    return H.div({
      style: style,
      className: classNames.join(" ")
    }, this.props.children);
  };

  return Pane;

})(React.Component);
