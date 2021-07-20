"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Pane
//
// Internally used by SplitPane to create the resizable panes
//
// Vertical splitpane panes gets the classes "pane vertical"
// Horizontal splitpane panes gets the classes "pane horizontal"
//
// The first pane gets an added class "first"
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
class Pane extends react_1.default.Component {
    static defaultProps() {
        return { split: "vertical" };
    }
    render() {
        const classNames = ["pane"];
        const style = {
            flex: "0 0 auto",
            position: "relative"
        };
        if (this.props.split === "vertical") {
            classNames.push("vertical");
            if (this.props.width != null) {
                style.width = this.props.width;
            }
        }
        else {
            classNames.push("horizontal");
            if (this.props.width != null) {
                style.height = this.props.width;
            }
        }
        if (this.props.width) {
            classNames.push("first");
        }
        else {
            style.flex = 1;
            if (this.props.split === "vertical") {
                style.width = "100%";
            }
            else {
                style.height = "100%";
            }
        }
        return R("div", { style, className: classNames.join(" ") }, this.props.children);
    }
}
exports.default = Pane;
