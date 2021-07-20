"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const R = react_1.default.createElement;
// Modal popup based on react
class ModalPopupComponent extends react_1.default.Component {
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
exports.default = ModalPopupComponent;
ModalPopupComponent.show = (modalFunc, onClose) => {
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
        let dialogStyle;
        let dialogClass = "modal-dialog";
        if (this.props.size === "large") {
            dialogClass += " modal-lg";
        }
        if (this.props.size === "small") {
            dialogClass += " modal-sm";
        }
        if (this.props.size === "full") {
            dialogStyle = { width: "95%" };
        }
        if (this.props.width) {
            dialogStyle = { width: this.props.width };
        }
        const rootStyle = {
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1040 // Same as bootstrap modals
        };
        const overlayStyle = {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)"
        };
        return R("div", { style: rootStyle }, R("style", null, "body { overflow-y: hidden }"), R("div", { style: overlayStyle, onClick: this.props.onClose }), R("div", { className: dialogClass, style: dialogStyle }, R("div", { className: "modal-content" }, this.props.header
            ? R("div", { className: "modal-header" }, this.props.showCloseX
                ? R("button", { className: "close", onClick: this.props.onClose }, R("span", null, "\u00d7"))
                : undefined, R("h4", { className: "modal-title" }, this.props.header))
            : undefined, R("div", {
            className: "modal-body",
            style: {
                maxHeight: window.innerHeight - (this.props.header ? 56 : 0) - (this.props.footer ? 65 : 0) - 30 - 30,
                overflowY: "auto"
            }
        }, this.props.children), this.props.footer ? R("div", { className: "modal-footer" }, this.props.footer) : undefined, !this.props.header && this.props.showCloseX
            ? R("button", { className: "close", style: { position: "absolute", right: 10, top: 10 } }, // Put above body
            R("span", { onClick: this.props.onClose }, "\u00d7"))
            : undefined)));
    }
}
