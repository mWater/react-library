"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const test_utils_1 = __importDefault(require("react-dom/test-utils"));
const R = react_1.default.createElement;
// Test component that can be created, have its element changed, have clicks and other actions simulated
// Used for unit testing React components
class TestComponent {
    constructor(elem) {
        this.div = document.createElement("div");
        this.comp = react_dom_1.default.render(elem, this.div);
    }
    setElement(elem) {
        return react_dom_1.default.render(elem, this.div);
    }
    getComponent() {
        return this.comp;
    }
    destroy() {
        return react_dom_1.default.unmountComponentAtNode(this.div);
    }
    // Finds DOM node by pattern (optional)
    findDOMNodesByText(pattern) {
        const matches = [];
        function findRecursively(node) {
            // Recurse to children
            if (node.nodeType === 1) {
                return (() => {
                    const result = [];
                    for (let subnode of node.childNodes) {
                        // Check text match
                        if (subnode.nodeType === 3 && subnode.nodeValue.match(pattern)) {
                            matches.push(node);
                        }
                        result.push(findRecursively(subnode));
                    }
                    return result;
                })();
            }
        }
        findRecursively(react_dom_1.default.findDOMNode(this.comp));
        return matches;
    }
    // Finds a DOM node by pattern
    findDOMNodeByText(pattern) {
        return this.findDOMNodesByText(pattern)[0];
    }
    // Find a subcomponent by a pattern (deprecated)
    findComponentByText(pattern) {
        return this.findDOMNodesByText(pattern);
    }
    // Find input field
    findInput() {
        return test_utils_1.default.findRenderedDOMComponentWithTag(this.comp, "input");
    }
    findComponentById(id) {
        return test_utils_1.default.findAllInRenderedTree(this.comp, (c) => c.id === id)[0];
    }
    static click(comp) {
        return test_utils_1.default.Simulate.click(comp);
    }
    static pressEnter(comp) {
        return test_utils_1.default.Simulate.keyDown(comp, { key: "Enter", keyCode: 13, which: 13 });
    }
    static pressTab(comp) {
        return test_utils_1.default.Simulate.keyDown(comp, { key: "Tab", keyCode: 9, which: 9 });
    }
    static changeValue(comp, value) {
        comp.value = value;
        return test_utils_1.default.Simulate.change(comp);
    }
}
exports.default = TestComponent;
