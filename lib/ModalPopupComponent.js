var H, InnerModalComponent, ModalPopupComponent, React, ReactDOM, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

_ = require('lodash');

module.exports = ModalPopupComponent = (function(superClass) {
  extend(ModalPopupComponent, superClass);

  function ModalPopupComponent() {
    return ModalPopupComponent.__super__.constructor.apply(this, arguments);
  }

  ModalPopupComponent.propTypes = {
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    size: React.PropTypes.string,
    showCloseX: React.PropTypes.bool,
    onClose: React.PropTypes.func
  };

  ModalPopupComponent.prototype.componentDidMount = function() {
    this.modalNode = $('<div></div>').get(0);
    $("body").append(this.modalNode);
    return this.update(this.props);
  };

  ModalPopupComponent.prototype.componentWillReceiveProps = function(nextProps) {
    return this.update(nextProps);
  };

  ModalPopupComponent.prototype.update = function(props) {
    var elem;
    elem = React.createElement(InnerModalComponent, props);
    return ReactDOM.unstable_renderSubtreeIntoContainer(this, elem, this.modalNode);
  };

  ModalPopupComponent.prototype.componentWillUnmount = function() {
    ReactDOM.unmountComponentAtNode(this.modalNode);
    return $(this.modalNode).remove();
  };

  ModalPopupComponent.prototype.render = function() {
    return null;
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
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    size: React.PropTypes.string,
    showCloseX: React.PropTypes.bool,
    onClose: React.PropTypes.func
  };

  InnerModalComponent.prototype.render = function() {
    var dialogClass, overlayStyle, rootStyle;
    dialogClass = "modal-dialog";
    if (this.props.size === "large") {
      dialogClass += " modal-lg";
    }
    if (this.props.size === "small") {
      dialogClass += " modal-sm";
    }
    rootStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1030
    };
    overlayStyle = {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    };
    return H.div({
      style: rootStyle
    }, H.style(null, 'body { overflow-y: hidden }'), H.div({
      style: overlayStyle
    }), H.div({
      className: dialogClass
    }, H.div({
      className: "modal-content"
    }, this.props.header ? H.div({
      className: "modal-header"
    }, this.props.showCloseX ? H.button({
      className: "close"
    }, H.span({
      onClick: this.props.onClose
    }, "\u00d7")) : void 0, H.h4({
      className: "modal-title"
    }, this.props.header)) : void 0, H.div({
      className: "modal-body",
      style: {
        maxHeight: window.innerHeight - 56 - 65 - 30 - 30,
        overflowY: "auto"
      }
    }, this.props.children), this.props.footer ? H.div({
      className: "modal-footer"
    }, this.props.footer) : void 0, !this.props.header && this.props.showCloseX ? H.button({
      className: "close",
      style: {
        position: "absolute",
        right: 10,
        top: 10
      }
    }, H.span({
      onClick: this.props.onClose
    }, "\u00d7")) : void 0)));
  };

  return InnerModalComponent;

})(React.Component);
