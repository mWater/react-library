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
exports.GanttChart = void 0;
const react_1 = __importStar(require("react"));
const AutoSizeComponent_1 = __importDefault(require("./AutoSizeComponent"));
const moment_1 = __importDefault(require("moment"));
/** Height reserved for horiz scroll bar */
const scrollBarHeight = 20;
/** Height of all header parts of the bar section */
const headerHeight = 40;
/** Height of each row */
const rowHeight = 21;
/** Display an editable GANTT chart */
function GanttChart(props) {
    /** Style of labels on left */
    const labelStyle = {
        height: rowHeight,
        paddingTop: 0,
        whiteSpace: "nowrap",
        cursor: props.onRowClick ? "pointer" : "arrow"
    };
    /** Index of row being hovered over */
    const [hoverIndex, setHoverIndex] = react_1.useState(null);
    /** Overall container (for measuring mouse position) */
    const containerRef = react_1.useRef(null);
    /** Reset hover when out */
    const handleMouseLeave = (ev) => {
        setHoverIndex(null);
    };
    /** Handle mouse moves to hover rows */
    const handleMouseMove = (ev) => {
        if (!containerRef.current) {
            return;
        }
        // Do not update if within dropdown
        let target = ev.target;
        while (target) {
            if (target.classList.contains("dropdown-menu")) {
                return;
            }
            target = target.parentElement;
        }
        // Get relative Y
        const y = ev.clientY - containerRef.current.getBoundingClientRect().top;
        const rowIndex = Math.floor((y - headerHeight) / rowHeight);
        setHoverIndex(rowIndex >= 0 && rowIndex < props.rows.length ? rowIndex : null);
    };
    /** Handle mouse moves to hover rows */
    const handleClick = (ev) => {
        if (!containerRef.current) {
            return;
        }
        // Ignore if dropdown
        let target = ev.target;
        while (target) {
            if (target.classList.contains("menu")) {
                return;
            }
            target = target.parentElement;
        }
        // Get relative Y
        const y = ev.clientY - containerRef.current.getBoundingClientRect().top;
        const rowIndex = Math.floor((y - headerHeight) / rowHeight);
        if (rowIndex >= 0 && rowIndex < props.rows.length && props.onRowClick) {
            props.onRowClick(rowIndex);
        }
    };
    /** Render a single label in left pane */
    const renderLabel = (row, index) => {
        // Determine if can move left (indented and previous is previous level)
        const canMoveLeft = props.onMoveRowLeft && row.level > 0 && index > 0 && props.rows[index - 1].level == row.level - 1;
        // Determine if can move right (previous is same level)
        const canMoveRight = props.onMoveRowRight && index > 0 && props.rows[index - 1].level == row.level;
        // Determine if can move up (exists previous of same level before one of previous level)
        let canMoveUp = false;
        for (let i = index - 1; i >= 0; i--) {
            if (props.rows[i].level < row.level) {
                break;
            }
            if (props.rows[i].level == row.level) {
                canMoveUp = props.onMoveRowUp != null;
                break;
            }
        }
        // Determine if can move down (exists next of same level before one of next level)
        let canMoveDown = false;
        for (let i = index + 1; i < props.rows.length; i++) {
            if (props.rows[i].level < row.level) {
                break;
            }
            if (props.rows[i].level == row.level) {
                canMoveDown = props.onMoveRowDown != null;
                break;
            }
        }
        // Determine if dropdown menu should be shown
        const showMenu = canMoveLeft || canMoveRight || canMoveUp || canMoveDown
            || props.onInsertRowBelow != null || props.onInsertRowAbove != null || props.onInsertChildRow != null
            || props.onRemoveRow != null;
        return react_1.default.createElement("div", { key: index, className: "gantt-label", style: Object.assign(Object.assign({}, labelStyle), { paddingLeft: row.level * 10, position: "relative", paddingRight: 25 }) },
            react_1.default.createElement("span", { style: { fontSize: 12 }, onClick: () => { if (props.onRowClick) {
                    props.onRowClick(index);
                } } }, row.label),
            showMenu ?
                react_1.default.createElement("div", { className: "menu", style: { position: "absolute", right: 5, top: 1 } },
                    react_1.default.createElement("div", { style: { cursor: "pointer", visibility: hoverIndex == index ? "visible" : "hidden" }, "data-toggle": "dropdown" },
                        react_1.default.createElement("i", { className: "fa fa-caret-square-o-down text-primary" })),
                    react_1.default.createElement("ul", { className: "dropdown-menu", style: { marginTop: 0 } },
                        props.onInsertRowAbove != null ?
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { onClick: () => props.onInsertRowAbove(index) },
                                    react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-chevron-up" }),
                                    " ",
                                    props.T("Add Above")))
                            : null,
                        props.onInsertRowBelow != null ?
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { onClick: () => props.onInsertRowBelow(index) },
                                    react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-chevron-down" }),
                                    " ",
                                    props.T("Add Below")))
                            : null,
                        props.onInsertChildRow != null ?
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { onClick: () => props.onInsertChildRow(index) },
                                    react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-chevron-right" }),
                                    " ",
                                    props.T("Add Subitem")))
                            : null,
                        canMoveUp ? react_1.default.createElement("li", { key: "moveUp" },
                            react_1.default.createElement("a", { onClick: () => props.onMoveRowUp(index) },
                                react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-arrow-up" }),
                                " ",
                                props.T("Move Up"))) : null,
                        canMoveDown ? react_1.default.createElement("li", { key: "moveDown" },
                            react_1.default.createElement("a", { onClick: () => props.onMoveRowDown(index) },
                                react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-arrow-down" }),
                                " ",
                                props.T("Move Down"))) : null,
                        canMoveLeft ? react_1.default.createElement("li", { key: "moveLeft" },
                            react_1.default.createElement("a", { onClick: () => props.onMoveRowLeft(index) },
                                react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-arrow-left" }),
                                " ",
                                props.T("Move Left"))) : null,
                        canMoveRight ? react_1.default.createElement("li", { key: "moveRight" },
                            react_1.default.createElement("a", { onClick: () => props.onMoveRowRight(index) },
                                react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-arrow-right" }),
                                " ",
                                props.T("Move Right"))) : null,
                        props.onRemoveRow ? react_1.default.createElement("li", { key: "removeRow" },
                            react_1.default.createElement("a", { onClick: () => props.onRemoveRow(index) },
                                react_1.default.createElement("i", { className: "fa fa-fw text-muted fa-remove" }),
                                " ",
                                props.T("Remove"))) : null))
                : null);
    };
    return react_1.default.createElement("div", { style: { position: "relative" }, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onClick: handleClick, ref: containerRef },
        react_1.default.createElement("style", null, `@media print { .no-print { display: none } }}`),
        react_1.default.createElement("div", { key: "hover-row" }, hoverIndex != null ?
            react_1.default.createElement("div", { style: { left: 0, right: 0, top: headerHeight + rowHeight * hoverIndex, height: rowHeight, position: "absolute", backgroundColor: "#EEE" } })
            : null),
        react_1.default.createElement("div", { key: "main", style: { display: "grid", gridTemplateColumns: "auto 1fr" } },
            react_1.default.createElement("div", { key: "left", style: { paddingLeft: 5, paddingTop: headerHeight, marginBottom: scrollBarHeight } },
                props.rows.map(renderLabel),
                props.onAddRow ?
                    react_1.default.createElement("div", { key: "add", className: "no-print" },
                        react_1.default.createElement("a", { style: { fontSize: 12, cursor: "pointer" }, onClick: props.onAddRow }, props.addRowLabel ? props.addRowLabel : react_1.default.createElement("i", { className: "fa fa-plus" })))
                    : null),
            react_1.default.createElement(AutoSizeComponent_1.default, { key: "right", injectWidth: true, injectHeight: true }, (size) => {
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
    /** Container (for measuring mouse position) */
    const containerRef = react_1.useRef(null);
    /** Amount to scroll by in next render */
    const scrollLeftBy = react_1.useRef(0);
    // Expand to nearest month
    const startDate = moment_1.default(props.startDate, "YYYY-MM-DD").startOf("month");
    const endDate = moment_1.default(props.endDate, "YYYY-MM-DD").endOf("month");
    // Calculate total days
    const totalDays = endDate.diff(startDate, "days");
    const initialScale = props.width / totalDays;
    // Set initial scale
    const [scale, setScale] = react_1.useState(initialScale);
    /** Function to convert a date into pixels at current scale */
    const dateToPx = react_1.useCallback((date) => {
        return Math.floor(date.diff(startDate, "days") * scale) + 0.5;
    }, [scale, props.startDate]);
    /** Allow zooming using mouse wheel */
    const handleWheel = (ev) => {
        if (!containerRef.current) {
            return;
        }
        let newScale;
        if (ev.deltaY > 0) {
            // Prevent scaling down
            newScale = Math.max(initialScale, scale / 1.1);
        }
        else if (ev.deltaY < 0) {
            newScale = scale * 1.1;
        }
        else {
            return;
        }
        // Set scale
        setScale(newScale);
        // Get relative X to keep in the same place
        const x = ev.clientX - containerRef.current.getBoundingClientRect().left + containerRef.current.scrollLeft;
        // Determine offset needed to keep mouse position in same place
        const diffX = (x / scale * newScale) - x;
        scrollLeftBy.current = diffX;
    };
    // Perform scrolling immediately
    react_1.useLayoutEffect(() => {
        if (scrollLeftBy.current != 0 && containerRef.current) {
            containerRef.current.scrollBy({ left: scrollLeftBy.current });
            scrollLeftBy.current = 0;
        }
    });
    /** Draw a bar of the GANTT chart */
    const renderBar = (row, index) => {
        // Draw bars for actual ranges
        if (row.startDate && row.endDate && row.startDate != row.endDate) {
            const rowStartDate = moment_1.default(row.startDate, "YYYY-MM-DD");
            const rowEndDate = moment_1.default(row.endDate, "YYYY-MM-DD");
            return react_1.default.createElement("rect", { key: index, x: dateToPx(rowStartDate), y: headerHeight + 5 + rowHeight * index, width: dateToPx(rowEndDate) - dateToPx(rowStartDate), height: 11, rx: 4, color: row.color, fill: row.color });
        }
        // Diamonds for single dates
        else if (row.startDate || row.endDate) {
            const rowDate = moment_1.default(row.startDate || row.endDate, "YYYY-MM-DD");
            const x = dateToPx(rowDate);
            const y = headerHeight + rowHeight * index + (rowHeight / 2);
            const size = 7;
            return react_1.default.createElement("polygon", { key: index, points: [x - size, y, x, y - size, x + size, y, x, y + size].join(" "), fill: row.color });
        }
        else {
            return null;
        }
    };
    const todayPx = dateToPx(moment_1.default());
    return react_1.default.createElement("div", { style: { overflowX: "auto", position: "relative", height: "100%" }, ref: containerRef, onWheel: handleWheel },
        react_1.default.createElement("svg", { width: totalDays * scale, height: props.height - scrollBarHeight },
            react_1.default.createElement(DayWeekScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height, scale: scale }),
            react_1.default.createElement(MonthScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height }),
            react_1.default.createElement(YearScale, { dateToPx: dateToPx, startDate: startDate, endDate: endDate, height: props.height }),
            react_1.default.createElement("line", { key: "today", x1: todayPx, y1: 32, x2: todayPx, y2: props.height, stroke: "#3CF" }),
            props.rows.map(renderBar)));
}
/** Display scale at top for each year */
function YearScale(props) {
    const { startDate, endDate } = props;
    const date = moment_1.default(startDate);
    /** Start and end of each segment to draw */
    const segs = [];
    while (date.isBefore(endDate)) {
        const itemStart = moment_1.default(date);
        date.add(1, "years");
        const itemEnd = moment_1.default(date);
        if (itemEnd.isAfter(endDate)) {
            segs.push([itemStart, endDate]);
        }
        else {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("g", null, segs.map((seg, i) => {
        const left = props.dateToPx(seg[0]);
        const right = props.dateToPx(seg[1]);
        return react_1.default.createElement("g", { key: i },
            react_1.default.createElement("line", { key: "left", x1: left, y1: 0, x2: left, y2: props.height, stroke: "#DDD", strokeWidth: 1 }),
            react_1.default.createElement("line", { key: "right", x1: right, y1: 0, x2: right, y2: props.height, stroke: "#DDD", strokeWidth: 1 }),
            react_1.default.createElement("text", { "text-anchor": "middle", x: (left + right) / 2, y: 8, fill: "#333", fontSize: 9 }, seg[0].format("YYYY")));
    }));
}
/** Display scale at top for each month */
function MonthScale(props) {
    const { startDate, endDate } = props;
    const date = moment_1.default(startDate);
    /** Start and end of each segment to draw */
    const segs = [];
    while (date.isBefore(endDate)) {
        const itemStart = moment_1.default(date);
        date.add(1, "months");
        const itemEnd = moment_1.default(date);
        if (itemEnd.isAfter(endDate)) {
            segs.push([itemStart, endDate]);
        }
        else {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("g", null, segs.map((seg, i) => {
        const left = props.dateToPx(seg[0]);
        const right = props.dateToPx(seg[1]);
        return react_1.default.createElement("g", { key: i },
            react_1.default.createElement("line", { key: "left", x1: left, y1: 11, x2: left, y2: props.height, stroke: "#DDD", strokeWidth: 1 }),
            react_1.default.createElement("line", { key: "right", x1: right, y1: 11, x2: right, y2: props.height, stroke: "#DDD", strokeWidth: 1 }),
            react_1.default.createElement("text", { key: "text", "text-anchor": "middle", x: (left + right) / 2, y: 21, fill: "#666", fontSize: 9 }, seg[0].format("MMM")));
    }));
}
/** Display scale at top for each week or day (if scale permits) */
function DayWeekScale(props) {
    const { startDate, endDate } = props;
    const date = moment_1.default(startDate).startOf("week");
    /** Start and end of each segment to draw */
    const segs = [];
    // Display nothing if too zoomed out
    if (props.scale < 1.6) {
        return null;
    }
    while (date.isBefore(endDate)) {
        const itemStart = moment_1.default(date);
        // Use day if scale permits
        date.add(1, props.scale > 15 ? "days" : "weeks");
        const itemEnd = moment_1.default(date);
        // Weeks should not extend outside of range
        if (!itemEnd.isAfter(endDate) && !itemStart.isBefore(startDate)) {
            segs.push([itemStart, itemEnd]);
        }
    }
    return react_1.default.createElement("g", null, segs.map((seg, i) => {
        const left = props.dateToPx(seg[0]);
        const right = props.dateToPx(seg[1]);
        return react_1.default.createElement("g", { key: i },
            react_1.default.createElement("line", { key: "left", x1: left, y1: 22, x2: left, y2: props.height, stroke: "#F6F6F6", strokeWidth: 1 }),
            react_1.default.createElement("line", { key: "right", x1: right, y1: 22, x2: right, y2: props.height, stroke: "#F6F6F6", strokeWidth: 1 }),
            react_1.default.createElement("text", { key: "text", "text-anchor": "middle", x: (left + right) / 2, y: 31, fill: "#AAA", fontSize: 9 }, seg[0].format("DD")));
    }));
}
