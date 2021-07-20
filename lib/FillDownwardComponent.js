"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
// Component which sets its height to automatically fill all remaining vertical space
class FillDownwardComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.updateSize = () => {
            const { self } = this;
            if (!self) {
                return;
            }
            // Get vertical position of self
            const vpos = self.getBoundingClientRect().top + window.scrollY;
            // Get vertical space remaining
            const height = window.innerHeight - vpos;
            // Limit to 50 at smallest
            return this.setState({ height: Math.max(height, 50) });
        };
        this.state = { height: null };
    }
    componentDidMount() {
        // Listen for changes
        window.addEventListener("resize", this.updateSize);
        return this.updateSize();
    }
    componentWillUnmount() {
        // Stop listening to resize events
        return window.removeEventListener("resize", this.updateSize);
    }
    render() {
        // If height is not known, render placeholder
        if (!this.state.height) {
            return R("div", {
                style: { height: 100, position: "relative" },
                ref: (c) => {
                    return (this.self = c);
                }
            });
        }
        // Render with correct height
        return R("div", {
            style: { height: this.state.height, position: "relative" },
            ref: (c) => {
                return (this.self = c);
            }
        }, this.props.children);
    }
}
exports.default = FillDownwardComponent;
