"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
const CrossComponent_1 = __importDefault(require("./CrossComponent"));
// Makes a vertical tree component with lines between
class VerticalTreeLayoutComponent extends react_1.default.Component {
    renderChildren() {
        const len = react_1.default.Children.count(this.props.children);
        const children = [];
        // Alternate spacer and items, ending with spacer
        for (let i = 0, end = len * 2 + 1, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            const isCenter = i === len;
            // Add spacer at start
            if (i === 0) {
                children.push(R(CrossComponent_1.default, { key: i, collapseTop: true, height: this.props.height }));
                // Add spacer at end
            }
            else if (i === len * 2) {
                children.push(R(CrossComponent_1.default, { key: i, collapseTop: true, height: this.props.height }));
                // Add spacer if odd
            }
            else if (i % 2 === 0) {
                children.push(R(CrossComponent_1.default, {
                    key: i,
                    collapseTop: true,
                    height: this.props.height,
                    e: this.props.line,
                    w: this.props.line,
                    n: isCenter ? this.props.line : undefined
                }));
            }
            else {
                const child = react_1.default.Children.toArray(this.props.children)[Math.floor(i / 2)];
                // It sets {flexShrink: 0} because without it the boxes where overlapping (on iPad at least)
                //   Note: that fix is based on that article: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
                //         (It contains many other interesting fixes for flexBox)
                children.push(R("div", {
                    key: i,
                    className: "flexBox",
                    style: { display: "flex", flexFlow: "column nowrap", justifyContent: "flex-start", flexShrink: 0 }
                }, react_1.default.createElement(CrossComponent_1.default, {
                    collapseTop: true,
                    n: isCenter ? this.props.line : undefined,
                    s: this.props.line,
                    e: i < len * 2 - 1 ? this.props.line : undefined,
                    w: i > 1 ? this.props.line : undefined,
                    height: this.props.height
                }), child));
            }
        }
        return children;
    }
    // Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)
    render() {
        return R("div", { className: "flexBox", style: { flexFlow: "column nowrap", alignItems: "center" } }, 
        // Center head
        this.props.headElem, react_1.default.Children.count(this.props.children) > 0
            ? R(CrossComponent_1.default, { collapseTop: true, height: this.props.height, s: this.props.line })
            : undefined, 
        // Put children
        R("div", {
            key: "children",
            className: "flexBox",
            style: { flexFlow: "row nowrap", justifyContent: "flex-start", width: "100%" }
        }, this.renderChildren()));
    }
}
exports.default = VerticalTreeLayoutComponent;
