"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
// Displays a spinner with loading in the center
class LoadingComponent extends react_1.default.Component {
    render() {
        return R("div", {
            style: {
                width: this.props.width,
                height: this.props.height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }, this.props.label);
    }
}
exports.default = LoadingComponent;
LoadingComponent.defaultProps = {
    width: "100%",
    height: "100%",
    label: R("div", { className: "text-muted", style: { fontSize: 30 } }, R("i", { className: "fa fa-spin fa-spinner" }), " Loading...")
};
