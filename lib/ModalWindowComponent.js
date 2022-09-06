"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const R = react_1.default.createElement;
// Modal window that fills screen
class ModalWindowComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        // Add special region to body
        this.modalNode = document.createElement("div");
        // append is not supported everywhere https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Browser_compatibility
        if (document.fullscreenElement) {
            document.fullscreenElement.appendChild(this.modalNode);
        }
        else {
            document.body.appendChild(this.modalNode);
        }
    }
    componentWillUnmount() {
        return this.modalNode.remove();
    }
    render() {
        return react_dom_1.default.createPortal(R(InnerModalComponent, this.props), this.modalNode);
    }
}
exports.default = ModalWindowComponent;
/** Render something into a top-level div */
ModalWindowComponent.show = (modalFunc, onClose) => {
    // Create temporary div to render into
    const tempDiv = document.createElement("div");
    // Create close function
    const close = () => {
        // Unrender
        react_dom_1.default.unmountComponentAtNode(tempDiv);
        // Remove div
        tempDiv.remove();
        // Call onClose
        if (onClose) {
            return onClose();
        }
    };
    const popupElem = modalFunc(close);
    return react_dom_1.default.render(popupElem, tempDiv);
};
// Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class InnerModalComponent extends react_1.default.Component {
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        const overlayStyle = {
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1055,
            backgroundColor: "rgba(0, 0, 0, 0.7)"
        };
        const windowStyle = {
            position: "fixed",
            left: this.props.outerPadding,
            right: this.props.outerPadding,
            top: this.props.outerPadding,
            bottom: this.props.outerPadding,
            zIndex: 1055,
            backgroundColor: this.props.backgroundColor,
            borderRadius: 10,
            border: "solid 1px #AAA"
        };
        const contentStyle = {
            position: "absolute",
            left: this.props.innerPadding,
            right: this.props.innerPadding,
            top: this.props.innerPadding,
            bottom: this.props.innerPadding,
            overflowY: "auto" // Allow scrolling
        };
        const closeStyle = {
            position: "absolute",
            right: 8,
            top: 8,
            color: "#888",
            cursor: "pointer"
        };
        return R("div", { className: "modal-window-component" }, R("style", null, "body { overflow-y: hidden }"), R("div", {
            style: overlayStyle,
            onClick: this.props.onRequestClose,
            className: "modal-window-component-overlay"
        }), R("div", { style: windowStyle, className: "modal-window-component-window" }, R("div", { style: contentStyle }, this.props.children), this.props.onRequestClose
            ?
                R("div", { style: closeStyle }, R("button", { type: "button", className: "btn-close", onClick: this.props.onRequestClose }))
            : undefined));
    }
}
InnerModalComponent.defaultProps = {
    outerPadding: 40,
    innerPadding: 20,
    backgroundColor: "white"
};
