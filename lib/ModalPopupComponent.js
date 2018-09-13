var InnerModalComponent, ModalPopupComponent, PropTypes, R, React, ReactDOM, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

ReactDOM = require('react-dom');

R = React.createElement;

_ = require('lodash');

module.exports = ModalPopupComponent = (function(superClass) {
  extend(ModalPopupComponent, superClass);

  ModalPopupComponent.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    size: PropTypes.string,
    showCloseX: PropTypes.bool,
    onClose: PropTypes.func
  };

  function ModalPopupComponent(props) {
    ModalPopupComponent.__super__.constructor.call(this, props);
    this.modalNode = $('<div></div>').get(0);
    $("body").append(this.modalNode);
  }

  ModalPopupComponent.prototype.componentWillUnmount = function() {
    return $(this.modalNode).remove();
  };

  ModalPopupComponent.prototype.render = function() {
    return ReactDOM.createPortal(R(InnerModalComponent, this.props), this.modalNode);
  };

  ModalPopupComponent.show = function(modalFunc, onClose) {
    var close, popupElem, tempDiv;
    tempDiv = $('<div></div>').get(0);
    close = function() {
      ReactDOM.unmountComponentAtNode(tempDiv);
      $(tempDiv).remove();
      if (onClose) {
        return onClose();
      }
    };
    popupElem = modalFunc(close);
    return ReactDOM.render(popupElem, tempDiv);
  };

  return ModalPopupComponent;

})(React.Component);

InnerModalComponent = (function(superClass) {
  extend(InnerModalComponent, superClass);

  function InnerModalComponent() {
    return InnerModalComponent.__super__.constructor.apply(this, arguments);
  }

  InnerModalComponent.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    size: PropTypes.string,
    showCloseX: PropTypes.bool,
    onClose: PropTypes.func
  };

  InnerModalComponent.prototype.render = function() {
    var dialogClass, dialogStyle, overlayStyle, rootStyle;
    dialogClass = "modal-dialog";
    if (this.props.size === "large") {
      dialogClass += " modal-lg";
    }
    if (this.props.size === "small") {
      dialogClass += " modal-sm";
    }
    if (this.props.size === "full") {
      dialogStyle = {
        width: "95%"
      };
    }
    rootStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1040
    };
    overlayStyle = {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    };
    return R('div', {
      style: rootStyle
    }, R('style', null, 'body { overflow-y: hidden }'), R('div', {
      style: overlayStyle,
      onClick: this.props.onClose
    }), R('div', {
      className: dialogClass,
      style: dialogStyle
    }, R('div', {
      className: "modal-content"
    }, this.props.header ? R('div', {
      className: "modal-header"
    }, this.props.showCloseX ? R('button', {
      className: "close",
      onClick: this.props.onClose
    }, R('span', null, "\u00d7")) : void 0, R('h4', {
      className: "modal-title"
    }, this.props.header)) : void 0, R('div', {
      className: "modal-body",
      style: {
        maxHeight: window.innerHeight - 56 - 65 - 30 - 30,
        overflowY: "auto"
      }
    }, this.props.children), this.props.footer ? R('div', {
      className: "modal-footer"
    }, this.props.footer) : void 0, !this.props.header && this.props.showCloseX ? R('button', {
      className: "close",
      style: {
        position: "absolute",
        right: 10,
        top: 10
      }
    }, R('span', {
      onClick: this.props.onClose
    }, "\u00d7")) : void 0)));
  };

  return InnerModalComponent;

})(React.Component);
