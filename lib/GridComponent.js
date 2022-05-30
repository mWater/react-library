"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridComponent = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("react");
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
const GridComponent = (props) => {
    /** Scroll positions. Used to refresh render */
    const [scrollTop, setScrollTop] = (0, react_2.useState)(0);
    const [scrollLeft, setScrollLeft] = (0, react_2.useState)(0);
    /** Currently selected cell */
    const [selection, setSelection] = (0, react_2.useState)(null);
    /** Editing state. "none" is not editing, "active" is active editor, "saving" is when save has been requested */
    const [editing, setEditing] = (0, react_2.useState)("none");
    /** Edit is pending (from doubleclick on other cell). When save is done, start editing again
     * Since this is needed asynchronously, use a ref */
    const editPending = (0, react_2.useRef)(false);
    /** Save edit function ref. Editor sets this to block saves */
    const saveEditRef = (0, react_2.useRef)(null);
    /** Div of the large inner pane */
    const [paneDiv, setPaneDiv] = (0, react_2.useState)(null);
    /** Column resize dragging state */
    const [colResizing, setColResizing] = (0, react_2.useState)();
    const [colResizingDelta, setColResizingDelta] = (0, react_2.useState)();
    const colResizingStartX = (0, react_2.useRef)();
    /** Compute column x coordinates */
    const colXs = (0, react_2.useMemo)(() => {
        const xs = [];
        // Add widths before visible columns
        let x = props.rowHeaderWidth;
        for (let c = 0; c < props.colWidths.length; c++) {
            xs[c] = x;
            x += props.colWidths[c];
        }
        return xs;
    }, [props.colWidths, props.rowHeaderWidth]);
    /** Gets the row and column (may be null if out of range) for a point */
    const xyToRowCol = (x, y) => {
        const row = Math.floor((y - props.colHeaderHeight) / props.rowHeight);
        let col = null;
        for (let c = 0; c < props.colWidths.length; c++) {
            const colStartX = colXs[c];
            const colEndX = colXs[c] + props.colWidths[c];
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
    const rowColToXY = (row, col) => {
        const minX = colXs[col];
        const maxX = minX + props.colWidths[col];
        const minY = row * props.rowHeight + props.colHeaderHeight;
        const maxY = minY + props.rowHeight;
        return { minX, minY, maxX, maxY };
    };
    /** Scrolls the cell into view */
    const scrollIntoView = (row, col) => {
        if (!paneDiv) {
            return;
        }
        const { minX, minY, maxX, maxY } = rowColToXY(row, col);
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
    let visibleRange = null;
    if (paneDiv) {
        // Get visible x and y
        const minY = paneDiv.scrollTop;
        const maxY = paneDiv.scrollTop + paneDiv.clientHeight;
        const minX = paneDiv.scrollLeft;
        const maxX = paneDiv.scrollLeft + paneDiv.clientWidth;
        // Determine ranges
        const { col: colStart, row: rowStart } = xyToRowCol(minX, minY);
        const { col: colEnd, row: rowEnd } = xyToRowCol(maxX, maxY);
        // Null means end or start
        visibleRange = {
            rowStart: rowStart != null ? rowStart : 0,
            rowEnd: rowEnd != null ? rowEnd : props.numRows - 1,
            colStart: colStart != null ? colStart : 0,
            colEnd: colEnd != null ? colEnd : props.colWidths.length - 1
        };
    }
    /** Capture the pane div */
    const paneRef = (0, react_2.useCallback)((node) => {
        setPaneDiv(node);
    }, []);
    /** Focus on inner div */
    const innerRef = (0, react_2.useCallback)((node) => {
        if (node) {
            node.focus();
        }
    }, []);
    /** Respond to a scroll event */
    const handleScroll = () => {
        if (!paneDiv) {
            return;
        }
        setScrollLeft(paneDiv.scrollLeft);
        setScrollTop(paneDiv.scrollTop);
    };
    /** Prevent disappearing editor */
    (0, react_1.useEffect)(() => {
        if (editing == "active" && selection) {
            scrollIntoView(selection.row, selection.col);
        }
    });
    /** Remove editing if selection is invalid */
    (0, react_1.useEffect)(() => {
        // Clear editing if selection doesn't exist anymore (row/column deleted)
        if (selection && (selection.row >= props.numRows || selection.col >= props.colWidths.length)) {
            setSelection(null);
            setEditing("none");
        }
    });
    /** End editing.
     * @returns true if successful, false if cancelled
     */
    const endEditing = () => __awaiter(void 0, void 0, void 0, function* () {
        // If saving edit, can't end
        if (editing == "saving") {
            return false;
        }
        // If editing, stop editing
        if (editing == "active") {
            setEditing("saving");
            if (saveEditRef.current) {
                // Allow control to abort save
                if (!(yield saveEditRef.current())) {
                    setEditing("active");
                    return false;
                }
            }
            setEditing("none");
        }
        return true;
    });
    /** Update selection if needed, scrolling into view. Returns whether was successful (edits can block) */
    const moveSelection = (sel) => __awaiter(void 0, void 0, void 0, function* () {
        // Do nothing if already selected
        if (selection && selection.col == sel.col && selection.row == sel.row) {
            return true;
        }
        if (!(yield endEditing())) {
            return;
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
        return true;
    });
    /** Handle arrow keys and enter */
    const handleKeyDown = (ev) => {
        // Handle arrow keys if not editing
        if ([37, 38, 39, 40].includes(ev.keyCode) && selection && editing == "none") {
            // Stop it from scolling
            ev.preventDefault();
            // Move selection
            if (ev.keyCode == 37) {
                // Left
                moveSelection({ row: selection.row, col: Math.max(0, selection.col - 1) });
            }
            if (ev.keyCode == 38) {
                // Up
                moveSelection({ row: Math.max(selection.row - 1, 0), col: selection.col });
            }
            if (ev.keyCode == 39) {
                // Right
                moveSelection({ row: selection.row, col: Math.min(props.colWidths.length - 1, selection.col + 1) });
            }
            if (ev.keyCode == 40) {
                // Down
                moveSelection({ row: Math.min(selection.row + 1, props.numRows - 1), col: selection.col });
            }
        }
        // Enter edits if not editing
        if (ev.keyCode == 13 && selection && editing == "none") {
            handleEdit(selection.row, selection.col);
        }
    };
    /** Handle mouse down (selects cell) */
    const handleMouseDown = (row, col, ev) => {
        // Handle override in prop
        if (props.onRowClick) {
            props.onRowClick(row);
            return;
        }
        moveSelection({ row, col });
    };
    /** Attempt to edit a cell. Assumes that cell is already selected, or selection is in progress already */
    const handleEdit = (row, col) => {
        if (!props.canEdit) {
            return;
        }
        // Check if can edit
        Promise.resolve(props.canEdit({ row: row, col: col })).then((editable) => {
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
    const handleDoubleClick = (row, col, ev) => {
        // If overridden, call prop
        if (props.onRowDoubleClick) {
            props.onRowDoubleClick(row);
            return;
        }
        handleEdit(row, col);
    };
    /** Render column headers */
    const renderColHeaders = () => {
        if (!visibleRange || !props.renderColHeader || !props.colHeaderHeight || !paneDiv) {
            return null;
        }
        const nodes = [];
        for (let c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            const selected = selection ? selection.col == c : false;
            // Render column headers
            const colHeaderStyle = {
                position: "absolute",
                left: colXs[c],
                top: paneDiv.scrollTop,
                width: props.colWidths[c] + 1,
                height: props.colHeaderHeight + 1,
                border: "solid 1px #c0c0c0",
                backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
            };
            const colHeaderContents = props.renderColHeader({
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
    const handleStartResizeColumn = (col, ev) => {
        setColResizing(col);
        setColResizingDelta(0);
        colResizingStartX.current = ev.pageX;
        ev.preventDefault();
    };
    /** Column resize move */
    const handleMouseMove = (ev) => {
        if (colResizing == null) {
            return;
        }
        let delta = ev.pageX - colResizingStartX.current;
        // Enforce minimum size
        if (props.colWidths[colResizing] + delta < 50) {
            delta = 50 - props.colWidths[colResizing];
        }
        setColResizingDelta(delta);
    };
    /** Column resize end */
    const handleMouseUp = (ev) => {
        if (colResizing != null) {
            if (props.onColWidthsChange) {
                const colWidths = props.colWidths.slice();
                colWidths[colResizing] = colWidths[colResizing] + colResizingDelta;
                props.onColWidthsChange(colWidths);
            }
            setColResizing(undefined);
        }
    };
    /** Render row headers */
    const renderRowHeaders = () => {
        if (!visibleRange || !props.renderRowHeader || !props.rowHeaderWidth || !paneDiv) {
            return null;
        }
        const nodes = [];
        let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
        for (let r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
            const selected = selection ? selection.row == r : false;
            // Render row header
            const rowHeaderStyle = {
                position: "absolute",
                left: paneDiv.scrollLeft,
                top: y,
                width: props.rowHeaderWidth + 1,
                height: props.rowHeight + 1,
                border: "solid 1px #c0c0c0",
                backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
            };
            const rowHeaderContents = props.renderRowHeader({
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
    const renderGrid = () => {
        if (!visibleRange) {
            return null;
        }
        const nodes = [];
        // Render horizontal grids
        let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
        for (let r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
            const cellStyle = {
                position: "absolute",
                left: colXs[visibleRange.colStart],
                top: y,
                width: colXs[visibleRange.colEnd] + props.colWidths[visibleRange.colEnd] - colXs[visibleRange.colStart],
                height: props.rowHeight + 1,
                border: "solid 1px #EEE"
            };
            nodes.push(react_1.default.createElement("div", { key: "g:" + r, style: cellStyle }));
            y += props.rowHeight;
        }
        // Render vertical grids
        for (let c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            const y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
            const cellStyle = {
                position: "absolute",
                left: colXs[c],
                width: props.colWidths[c] + 1,
                top: y,
                height: props.rowHeight * (visibleRange.rowEnd - visibleRange.rowStart + 1),
                border: "solid 1px #EEE"
            };
            nodes.push(react_1.default.createElement("div", { key: c + ":g", style: cellStyle }));
        }
        return nodes;
    };
    /** Render all visible cells */
    const renderCells = () => {
        if (!visibleRange) {
            return null;
        }
        const nodes = [];
        for (let c = visibleRange.colStart; c <= visibleRange.colEnd; c++) {
            let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight;
            for (let r = visibleRange.rowStart; r <= visibleRange.rowEnd; r++) {
                const cellStyle = {
                    position: "absolute",
                    left: colXs[c] + 1,
                    top: y + 1,
                    width: props.colWidths[c] - 1,
                    height: props.rowHeight - 1
                };
                const cellContents = props.renderCell({
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
    const renderColHeaderExtra = () => {
        if (!paneDiv || !props.renderColHeaderExtra || !props.colHeaderExtraWidth) {
            return null;
        }
        return (react_1.default.createElement("div", { key: "colextra", style: {
                position: "absolute",
                top: paneDiv.scrollTop,
                left: props.rowHeaderWidth + props.colWidths.reduce((a, b) => a + b, 0),
                height: props.colHeaderHeight,
                width: props.colHeaderExtraWidth
            } }, props.renderColHeaderExtra()));
    };
    /** Render extra region below last row header */
    const renderRowHeaderExtra = () => {
        if (!paneDiv || !props.renderRowHeaderExtra || !props.rowHeaderExtraHeight) {
            return null;
        }
        return (react_1.default.createElement("div", { key: "rowextra", style: {
                position: "absolute",
                left: paneDiv.scrollLeft,
                top: props.colHeaderHeight + props.rowHeight * props.numRows,
                height: props.rowHeaderExtraHeight,
                width: props.rowHeaderWidth
            } }, props.renderRowHeaderExtra()));
    };
    /** Render column resizers */
    const renderColResizers = () => {
        if (!paneDiv || !props.onColWidthsChange) {
            return null;
        }
        const nodes = [];
        for (let c = 0; c < props.colWidths.length; c++) {
            let left = colXs[c] + props.colWidths[c] - 2;
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
    const renderSelection = () => {
        if (!selection) {
            return null;
        }
        const style = {
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
    const renderTopLeft = () => {
        if (!visibleRange || !paneDiv) {
            return null;
        }
        const style = {
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
    const renderEditor = () => {
        if (editing == "none" || !selection || !props.renderCellEditor) {
            return null;
        }
        // Don't render if selection doesn't exist anymore (row/column deleted)
        if (selection.row >= props.numRows || selection.col >= props.colWidths.length) {
            return null;
        }
        const style = {
            position: "absolute",
            left: colXs[selection.col] + 1,
            top: selection.row * props.rowHeight + props.colHeaderHeight + 1,
            width: props.colWidths[selection.col] - 1,
            height: props.rowHeight - 1
        };
        const editorContent = props.renderCellEditor({
            row: selection.row,
            col: selection.col,
            width: props.colWidths[selection.col] - 1,
            height: props.rowHeight - 1,
            saving: editing == "saving",
            setSaveEdit: (saveEditFunc) => {
                saveEditRef.current = saveEditFunc;
            },
            onEndEdit: endEditing
        });
        return react_1.default.createElement("div", { style: style }, editorContent);
    };
    // Calculate the size of the grid
    const totalWidth = props.rowHeaderWidth + props.colWidths.reduce((a, b) => a + b, 0) + (props.colHeaderExtraWidth || 0);
    const totalHeight = props.rowHeight * props.numRows + props.colHeaderHeight + (props.rowHeaderExtraHeight || 0);
    return (react_1.default.createElement("div", { key: "pane", style: { width: props.width, height: props.height, overflow: "scroll", position: "relative" }, onScroll: handleScroll, onMouseUp: handleMouseUp, onMouseMove: handleMouseMove, ref: paneRef },
        react_1.default.createElement("div", { key: "inner", onKeyDown: handleKeyDown, tabIndex: 0, ref: innerRef, style: {
                width: totalWidth,
                height: totalHeight,
                cursor: colResizing != null ? "col-resize" : undefined,
                outline: "none"
            } },
            renderGrid(),
            renderCells(),
            renderSelection(),
            renderEditor(),
            renderColHeaders(),
            renderColHeaderExtra(),
            renderColResizers(),
            renderRowHeaders(),
            renderRowHeaderExtra(),
            renderTopLeft())));
};
exports.GridComponent = GridComponent;
