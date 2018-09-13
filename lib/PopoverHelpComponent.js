var OverlayTrigger, Popover, PopoverHelpComponent, PropTypes, R, React, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

_ = require('lodash');

React = require('react');

R = React.createElement;

Popover = require('react-bootstrap/lib/Popover');

OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

module.exports = PopoverHelpComponent = (function(superClass) {
  extend(PopoverHelpComponent, superClass);

  function PopoverHelpComponent() {
    return PopoverHelpComponent.__super__.constructor.apply(this, arguments);
  }

  PopoverHelpComponent.propTypes = {
    placement: PropTypes.string
  };

  PopoverHelpComponent.defaultProps = {
    placement: "top"
  };

  PopoverHelpComponent.prototype.render = function() {
    return R(OverlayTrigger, {
      trigger: ["hover", "focus"],
      placement: this.props.placement,
      overlay: R(Popover, null, this.props.children)
    }, R('span', {
      className: "text-muted",
      style: {
        cursor: "pointer"
      }
    }, R('span', {
      className: "glyphicon glyphicon-question-sign"
    })));
  };

  return PopoverHelpComponent;

})(React.Component);
