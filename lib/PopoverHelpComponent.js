var H, OverlayTrigger, Popover, PopoverHelpComponent, R, React, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

React = require('react');

H = React.DOM;

R = React.createElement;

Popover = require('react-bootstrap/lib/Popover');

OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

module.exports = PopoverHelpComponent = (function(superClass) {
  extend(PopoverHelpComponent, superClass);

  function PopoverHelpComponent() {
    return PopoverHelpComponent.__super__.constructor.apply(this, arguments);
  }

  PopoverHelpComponent.propTypes = {
    placement: React.PropTypes.string
  };

  PopoverHelpComponent.defaultProps = {
    placement: "top"
  };

  PopoverHelpComponent.prototype.render = function() {
    return R(OverlayTrigger, {
      trigger: "click",
      placement: this.props.placement,
      overlay: R(Popover, null, this.props.children)
    }, H.span({
      className: "text-muted",
      style: {
        cursor: "pointer"
      }
    }, H.span({
      className: "glyphicon glyphicon-question-sign"
    })));
  };

  return PopoverHelpComponent;

})(React.Component);
