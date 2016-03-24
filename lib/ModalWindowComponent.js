var H, InnerModalComponent, ModalWindowComponent, React, ReactDOM, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

_ = require('lodash');

module.exports = ModalWindowComponent = (function(superClass) {
  extend(ModalWindowComponent, superClass);

  function ModalWindowComponent() {
    return ModalWindowComponent.__super__.constructor.apply(this, arguments);
  }

  ModalWindowComponent.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func
  };

  ModalWindowComponent.prototype.componentDidMount = function() {
    this.modalNode = $('<div></div>').get(0);
    $("body").append(this.modalNode);
    return this.update(this.props);
  };

  ModalWindowComponent.prototype.componentWillReceiveProps = function(nextProps) {
    return this.update(nextProps);
  };

  ModalWindowComponent.prototype.update = function(props) {
    var elem;
    elem = React.createElement(InnerModalComponent, props);
    return ReactDOM.unstable_renderSubtreeIntoContainer(this, elem, this.modalNode);
  };

  ModalWindowComponent.prototype.componentWillUnmount = function() {
    ReactDOM.unmountComponentAtNode(this.modalNode);
    return $(this.modalNode).remove();
  };

  ModalWindowComponent.prototype.render = function() {
    return null;
  };

  ModalWindowComponent.show = function(modalFunc, onClose) {
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

  return ModalWindowComponent;

})(React.Component);

InnerModalComponent = (function(superClass) {
  extend(InnerModalComponent, superClass);

  function InnerModalComponent() {
    return InnerModalComponent.__super__.constructor.apply(this, arguments);
  }

  InnerModalComponent.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func,
    outerPadding: React.PropTypes.number,
    innerPadding: React.PropTypes.number
  };

  InnerModalComponent.defaultProps = {
    outerPadding: 40,
    innerPadding: 20
  };

  InnerModalComponent.prototype.render = function() {
    var closeStyle, contentStyle, overlayStyle, windowStyle;
    if (!this.props.isOpen) {
      return null;
    }
    overlayStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1030,
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    };
    windowStyle = {
      position: "fixed",
      left: this.props.outerPadding,
      right: this.props.outerPadding,
      top: this.props.outerPadding,
      bottom: this.props.outerPadding,
      zIndex: 1030,
      backgroundColor: "white",
      borderRadius: 10,
      border: "solid 1px #AAA"
    };
    contentStyle = {
      position: "absolute",
      left: this.props.innerPadding,
      right: this.props.innerPadding,
      top: this.props.innerPadding,
      bottom: this.props.innerPadding,
      overflowY: "auto"
    };
    closeStyle = {
      position: "absolute",
      right: 8,
      top: 8,
      color: "#888"
    };
    return H.div({
      className: "mwater-visualization-modal-window-component"
    }, H.style(null, 'body { overflow-y: hidden }'), H.div({
      style: overlayStyle,
      onClick: this.props.onRequestClose
    }), H.div({
      style: windowStyle
    }, this.props.onRequestClose ? H.div({
      style: closeStyle
    }, H.span({
      className: "glyphicon glyphicon-remove",
      onClick: this.props.onRequestClose
    })) : void 0, H.div({
      style: contentStyle
    }, this.props.children)));
  };

  return InnerModalComponent;

})(React.Component);
