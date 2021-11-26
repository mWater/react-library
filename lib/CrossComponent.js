"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
// Displays a box with a cross in it with any segments optionally drawn
class CrossComponent extends react_1.default.Component {
    render() {
        // Make horizontal two boxes
        return R("div", {
            style: { display: "flex", flexDirection: "column", width: this.props.width, height: this.props.height }
        }, R("div", { style: { display: "flex", flex: this.props.collapseTop ? "0 1 0px" : "1 1 0px" } }, R("div", {
            style: { display: "flex", flex: "1 1 0px", borderRight: this.props.n, borderBottom: this.props.w }
        }), R("div", { style: { display: "flex", flex: "1 1 0px", borderBottom: this.props.e } })), R("div", { style: { display: "flex", flex: "1 1 0px" } }, R("div", { style: { display: "flex", flex: "1 1 0px", borderRight: this.props.s } }), R("div", { style: { display: "flex", flex: "1 1 0px" } })));
    }
}
exports.default = CrossComponent;
CrossComponent.defaultProps = {
    width: "100%",
    height: "100%"
};
