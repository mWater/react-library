var AutoSizeComponent, R, React, SampleComponent, SplitPane,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

SplitPane = require('./SplitPane');

AutoSizeComponent = require('./AutoSizeComponent');

R = React.createElement;

module.exports = SampleComponent = (function(superClass) {
  extend(SampleComponent, superClass);

  function SampleComponent() {
    return SampleComponent.__super__.constructor.apply(this, arguments);
  }

  SampleComponent.prototype.render = function() {
    var style1;
    style1 = {
      height: 300,
      width: 300,
      border: "1px solid #000"
    };
    return React.createElement(SplitPane, {
      split: "vertical",
      firstPaneSize: "20%",
      minFirstPaneSize: 100
    }, [
      R(AutoSizeComponent, {
        injectWidth: true,
        injectHeight: true
      }, R('div', null, "width only")), React.createElement(SplitPane, {
        split: "horizontal",
        firstPaneSize: "20%",
        minFirstPaneSize: 100
      }, [
        R(AutoSizeComponent, {
          injectWidth: true,
          injectHeight: true
        }, R('div', {
          height: 300
        }, "height")), React.createElement(SplitPane, {
          split: "vertical",
          firstPaneSize: 300,
          minFirstPaneSize: 200
        }, [
          R(AutoSizeComponent, {
            injectWidth: true,
            injectHeight: true
          }, R('div', {
            height: 300
          }, "width and height")), R('div', null)
        ])
      ])
    ]);
  };

  return SampleComponent;

})(React.Component);
