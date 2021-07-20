"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
// Lays out divs vertically, allowing fractional allocation combined with auto-sized ones
// Children must all have keys
// Children will be cloned with height: prop set in case of fractional ones
class VerticalLayoutComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.recalculateSize = (props) => {
            // Calculate available height
            let availableHeight = props.height;
            for (let child of props.children) {
                if (!child) {
                    continue;
                }
                if (props.relativeHeights[child.key]) {
                    continue;
                }
                const node = this[child.key];
                availableHeight -= node.offsetHeight;
            }
            return this.setState({ availableHeight });
        };
        this.state = { availableHeight: 0 };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.height !== this.props.height) {
            return this.recalculateSize(nextProps);
        }
    }
    componentDidMount() {
        return this.recalculateSize(this.props);
    }
    // Get a subcomponent
    getComponent(key) {
        return this[key];
    }
    render() {
        // Calculate scaling
        return R("div", { style: { height: this.props.height } }, react_1.default.Children.map(this.props.children, (child) => {
            if (!child) {
                return;
            }
            // If variable height
            if (child.key && this.props.relativeHeights[child.key]) {
                // If available height is known, render variable
                if (this.state.availableHeight) {
                    const height = this.state.availableHeight * this.props.relativeHeights[child.key];
                    return R("div", { style: { height, position: "relative" } }, R("div", { style: { height, overflowY: "auto" } }, react_1.default.cloneElement(child, {
                        height,
                        ref: (c) => {
                            this[child.key] = c;
                            // Call existing ref
                            if (child.ref) {
                                return child.ref(c);
                            }
                        }
                    })));
                }
                // Otherwise don't show until available height is known
                return null;
            }
            return react_1.default.cloneElement(child, {
                ref: (c) => {
                    return (this[child.key] = c);
                }
            });
        }));
    }
}
exports.default = VerticalLayoutComponent;
