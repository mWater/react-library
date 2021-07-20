"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
// SplitPane component
//
// Create a resizable split pane with a draggable divider
//
// React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 200}, [
//   R 'div', null
//   R 'div', null
// ])
//
// Vertical splitpane gets the classes "splitpane vertical"
// Horizontal splitpane divider gets the classes "splitpane horizontal"
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
const Pane_1 = __importDefault(require("./Pane"));
const Divider_1 = __importDefault(require("./Divider"));
const react_dom_1 = __importDefault(require("react-dom"));
class SplitPane extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onMouseUp = () => {
            var _a, _b;
            if (this.state.resizing) {
                this.setState({ resizing: false });
                return (_b = (_a = this.props).onResize) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.firstPaneSize);
            }
        };
        this.onMouseDown = (event) => {
            const dragStartAt = this.props.split === "vertical" ? event.clientX : event.clientY;
            return this.setState({ resizing: true, dragStartAt });
        };
        this.onMouseMove = (event) => {
            if (this.state.resizing) {
                let currentPosition, firstPaneSize;
                if (this.props.split === "vertical") {
                    firstPaneSize = react_dom_1.default.findDOMNode(this.firstPane).offsetWidth;
                    currentPosition = event.clientX;
                }
                else {
                    firstPaneSize = react_dom_1.default.findDOMNode(this.firstPane).offsetHeight;
                    currentPosition = event.clientY;
                }
                const newSize = firstPaneSize - (this.state.dragStartAt - currentPosition);
                this.setState({ dragStartAt: currentPosition });
                if (this.props.minFirstPaneSize != null && this.props.minFirstPaneSize < newSize) {
                    return this.setState({ firstPaneSize: newSize });
                }
            }
        };
        this.state = {
            resizing: false,
            firstPaneSize: this.props.firstPaneSize
        };
    }
    static defaultProps() {
        return { split: "vertical" };
    }
    render() {
        const classNames = ["splitpane"];
        const style = {
            display: "flex",
            flex: 1,
            height: "100%",
            position: "absolute"
        };
        if (this.props.split === "horizontal") {
            style.width = "100%";
            style.top = 0;
            style.bottom = 0;
            style.flexDirection = "column";
            classNames.push("horizontal");
        }
        if (this.props.split === "vertical") {
            style.right = 0;
            style.left = 0;
            style.flexDirection = "row";
            classNames.push("vertical");
        }
        return R("div", { style, className: classNames.join(" "), onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp }, react_1.default.createElement(Pane_1.default, {
            split: this.props.split,
            width: this.state.firstPaneSize,
            ref: (c) => {
                return (this.firstPane = c);
            }
        }, this.props.children[0]), react_1.default.createElement(Divider_1.default, { ref: "divider", split: this.props.split, onMouseDown: this.onMouseDown }), react_1.default.createElement(Pane_1.default, { split: this.props.split, ref: "rightPane" }, this.props.children[1]));
    }
}
exports.default = SplitPane;
