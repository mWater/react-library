"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridComponentDemo = void 0;
const react_1 = __importStar(require("react"));
const GridComponent_1 = require("./GridComponent");
const react_select_1 = __importDefault(require("react-select"));
exports.GridComponentDemo = () => {
    const [colWidths, setColWidths] = react_1.useState([100, 200, 300]);
    const renderCell = (props) => {
        return react_1.default.createElement("div", { style: { padding: 10 } }, `x${props.row}:${props.col}`);
    };
    const renderColHeader = (props) => {
        return react_1.default.createElement("div", { style: { padding: 5 } }, `x${props.col}`);
    };
    const renderRowHeader = (props) => {
        return (react_1.default.createElement("div", { style: { padding: 10 } },
            react_1.default.createElement("i", { className: "fa fa-open" })));
    };
    const renderCellEditor = (props) => {
        return react_1.default.createElement(Editor, { width: props.width, setSaveEdit: props.setSaveEdit });
    };
    return (react_1.default.createElement("div", { style: { padding: 20 } },
        react_1.default.createElement(GridComponent_1.GridComponent, { colWidths: colWidths, onColWidthsChange: setColWidths, height: 600, numRows: 1000, rowHeight: 40, rowHeaderWidth: 40, colHeaderHeight: 32, width: 800, renderCell: renderCell, renderColHeader: renderColHeader, renderRowHeader: renderRowHeader, renderCellEditor: renderCellEditor, colHeaderExtraWidth: 20, renderColHeaderExtra: () => "X", rowHeaderExtraHeight: 20, renderRowHeaderExtra: () => "X", canEdit: () => true })));
};
const Editor = (props) => {
    const [value, setValue] = react_1.useState(null);
    props.setSaveEdit(() => {
        //alert(value)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 10000);
        });
    });
    /** Focus on select */
    const selectRef = react_1.useCallback((node) => {
        if (node) {
            setTimeout(() => {
                node.focus();
            }, 0);
        }
    }, []);
    return (react_1.default.createElement("div", { style: { width: props.width } },
        react_1.default.createElement(react_select_1.default, { options: [
                { value: "x", label: "X" },
                { value: "y", label: "Y" }
            ], value: value, onChange: (v) => {
                console.log("onChange");
                setValue(v);
            }, onBlur: () => {
                console.log("onBlur");
            }, isMulti: true, ref: selectRef })));
};
