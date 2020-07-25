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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridComponent = void 0;
var react_1 = __importStar(require("react"));
var react_2 = require("react");
/** Grid that has headers on rows and columns. Has virtual, high-performance scrolling.
 * Handles:
 *  - arrow keys
 *  - click to select
 *  - double-click to edit
 *  - enter to edit
 *  - scrolling
 *  - grid lines
 *  - header highlighting
 *  - cell/header positioning
 *  - rejected editor saving
 *
 * Does not handle:
 *  - content rendering
 *  - header rendering
 *  - editor creation
 *
 * Row header refers to a sticky vertical band to the left of each row, like in a spreadsheet
 *
 * Column header extra is an optional part of the column header to the right of the last column. Used for "+" usually to add a column.
 * Row header extra is an optional part of the row header below of the last row. Used for "+" usually to add a row.
 *
 */
exports.GridComponent = function (props) {
    /** Scroll positions. Used to refresh render */
    var _a = react_2.useState(0), scrollTop = _a[0], setScrollTop = _a[1];
    var _b = react_2.useState(0), scrollLeft = _b[0], setScrollLeft = _b[1];
    /** Currently selected cell */
    var _c = react_2.useState(null), selection = _c[0], setSelection = _c[1];
    /** Editing state. "none" is not editing, "active" is active editor, "saving" is when save has been requested */
    var _d = react_2.useState("none"), editing = _d[0], setEditing = _d[1];
    /** Edit is pending (from doubleclick on other cell). When save is done, start editing again
     * Since this is needed asynchronously, use a ref */
    var editPending = react_2.useRef(false);
    /** Save edit function ref. Editor sets this to block saves */
    var saveEditRef = react_2.useRef(null);
    /** Div of the large inner pane */
    var _e = react_2.useState(null), paneDiv = _e[0], setPaneDiv = _e[1];
    /** Column resize dragging state */
    var _f = react_2.useState(), colResizing = _f[0], setColResizing = _f[1];
    var _g = react_2.useState(), colResizingDelta = _g[0], setColResizingDelta = _g[1];
    var colResizingStartX = react_2.useRef();
    /** Compute column x coordinates */
    var colXs = react_2.useMemo(function () {
        var xs = [];
        // Add widths before visible columns
        var x = props.rowHeaderWidth;
        for (var c = 0; c < props.colWidths.length; c++) {
            xs[c] = x;
            x += props.colWidths[c];
        }
        return xs;
    }, [props.colWidths, props.rowHeaderWidth]);
    /** Gets the row and column (may be null if out of range) for a point */
    var xyToRowCol = function (x, y) {
        var row = Math.floor((y - props.colHeaderHeight) / props.rowHeight);
        var col = null;
        for (var c = 0; c < props.colWidths.length; c++) {
            var colStartX = colXs[c];
            var colEndX = colXs[c] + props.colWidths[c];
            if (x >= colStartX && x < colEndX) {
                col = c;
            }
        }
        return {
            row: row >= 0 && row < props.numRows ? row : null,
            col: col
        };
    };
    /** Gets the bounds of a cell */
    var rowColToXY = function (row, col) {
        var minX = colXs[col];
        var maxX = minX + props.colWidths[col];
        var minY = row * props.rowHeight + props.colHeaderHeight;
        var maxY = minY + props.rowHeight;
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    };
    /** Scrolls the cell into view */
    var scrollIntoView = function (row, col) {
        if (!paneDiv) {
            return;
        }
        var _a = rowColToXY(row, col), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        // Make x in view
        if (minX < paneDiv.scrollLeft + props.rowHeaderWidth) {
            paneDiv.scrollLeft = minX - props.rowHeaderWidth;
            setScrollLeft(paneDiv.scrollLeft);
        }
        else if (maxX > paneDiv.scrollLeft + paneDiv.clientWidth) {
            paneDiv.scrollLeft = maxX - paneDiv.clientWidth;
            setScrollLeft(paneDiv.scrollLeft);
        }
        // Make y in view
        if (minY < paneDiv.scrollTop + props.colHeaderHeight) {
            paneDiv.scrollTop = minY - props.colHeaderHeight;
            setScrollTop(paneDiv.scrollTop);
        }
        else if (maxY > paneDiv.scrollTop + paneDiv.clientHeight) {
            paneDiv.scrollTop = maxY - paneDiv.clientHeight;
            setScrollTop(paneDiv.scrollTop);
        }
    };
    /** Determine range of cells that are visible */
    var visibleRange = null;
    if (paneDiv) {
        // Get visible x and y
        var minY = paneDiv.scrollTop;
        var maxY = paneDiv.scrollTop + paneDiv.clientHeight;
        var minX = paneDiv.scrollLeft;
        var maxX = paneDiv.scrollLeft + paneDiv.clientWidth;
        // Determine ranges
        var _h = xyToRowCol(minX, minY), colStart = _h.col, rowStart = _h.row;
        var _j = xyToRowCol(maxX, maxY), colEnd = _j.col, rowEnd = _j.row;
        // Null means end or start
        visibleRange = {
            rowStart: rowStart != null ? rowStart : 0,
            rowEnd: rowEnd != null ? rowEnd : props.numRows - 1,
            colStart: colStart != null ? colStart : 0,
            colEnd: colEnd != null ? colEnd : props.colWidths.length - 1
        };
    }
    /** Capture the pane div */
    var paneRef = react_2.useCallback(function (node) {
        setPaneDiv(node);
    }, []);
    /** Focus on inner div */
    var innerRef = react_2.useCallback(function (node) {
        if (node) {
            node.focus();
        }
    }, []);
    /** Respond to a scroll event */
    var handleScroll = function () {
        if (!paneDiv) {
            return;
        }
        setScrollLeft(paneDiv.scrollLeft);
        setScrollTop(paneDiv.scrollTop);
    };
    /** Prevent disappearing editor */
    react_1.useEffect(function () {
        if (editing == "active" && selection) {
            scrollIntoView(selection.row, selection.col);
        }
    });
    /** Remove editing if selection is invalid */
    react_1.useEffect(function () {
        // Clear editing if selection doesn't exist anymore (row/column deleted)
        if (selection && (selection.row >= props.numRows || selection.col >= props.colWidths.length)) {
            setSelection(null);
            setEditing("none");
        }
    });
    /** End editing.
     * @returns true if successful, false if cancelled
     */
    var endEditing = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If saving edit, can't end
                    if (editing == "saving") {
                        return [2 /*return*/, false];
                    }
                    if (!(editing == "active")) return [3 /*break*/, 3];
                    setEditing("saving");
                    if (!saveEditRef.current) return [3 /*break*/, 2];
                    return [4 /*yield*/, saveEditRef.current()];
                case 1:
                    // Allow control to abort save
                    if (!(_a.sent())) {
                        setEditing("active");
                        return [2 /*return*/, false];
                    }
                    _a.label = 2;
                case 2:
                    setEditing("none");
                    _a.label = 3;
                case 3: return [2 /*return*/, true];
            }
        });
    }); };
    /** Update selection if needed, scrolling into view. Returns whether was successful (edits can block) */
    var moveSelection = function (sel) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Do nothing if already selected
                    if (selection && selection.col == sel.col && selection.row == sel.row) {
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, endEditing()];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/];
                    }
                    // Set selection
                    setSelection(sel);
                    // If edit pending, start edit
                    if (editPending.current) {
                        editPending.current = false;
                        saveEditRef.current = null;
                        setEditing("active");
                    }
                    // Make selection visible
                    scrollIntoView(sel.row, sel.col);
                    return [2 /*return*/, true];
            }
        });
    }); };
    /** Handle arrow keys and enter */
    var handleKeyDown = function (ev) {
        // Handle arrow keys if not editing 
        if ([37, 38, 39, 40].includes(ev.keyCode) && selection && editing == "none") {
            // Stop it from scolling
            ev.preventDefault();
            // Move selection
            if (ev.keyCode == 37) { // Left
                moveSelection({ row: selection.row, col: Math.max(0, selection.col - 1) });
            }
            if (ev.keyCode == 38) { // Up
                moveSelection({ row: Math.max(selection.row - 1, 0), col: selection.col });
            }
            if (ev.keyCode == 39) { // Right
                moveSelection({ row: selection.row, col: Math.min(props.colWidths.length - 1, selection.col + 1) });
            }
            if (ev.keyCode == 40) { // Down
                moveSelection({ row: Math.min(selection.row + 1, props.numRows - 1), col: selection.col });
            }
        }
        // Enter edits if not editing 
        if (ev.keyCode == 13 && selection && editing == "none") {
            handleEdit(selection.row, selection.col);
        }
    };
    /** Handle mouse down (selects cell) */
    var handleMouseDown = function (row, col, ev) {
        // Handle override in prop
        if (props.onRowClick) {
            props.onRowClick(row);
            return;
        }
        moveSelection({ row: row, col: col });
    };
    /** Attempt to edit a cell. Assumes that cell is already selected, or selection is in progress already */
    var handleEdit = function (row, col) {
        if (!props.canEdit) {
            return;
        }
        // Check if can edit
        Promise.resolve(props.canEdit({ row: row, col: col })).then(function (editable) {
            if (!editable) {
                return;
            }
            // If already editing, do nothing. handleMouseDown will already be trying
            // to switch cells, so if not "saving", then it's because it was refused
            if (editing == "active") {
                return;
            }
            // If saving, set a flag to start editing once move is complete
            if (editing == "saving") {
                editPending.current = true;
                return;
            }
            saveEditRef.current = null;
            setEditing("active");
        });
    };
    /** Double click edits a cell */
    var handleDoubleClick = function (row, col, ev) {
        // If overridden, call prop
        if (props.onRowDoubleClick) {
            props.onRowDoubleClick(row);
            return;
        }
        handleEdit(row, col);
    };
    /** Render column headers */
    var renderColHeaders = function () {
        if (!visibleRange || !props.renderColHeader || !props.colHeaderHeight || !paneDiv) {
            return null;
        }
        var nodes = [];
        for (var c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            var selected = selection ? selection.col == c : false;
            // Render column headers
            var colHeaderStyle = {
                position: "absolute",
                left: colXs[c],
                top: paneDiv.scrollTop,
                width: props.colWidths[c] + 1,
                height: props.colHeaderHeight + 1,
                border: "solid 1px #c0c0c0",
                backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
            };
            var colHeaderContents = props.renderColHeader({
                col: c,
                width: props.colWidths[c] - 1,
                height: props.colHeaderHeight - 1,
                selected: selected
            });
            nodes.push(react_1.default.createElement("div", { key: c + ":h", style: colHeaderStyle }, colHeaderContents));
        }
        return nodes;
    };
    /** Column resize start */
    var handleStartResizeColumn = function (col, ev) {
        setColResizing(col);
        setColResizingDelta(0);
        colResizingStartX.current = ev.pageX;
        ev.preventDefault();
    };
    /** Column resize move */
    var handleMouseMove = function (ev) {
        if (colResizing == null) {
            return;
        }
        var delta = ev.pageX - colResizingStartX.current;
        // Enforce minimum size
        if (props.colWidths[colResizing] + delta < 50) {
            delta = 50 - props.colWidths[colResizing];
        }
        setColResizingDelta(delta);
    };
    /** Column resize end */
    var handleMouseUp = function (ev) {
        if (colResizing != null) {
            if (props.onColWidthsChange) {
                var colWidths = props.colWidths.slice();
                colWidths[colResizing] = colWidths[colResizing] + colResizingDelta;
                props.onColWidthsChange(colWidths);
            }
            setColResizing(undefined);
        }
    };
    /** Render row headers */
    var renderRowHeaders = function () {
        if (!visibleRange || !props.renderRowHeader || !props.rowHeaderWidth || !paneDiv) {
            return null;
        }
        var nodes = [];
        var y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
        for (var r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
            var selected = selection ? selection.row == r : false;
            // Render row header
            var rowHeaderStyle = {
                position: "absolute",
                left: paneDiv.scrollLeft,
                top: y,
                width: props.rowHeaderWidth + 1,
                height: props.rowHeight + 1,
                border: "solid 1px #c0c0c0",
                backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
            };
            var rowHeaderContents = props.renderRowHeader({
                row: r,
                width: props.rowHeaderWidth - 1,
                height: props.rowHeight - 1,
                selected: selected
            });
            nodes.push(react_1.default.createElement("div", { key: "h:" + r, style: rowHeaderStyle }, rowHeaderContents));
            y += props.rowHeight;
        }
        return nodes;
    };
    /** Render the vertical and horizontal grid as a series of rectangles */
    var renderGrid = function () {
        if (!visibleRange) {
            return null;
        }
        var nodes = [];
        // Render horizontal grids
        var y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
        for (var r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
            var cellStyle = {
                position: "absolute",
                left: colXs[visibleRange.colStart],
                top: y,
                width: colXs[visibleRange.colEnd] + props.colWidths[visibleRange.colEnd] - colXs[visibleRange.colStart],
                height: props.rowHeight + 1,
                border: "solid 1px #EEE",
            };
            nodes.push(react_1.default.createElement("div", { key: "g:" + r, style: cellStyle }));
            y += props.rowHeight;
        }
        // Render vertical grids
        for (var c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            var y_1 = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
            var cellStyle = {
                position: "absolute",
                left: colXs[c],
                width: props.colWidths[c] + 1,
                top: y_1,
                height: props.rowHeight * (visibleRange.rowEnd - visibleRange.rowStart + 1),
                border: "solid 1px #EEE",
            };
            nodes.push(react_1.default.createElement("div", { key: c + ":g", style: cellStyle }));
        }
        return nodes;
    };
    /** Render all visible cells */
    var renderCells = function () {
        if (!visibleRange) {
            return null;
        }
        var nodes = [];
        for (var c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            var y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
            for (var r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
                var cellStyle = {
                    position: "absolute",
                    left: colXs[c] + 1,
                    top: y + 1,
                    width: props.colWidths[c] - 1,
                    height: props.rowHeight - 1
                };
                var cellContents = props.renderCell({
                    row: r,
                    col: c,
                    width: props.colWidths[c] - 1,
                    height: props.rowHeight - 1,
                    selected: selection ? selection.row == r && selection.col == c : false,
                    onStartEdit: handleEdit.bind(null, r, c)
                });
                nodes.push(react_1.default.createElement("div", { key: c + ":" + r, onMouseDown: handleMouseDown.bind(null, r, c), onDoubleClick: handleDoubleClick.bind(null, r, c), style: cellStyle }, cellContents));
                y += props.rowHeight;
            }
        }
        return nodes;
    };
    /** Render extra region to right of last column header */
    var renderColHeaderExtra = function () {
        if (!paneDiv || !props.renderColHeaderExtra || !props.colHeaderExtraWidth) {
            return null;
        }
        return react_1.default.createElement("div", { key: "colextra", style: {
                position: "absolute",
                top: paneDiv.scrollTop,
                left: props.rowHeaderWidth + props.colWidths.reduce(function (a, b) { return a + b; }, 0),
                height: props.colHeaderHeight,
                width: props.colHeaderExtraWidth
            } }, props.renderColHeaderExtra());
    };
    /** Render extra region below last row header */
    var renderRowHeaderExtra = function () {
        if (!paneDiv || !props.renderRowHeaderExtra || !props.rowHeaderExtraHeight) {
            return null;
        }
        return react_1.default.createElement("div", { key: "rowextra", style: {
                position: "absolute",
                left: paneDiv.scrollLeft,
                top: props.colHeaderHeight + props.rowHeight * props.numRows,
                height: props.rowHeaderExtraHeight,
                width: props.rowHeaderWidth
            } }, props.renderRowHeaderExtra());
    };
    /** Render column resizers */
    var renderColResizers = function () {
        if (!paneDiv || !props.onColWidthsChange) {
            return null;
        }
        var nodes = [];
        for (var c = 0; c < props.colWidths.length; c++) {
            var left = colXs[c] + props.colWidths[c] - 2;
            if (colResizing == c && colResizingDelta != null) {
                left = left + colResizingDelta;
            }
            nodes.push(react_1.default.createElement("div", { key: "colresize:" + c, style: {
                    position: "absolute",
                    top: paneDiv.scrollTop,
                    left: left,
                    height: colResizing == c ? props.height : props.colHeaderHeight,
                    width: 4,
                    backgroundColor: colResizing == c ? "#66afe9" : undefined,
                    cursor: "col-resize"
                }, onMouseDown: handleStartResizeColumn.bind(null, c) }));
        }
        return nodes;
    };
    /** Render the blue selection box */
    var renderSelection = function () {
        if (!selection) {
            return null;
        }
        var style = {
            position: "absolute",
            left: colXs[selection.col],
            top: selection.row * props.rowHeight + props.colHeaderHeight,
            width: props.colWidths[selection.col] + 1,
            height: props.rowHeight + 1,
            border: "2px solid #66afe9",
            pointerEvents: "none"
        };
        return react_1.default.createElement("div", { style: style });
    };
    /** Render the top left corner */
    var renderTopLeft = function () {
        if (!visibleRange || !paneDiv) {
            return null;
        }
        var style = {
            position: "absolute",
            left: paneDiv.scrollLeft,
            top: paneDiv.scrollTop,
            width: props.rowHeaderWidth + 1,
            height: props.colHeaderHeight + 1,
            border: "solid 1px #c0c0c0",
            backgroundColor: "#f5f5f5"
        };
        return react_1.default.createElement("div", { key: "h:h", style: style });
    };
    /** Render editor control */
    var renderEditor = function () {
        if (editing == "none" || !selection || !props.renderCellEditor) {
            return null;
        }
        // Don't render if selection doesn't exist anymore (row/column deleted)
        if (selection.row >= props.numRows || selection.col >= props.colWidths.length) {
            return null;
        }
        var style = {
            position: "absolute",
            left: colXs[selection.col] + 1,
            top: selection.row * props.rowHeight + props.colHeaderHeight + 1,
            width: props.colWidths[selection.col] - 1,
            height: props.rowHeight - 1
        };
        var editorContent = props.renderCellEditor({
            row: selection.row,
            col: selection.col,
            width: props.colWidths[selection.col] - 1,
            height: props.rowHeight - 1,
            saving: editing == "saving",
            setSaveEdit: function (saveEditFunc) { saveEditRef.current = saveEditFunc; },
            onEndEdit: endEditing
        });
        return react_1.default.createElement("div", { style: style }, editorContent);
    };
    // Calculate the size of the grid
    var totalWidth = props.rowHeaderWidth + props.colWidths.reduce(function (a, b) { return a + b; }, 0) + (props.colHeaderExtraWidth || 0);
    var totalHeight = props.rowHeight * props.numRows + props.colHeaderHeight + (props.rowHeaderExtraHeight || 0);
    return react_1.default.createElement("div", { key: "pane", style: { width: props.width, height: props.height, overflow: "scroll", position: "relative" }, onScroll: handleScroll, onMouseUp: handleMouseUp, onMouseMove: handleMouseMove, ref: paneRef },
        react_1.default.createElement("div", { key: "inner", onKeyDown: handleKeyDown, tabIndex: 0, ref: innerRef, style: { width: totalWidth, height: totalHeight, cursor: colResizing != null ? "col-resize" : undefined, outline: "none" } },
            renderGrid(),
            renderCells(),
            renderSelection(),
            renderEditor(),
            renderColHeaders(),
            renderColHeaderExtra(),
            renderColResizers(),
            renderRowHeaders(),
            renderRowHeaderExtra(),
            renderTopLeft()));
};
