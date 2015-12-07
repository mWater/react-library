var Block, Block2, H, ModalPopupComponent, R, React, ReactDOM, SampleComponent, VerticalTreeLayoutComponent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

SampleComponent = require('./SampleComponent');

ModalPopupComponent = require('./ModalPopupComponent');

VerticalTreeLayoutComponent = require('./VerticalTreeLayoutComponent');

Block = (function(superClass) {
  extend(Block, superClass);

  function Block() {
    return Block.__super__.constructor.apply(this, arguments);
  }

  Block.prototype.render = function() {
    return H.div({
      style: {
        height: 200,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block;

})(React.Component);

Block2 = (function(superClass) {
  extend(Block2, superClass);

  function Block2() {
    return Block2.__super__.constructor.apply(this, arguments);
  }

  Block2.prototype.render = function() {
    return H.div({
      style: {
        height: 300,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block2;

})(React.Component);

$(function() {
  var elem;
  elem = R(VerticalTreeLayoutComponent, {
    line: "solid 1px red",
    height: 50,
    headElem: R(Block)
  }, R(Block), R(Block2), R(Block), R(Block));
  return ReactDOM.render(elem, document.getElementById("main"));
});
