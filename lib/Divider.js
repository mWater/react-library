"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
// Divider
//
// Internally used by SplitPane to create the draggable divider between 2 panes
//
// Vertical splitpane divider gets the classes "divider vertical"
// Horizontal splitpane divider gets the classes "divider horizontal"
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
class Divider extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.onMouseDown = (event) => {
            return this.props.onMouseDown(event);
        };
    }
    render() {
        const classNames = ["divider"];
        if (this.props.split === "vertical") {
            classNames.push("vertical");
        }
        if (this.props.split === "horizontal") {
            classNames.push("horizontal");
        }
        else {
            classNames.push("vertical");
        }
        return R("div", { className: classNames.join(" "), onMouseDown: this.onMouseDown });
    }
}
exports.default = Divider;
