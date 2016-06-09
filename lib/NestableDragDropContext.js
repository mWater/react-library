var DragDropContext, React,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

DragDropContext = require('react-dnd').DragDropContext;

module.exports = function(backend) {
  return function(component) {
    var NestableDragDropContextContainer;
    return NestableDragDropContextContainer = (function(superClass) {
      extend(NestableDragDropContextContainer, superClass);

      function NestableDragDropContextContainer() {
        return NestableDragDropContextContainer.__super__.constructor.apply(this, arguments);
      }

      NestableDragDropContextContainer.contextTypes = {
        dragDropManager: React.PropTypes.object
      };

      NestableDragDropContextContainer.prototype.render = function() {
        if (this.context.dragDropManager) {
          return React.createElement(component, this.props);
        } else {
          return React.createElement(DragDropContext(backend)(component), this.props);
        }
      };

      return NestableDragDropContextContainer;

    })(React.Component);
  };
};
