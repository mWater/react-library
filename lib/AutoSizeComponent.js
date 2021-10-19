"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const withPolyfill_1 = __importDefault(require("react-resize-detector/build/withPolyfill"));
const R = react_1.default.createElement;
// Automatically injects the width or height of the DOM element into the
// child component, updating as window resizes.
// If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth
class AutoSizeComponent extends react_1.default.Component {
    render() {
        return R(withPolyfill_1.default, { handleWidth: this.props.injectWidth, handleHeight: this.props.injectHeight }, ({ width, height, targetRef }) => {
            // Set style of outer div
            let innerElem;
            const style = {};
            if (this.props.injectWidth) {
                style.width = "100%";
            }
            if (this.props.injectHeight) {
                style.height = "100%";
            }
            // Return placeholder until width/height known
            if (width == null || height == null) {
                return R("div", { style, ref: targetRef });
            }
            const overrides = {};
            if (this.props.injectWidth) {
                overrides.width = width;
            }
            if (this.props.injectHeight) {
                overrides.height = height;
            }
            if (typeof this.props.children === "function") {
                innerElem = this.props.children(overrides);
            }
            else {
                // DEPRECATED
                innerElem = react_1.default.cloneElement(react_1.default.Children.only(this.props.children), overrides);
            }
            // Call children to get element if function
            return R("div", { style, ref: targetRef }, innerElem);
        });
    }
}
exports.default = AutoSizeComponent;
