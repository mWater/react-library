"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.GanttChart = void 0;
var react_1 = __importStar(require("react"));
var AutoSizeComponent_1 = __importDefault(require("./AutoSizeComponent"));
var moment_1 = __importDefault(require("moment"));
/** Height reserved for horiz scroll bar */
var scrollBarHeight = 20;
/** Height of all header parts of the bar section */
var headerHeight = 40;
/** Height of each row */
var rowHeight = 21;
/** Display an editable GANTT chart */
function GanttChart(props) {
    /** Style of labels on left */
    var labelStyle = {
        height: rowHeight,
        paddingTop: 0,
        whiteSpace: "nowrap",
        cursor: props.onRowClick ? "pointer" : "arrow"
    };
    /** Index of row being hovered over */
    var _a = react_1.useState(null), hoverIndex = _a[0], setHoverIndex = _a[1];
    /** Overall container (for measuring mouse position) */
    var containerRef = react_1.useRef(null);
    /** Reset hover when out */
    var handleMouseOut = function (ev) {
        setHoverIndex(null);
    };
    /** Handle mouse moves to hover rows */
    var handleMouseMove = function (ev) {
        if (!containerRef.current) {
            return;
        }
        // // Do not update if within dropdown
        // let target: HTMLElement | null = ev.target as HTMLElement
        // while (target) {
        //   if (target.classList.contains("menu")) {
        //     console.log(ev.target)
        //     return
        //   }
        //   target = target.parentElement
        // }
        // Get relative Y
        var y = ev.clientY - containerRef.current.getBoundingClientRect().top;
        var rowIndex = Math.floor((y - headerHeight) / rowHeight);
        setHoverIndex(rowIndex >= 0 && rowIndex < props.rows.length ? rowIndex : null);
    };
    /** Handle mouse moves to hover rows */
    var handleClick = function (ev) {
        if (!containerRef.current) {
            return;
        }
        // Ignore if dropdown
        var target = ev.target;
        while (target) {
            if (target.classList.contains("menu")) {
                console.log(ev.target);
                return;
            }
            target = target.parentElement;
        }
        // Get relative Y
        var y = ev.clientY - containerRef.current.getBoundingClientRect().top;
        var rowIndex = Math.floor((y - headerHeight) / rowHeight);
        if (rowIndex >= 0 && rowIndex < props.rows.length && props.onRowClick) {
            props.onRowClick(rowIndex);
        }
    };
    /** Render a single label in left pane */
    var renderLabel = function (row, index) {
        // Determine if can move left (indented and previous is previous level)
        var canMoveLeft = props.onMoveRowLeft && row.level > 0 && index > 0 && props.rows[index - 1].level == row.level - 1;
        // Determine if can move right (previous is same level)
        var canMoveRight = props.onMoveRowRight && index > 0 && props.rows[index - 1].level == row.level;
        // Determine if can move up (exists previous of same level before one of previous level)
        var canMoveUp = false;
        for (var i = index - 1; i > 0; i--) {
            if (props.rows[i].level < row.level) {
                break;
            }
            if (props.rows[i].level == row.level) {
                canMoveUp = props.onMoveRowUp != null;
                break;
            }
        }
        // Determine if can move down (exists next of same level before one of next level)
        var canMoveDown = false;
        for (var i = index + 1; i < props.rows.length; i++) {
            if (props.rows[i].level < row.level) {
                break;
            }
            if (props.rows[i].level == row.level) {
                canMoveDown = props.onMoveRowDown != null;
                break;
            }
        }
        // Determine if dropdown menu should be shown
        var showMenu = canMoveLeft || canMoveRight || canMoveUp || canMoveDown || props.onInsertRowBelow != null || props.onInsertRowAbove != null;
        return react_1.default.createElement("div", { key: index, className: "gantt-label", style: __assign(__assign({}, labelStyle), { paddingLeft: row.level * 10, position: "relative", paddingRight: 25 }) },
            react_1.default.createElement("span", { style: { fontSize: 12 }, onClick: function () { if (props.onRowClick) {
                    props.onRowClick(index);
                } } }, row.label),
            showMenu ?
                react_1.default.createElement("div", { className: "menu", style: { position: "absolute", right: 5, top: 1 } },
                    react_1.default.createElement("div", { style: { cursor: "pointer", visibility: hoverIndex == index ? "visible" : "hidden" }, "data-toggle": "dropdown" },
                        react_1.default.createElement("i", { className: "fa fa-caret-square-o-down text-primary" })),
                    react_1.default.createElement("ul", { className: "dropdown-menu" },
                        props.onInsertRowAbove != null ?
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { onClick: function () { return props.onInsertRowAbove(index); } },
                                    react_1.default.createElement("i", { className: "fa fa-chevron-up" }),
                                    " ",
                                    props.T("Insert Above")))
                            : null,
                        props.onInsertRowBelow != null ?
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { onClick: function () { return props.onInsertRowBelow(index); } },
                                    react_1.default.createElement("i", { className: "fa fa-chevron-down" }),
                                    " ",
                                    props.T("Insert Below")))
                            : null,
                        canMoveUp ? react_1.default.createElement("li", { key: "moveUp" },
                            react_1.default.createElement("a", { onClick: function () { return props.onMoveRowUp(index); } },
                                react_1.default.createElement("i", { className: "fa fa-arrow-up" }),
                                " ",
                                props.T("Move Up"))) : null,
                        canMoveDown ? react_1.default.createElement("li", { key: "moveDown" },
                            react_1.default.createElement("a", { onClick: function () { return props.onMoveRowDown(index); } },
                                react_1.default.createElement("i", { className: "fa fa-arrow-down" }),
                                " ",
                                props.T("Move Down"))) : null,
                        canMoveLeft ? react_1.default.createElement("li", { key: "moveLeft" },
                            react_1.default.createElement("a", { onClick: function () { return props.onMoveRowLeft(index); } },
                                react_1.default.createElement("i", { className: "fa fa-arrow-left" }),
                                " ",
                                props.T("Move Left"))) : null,
                        canMoveRight ? react_1.default.createElement("li", { key: "moveRight" },
                            react_1.default.createElement("a", { onClick: function () { return props.onMoveRowRight(index); } },
                                react_1.default.createElement("i", { className: "fa fa-arrow-right" }),
                                " ",
                                props.T("Move Right"))) : null))
                : null);
    };
    return react_1.default.createElement("div", { style: { position: "relative" }, onMouseMove: handleMouseMove, onMouseOut: handleMouseOut, onClick: handleClick, ref: containerRef },
        react_1.default.createElement("style", null),
        react_1.default.createElement("div", { key: "hover-row" }, hoverIndex != null ?
            react_1.default.createElement("div", { style: { left: 0, right: 0, top: headerHeight + rowHeight * hoverIndex, height: rowHeight, position: "absolute", backgroundColor: "#EEE" } })
            : null),
        react_1.default.createElement("div", { key: "main", style: { display: "grid", gridTemplateColumns: "auto 1fr" } },
            react_1.default.createElement("div", { key: "left", style: { paddingLeft: 5, paddingTop: headerHeight, marginBottom: scrollBarHeight } },
                props.rows.map(renderLabel),
                props.onAddRow ?
                    react_1.default.createElement("div", { key: "add" },
                        react_1.default.createElement("a", { style: { fontSize: 12, cursor: "pointer" }, onClick: props.onAddRow }, props.addRowLabel ? props.addRowLabel : react_1.default.createElement("i", { className: "fa fa-plus" })))
                    : null),
            react_1.default.createElement(AutoSizeComponent_1.default, { key: "right", injectWidth: true, injectHeight: true }, function (size) {
                if (!size.width || !size.height) {
                    // Placeholder until width is known
                    return react_1.default.createElement("div", null);
                }
                return react_1.default.createElement(GanttBarArea, { width: size.width - 5, height: size.height, startDate: props.startDate, endDate: props.endDate, rows: props.rows, onRowClick: props.onRowClick });
            })));
}
exports.GanttChart = GanttChart;
/** Area of the Gantt chart that contains the bars */
function GanttBarArea(props) {
    // Expand to nearest month
    var startDate = moment_1.default(props.startDate, "YYYY-MM-DD").startOf("month");
    var endDate = moment_1.default(props.endDate, "YYYY-MM-DD").endOf("month");
    // Calculate total days
    var totalDays = endDate.diff(startDate, "days");
    var initialScale = props.width / totalDays;
    // Set initial scale
    var _a = react_1.useState(initialScale), scale = _a[0], setScale = _a[1];
    var barStyle = {
        height: 11,
        position: "absolute",
        borderRadius: 4,
        borderStyle: "solid",
        borderWidth: 1,
        cursor: props.onRowClick ? "pointer" : "arrow"
    };
    /** Function to convert a date into pixels at current scale */
    var dateToPx = react_1.useCallback(function (date) {
        return date.diff(startDate, "days") * scale;
    }, [scale, props.startDate]);
    /** Allow zooming using mouse wheel */
    var handleWheel = function (ev) {
        if (ev.deltaY > 0) {
            // Prevent scaling down
            setScale(function (s) { return Math.max(initialScale, s / 1.1); });
        }
        if (ev.deltaY < 0) {
            setScale(function (s) { return s * 1.1; });
        }
    };
    /** Draw a bar of the GANTT chart */
    var renderBar = function (row, index) {
        // Draw bars for actual ranges
        if (row.startDate && row.endDate && row.startDate != row.endDate) {
            var rowStartDate = moment_1.default(row.startDate, "YYYY-MM-DD");
            var rowEndDate = moment_1.default(row.endDate, "YYYY-MM-DD");
            return react_1.default.createElement("div", { key: index, style: __assign(__assign({}, barStyle), { top: headerHeight + 5 + rowHeight * index, left: dateToPx(rowStartDate), width: dateToPx(rowEndDate) - dateToPx(rowStartDate), backgroundColor: row.color, color: row.color }) });
        }
        // Diamonds for single dates
        else if (row.startDate || row.endDate) {
            var rowDate = moment_1.default(row.startDate || row.endDate, "YYYY-MM-DD");
            return react_1.default.createElement("div", { key: index, style: {
                    position: "absolute",
                    top: headerHeight + rowHeight * index - 1,
                    left: dateToPx(rowDate) - 5,
                    color: row.color,
                    cursor: props.onRowClick ? "pointer" : "arrow",
                    fontSize: 16
                } }, "\u25C6");
        }
        else {
            return null;
        }
    };
    return react_1.default.createElement("div", { style: { overflowX: "auto", position: "relative", height: "100%" }, onWheel: handleWheel },
        react_1.default.createElement(YearScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height }),
        react_1.default.createElement(MonthScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height }),
        react_1.default.createElement(DayWeekScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height, scale: scale }),
        props.rows.map(renderBar));
}
/** Display scale at top for each month */
function MonthScale(props) {
    var startDate = props.startDate, endDate = props.endDate;
    var date = moment_1.default(startDate);
    /** Start and end of each segment to draw */
    var segs = [];
    while (date.isBefore(endDate)) {
        var itemStart = moment_1.default(date);
        date.add(1, "months");
        var itemEnd = moment_1.default(date);
        if (itemEnd.isAfter(endDate)) {
            segs.push([itemStart, endDate]);
        }
        else {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("div", null, segs.map(function (seg, i) {
        var left = props.dateToPx(seg[0]);
        var right = props.dateToPx(seg[1]);
        return react_1.default.createElement("div", { key: i, style: {
                position: "absolute",
                top: 11,
                left: left,
                width: right - left + 1,
                textAlign: "center",
                fontSize: 9,
                height: props.height - 11 - scrollBarHeight,
                color: "#666",
                borderLeft: "solid 1px #DDD",
                borderRight: "solid 1px #DDD"
            } }, seg[0].format("MMM"));
    }));
}
/** Display scale at top for each year */
function YearScale(props) {
    var startDate = props.startDate, endDate = props.endDate;
    var date = moment_1.default(startDate);
    /** Start and end of each segment to draw */
    var segs = [];
    while (date.isBefore(endDate)) {
        var itemStart = moment_1.default(date);
        date.add(1, "years");
        var itemEnd = moment_1.default(date);
        if (itemEnd.isAfter(endDate)) {
            segs.push([itemStart, endDate]);
        }
        else {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("div", null, segs.map(function (seg, i) {
        var left = props.dateToPx(seg[0]);
        var right = props.dateToPx(seg[1]);
        return react_1.default.createElement("div", { key: i, style: {
                position: "absolute",
                top: 0,
                left: left,
                width: right - left + 1,
                textAlign: "center",
                fontSize: 9,
                color: "#333",
                borderLeft: "solid 1px #DDD",
                borderRight: "solid 1px #DDD"
            } }, seg[0].format("YYYY"));
    }));
}
/** Display scale at top for each week or day (if scale permits) */
function DayWeekScale(props) {
    var startDate = props.startDate, endDate = props.endDate;
    var date = moment_1.default(startDate).startOf("week");
    /** Start and end of each segment to draw */
    var segs = [];
    // Display nothing if too zoomed out
    if (props.scale < 1.6) {
        return null;
    }
    while (date.isBefore(endDate)) {
        var itemStart = moment_1.default(date);
        // Use day if scale permits
        date.add(1, props.scale > 15 ? "days" : "weeks");
        var itemEnd = moment_1.default(date);
        // Weeks should not extend outside of range
        if (!itemEnd.isAfter(endDate) && !itemStart.isBefore(startDate)) {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("div", null, segs.map(function (seg, i) {
        var left = props.dateToPx(seg[0]);
        var right = props.dateToPx(seg[1]);
        return react_1.default.createElement("div", { key: i, style: {
                position: "absolute",
                top: 22,
                left: left,
                width: right - left + 1,
                textAlign: "center",
                fontSize: 9,
                height: props.height - 22 - scrollBarHeight,
                color: "#AAA",
                borderLeft: "dotted 1px #F0F0F0",
                borderRight: "dotted 1px #F0F0F0"
            } },
            react_1.default.createElement("div", { style: { backgroundColor: "rgba(255, 255, 255, 0.5)" } }, seg[0].format("DD")));
    }));
}
