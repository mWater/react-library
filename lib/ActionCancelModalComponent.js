"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
const ModalPopupComponent_1 = __importDefault(require("./ModalPopupComponent"));
// Modal with action and cancel buttons
class ActionCancelModalComponent extends react_1.default.Component {
    render() {
        return react_1.default.createElement(ModalPopupComponent_1.default, {
            size: this.props.size,
            header: this.props.title,
            footer: [
                this.props.onDelete
                    ? R("button", {
                        key: "delete",
                        type: "button",
                        onClick: this.props.onDelete,
                        className: "btn btn-danger me-auto"
                    }, this.props.deleteBusy ? [R("i", { className: "fa fa-spinner fa-spin" }), "\u00A0"] : undefined, this.props.deleteLabel || "Delete")
                    : undefined,
                this.props.onAction
                    ? R("button", {
                        key: "action",
                        type: "button",
                        onClick: this.props.onAction,
                        disabled: this.props.actionBusy,
                        className: "btn btn-primary"
                    }, this.props.actionBusy ? [R("i", { className: "fa fa-spinner fa-spin" }), "\u00A0"] : undefined, this.props.actionLabel || "Save")
                    : undefined,
                R("button", {
                    key: "cancel",
                    type: "button",
                    onClick: this.props.onCancel,
                    className: "btn btn-secondary"
                }, this.props.cancelLabel || (this.props.onAction ? "Cancel" : "Close")),
            ]
        }, this.props.children);
    }
}
exports.default = ActionCancelModalComponent;
