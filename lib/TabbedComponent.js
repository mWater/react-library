"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
/** Simple bootstrap tabbed component */
class TabbedComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleClick = (tabId) => {
            if (this.props.onTabClick != null) {
                return this.props.onTabClick(tabId);
            }
            else {
                return this.setState({ tabId });
            }
        };
        this.handleRemove = (tab, ev) => {
            ev.stopPropagation();
            return tab.onRemove();
        };
        this.renderTab = (tab) => {
            let tabId;
            if (this.props.tabId != null) {
                ;
                ({ tabId } = this.props);
            }
            else {
                ;
                ({ tabId } = this.state);
            }
            return R("li", { key: tab.id, className: "nav-item" }, R("a", {
                onClick: this.handleClick.bind(null, tab.id),
                style: { cursor: "pointer" },
                className: tabId === tab.id ? "nav-link active" : "nav-link"
            }, tab.label, tab.onRemove
                ? R("button", { type: "button", className: "btn btn-sm btn-link", onClick: this.handleRemove.bind(null, tab) }, R("span", { className: "fa fa-times" }))
                : undefined));
        };
        this.state = { tabId: this.props.initialTabId };
    }
    render() {
        let tabId;
        if (this.props.tabId != null) {
            ;
            ({ tabId } = this.props);
        }
        else {
            ;
            ({ tabId } = this.state);
        }
        const currentTab = lodash_1.default.findWhere(this.props.tabs, { id: tabId });
        return R("div", null, R("ul", { key: "tabs", className: "nav nav-tabs", style: { marginBottom: 10 } }, lodash_1.default.map(this.props.tabs, this.renderTab), this.props.onAddTab
            ? R("li", { key: "_add", className: "nav-item" }, R("a", { className: "nav-link", onClick: this.props.onAddTab, style: { cursor: "pointer" } }, R("i", { className: "fa fa-plus" })))
            : undefined), R("div", { key: "currentTab" }, currentTab ? currentTab.elem : undefined));
    }
}
exports.default = TabbedComponent;
