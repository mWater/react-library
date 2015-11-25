var H, React, SampleComponent,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

H = React.DOM;

module.exports = SampleComponent = (function(superClass) {
  extend(SampleComponent, superClass);

  function SampleComponent() {
    this.handleClick = bind(this.handleClick, this);
    SampleComponent.__super__.constructor.apply(this, arguments);
    this.state = {
      count: 0
    };
  }

  SampleComponent.prototype.handleClick = function() {
    return this.setState({
      count: this.state.count + 1
    });
  };

  SampleComponent.prototype.render = function() {
    return H.div({
      style: {
        padding: 10
      }
    }, H.button({
      type: "button",
      onClick: this.handleClick
    }, "Increment"), "I'm at " + this.state.count);
  };

  return SampleComponent;

})(React.Component);
