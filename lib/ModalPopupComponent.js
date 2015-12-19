var H, Modal, ModalComponentContent, ModalPopupComponent, React, ReactDOM, _, className,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

_ = require('lodash');

Modal = require('react-overlays/lib/Modal');

className = require("classnames");

module.exports = ModalPopupComponent = (function(superClass) {
  extend(ModalPopupComponent, superClass);

  function ModalPopupComponent() {
    this.close = bind(this.close, this);
    return ModalPopupComponent.__super__.constructor.apply(this, arguments);
  }

  ModalPopupComponent.propTypes = {
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    size: React.PropTypes.string,
    onClose: React.PropTypes.func
  };

  ModalPopupComponent.prototype.close = function() {
    var base;
    return typeof (base = this.props).onClose === "function" ? base.onClose() : void 0;
  };

  ModalPopupComponent.prototype.render = function() {
    var backdropStyle, dialogClass, modalContent, modalProps, modalStyle;
    modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      outline: 0
    };
    backdropStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };
    dialogClass = className({
      "modal-dialog": true,
      "modal-lg": this.props.size === "large",
      "modal-sm": this.props.size === "small"
    });
    modalProps = {
      show: true,
      onHide: this.close,
      backdrop: true,
      backdropStyle: backdropStyle,
      style: modalStyle,
      ariaLabelledby: 'modal-label'
    };
    modalContent = H.div({
      className: dialogClass,
      style: {
        outline: 0
      }
    }, React.createElement(ModalComponentContent, this.props));
    return H.div(null, React.createElement(Modal, modalProps, modalContent));
  };

  return ModalPopupComponent;

})(React.Component);

ModalComponentContent = (function(superClass) {
  extend(ModalComponentContent, superClass);

  function ModalComponentContent() {
    return ModalComponentContent.__super__.constructor.apply(this, arguments);
  }

  ModalComponentContent.propTypes = {
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    size: React.PropTypes.string
  };

  ModalComponentContent.prototype.render = function() {
    return H.div({
      className: "modal-content"
    }, this.props.header ? H.div({
      className: "modal-header"
    }, H.button({
      className: "close"
    }, H.span({
      onClick: this.props.onClose
    }, "X")), H.h4({
      className: "modal-title"
    }, this.props.header)) : void 0, H.div({
      className: "modal-body"
    }, this.props.children), this.props.footer ? H.div({
      className: "modal-footer"
    }, this.props.footer) : void 0);
  };

  return ModalComponentContent;

})(React.Component);
