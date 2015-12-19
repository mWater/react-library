var Block, Block2, H, ModalPopupComponent, ModalSample, R, React, ReactDOM, SampleComponent, VerticalTreeLayoutComponent, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

_ = require('lodash');

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

ModalSample = (function(superClass) {
  extend(ModalSample, superClass);

  function ModalSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalSample.prototype.render = function() {
    var sizes;
    sizes = ["large", "small", ""];
    return H.div(null, H.a({
      onClick: this.startEditing
    }, "Edit me"), this.state.editing ? R(ModalPopupComponent, {
      header: "OUTER",
      size: _.sample(sizes),
      onClose: this.handleModalClose
    }, R(ModalSample)) : void 0);
  };

  return ModalSample;

})(React.Component);

$(function() {
  var elem;
  elem = R(ModalSample);
  return ReactDOM.render(elem, document.getElementById("main"));
});
