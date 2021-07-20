"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttChartDemo = void 0;
const react_1 = __importDefault(require("react"));
const ez_localize_1 = require("ez-localize");
const GanttChart_1 = require("./GanttChart");
function GanttChartDemo() {
    return (react_1.default.createElement("div", { style: { paddingTop: 20 } },
        react_1.default.createElement(GanttChart_1.GanttChart, { rows: [
                { color: "#68cdee", level: 0, startDate: "2020-01-14", endDate: "2020-05-23", label: "Activity 1" },
                { color: "#68cdee", level: 1, startDate: "2020-02-14", endDate: "2020-06-23", label: "Activity 2" },
                { color: "#68cdee", level: 2, startDate: "2020-04-12", endDate: null, label: "Activity 3" },
                { color: "#68cdee", level: 0, startDate: "2020-01-14", endDate: "2020-05-23", label: "Activity 1" },
                { color: "#68cdee", level: 1, startDate: "2020-02-14", endDate: "2020-06-23", label: "Activity 2" },
                { color: "#68cdee", level: 1, startDate: "2020-04-12", endDate: "2020-07-23", label: "Activity 3" }
            ], startDate: "2020-01-01", endDate: "2020-12-31", T: ez_localize_1.defaultT, onMoveRowDown: () => { }, onMoveRowUp: () => { }, onMoveRowLeft: () => { }, onMoveRowRight: () => { }, onRowClick: () => {
                alert("onRowClick");
            }, onAddRow: () => {
                alert("sdfasdf");
            }, onInsertRowAbove: () => { }, onInsertRowBelow: () => { }, onInsertChildRow: () => { }, onRemoveRow: () => { } })));
}
exports.GanttChartDemo = GanttChartDemo;
