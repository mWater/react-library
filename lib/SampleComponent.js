"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SplitPane_1 = __importDefault(require("./SplitPane"));
const AutoSizeComponent_1 = __importDefault(require("./AutoSizeComponent"));
const R = react_1.default.createElement;
// This is a nice sample component
class SampleComponent extends react_1.default.Component {
    render() {
        const style1 = {
            height: 300,
            width: 300,
            border: "1px solid #000"
        };
        return react_1.default.createElement(SplitPane_1.default, { split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 100 }, [
            //      R 'div', null
            R(AutoSizeComponent_1.default, { injectWidth: true, injectHeight: true }, R("div", null, "width only")),
            react_1.default.createElement(SplitPane_1.default, { split: "horizontal", firstPaneSize: "20%", minFirstPaneSize: 100 }, [
                R(AutoSizeComponent_1.default, { injectWidth: true, injectHeight: true }, R("div", { height: 300 }, "height")),
                react_1.default.createElement(SplitPane_1.default, { split: "vertical", firstPaneSize: 300, minFirstPaneSize: 200 }, [
                    R(AutoSizeComponent_1.default, { injectWidth: true, injectHeight: true }, R("div", { height: 300 }, "width and height")),
                    R("div", null)
                ])
            ])
        ]);
    }
}
exports.default = SampleComponent;
