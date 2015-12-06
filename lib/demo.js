var H, ModalPopupComponent, React, ReactDOM;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

ModalPopupComponent = require('./ModalPopupComponent');

$(function() {
  return ModalPopupComponent.show((function(_this) {
    return function(onClose) {
      return React.createElement(ModalPopupComponent, {}, "TEST");
    };
  })(this));
});
