var H, React, SampleComponent, SplitPane,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

H = React.DOM;

SplitPane = require('./SplitPane');

module.exports = SampleComponent = (function(superClass) {
  extend(SampleComponent, superClass);

  function SampleComponent() {
    return SampleComponent.__super__.constructor.apply(this, arguments);
  }

  SampleComponent.prototype.render = function() {
    return React.createElement(SplitPane, {
      split: "vertical",
      firstPaneSize: "20%",
      minFirstPaneSize: 100
    }, [
      H.div(null), React.createElement(SplitPane, {
        split: "horizontal",
        firstPaneSize: "20%",
        minFirstPaneSize: 100
      }, [
        H.div(null), React.createElement(SplitPane, {
          split: "vertical",
          firstPaneSize: 300,
          minFirstPaneSize: 200
        }, [H.div(null), H.div(null)])
      ])
    ]);
  };

  return SampleComponent;

})(React.Component);
