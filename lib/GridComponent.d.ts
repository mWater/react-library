import { ReactNode, ReactElement } from "react";
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
export declare const GridComponent: (props: {
    /** Width of display of grid */
    width: number;
    /** Height of display of grid */
    height: number;
    /** Number of rows in the grid */
    numRows: number;
    /** Height of each row in grid (excluding header) */
    rowHeight: number;
    /** Widths of columns */
    colWidths: number[];
    /** Called when columns are resized */
    onColWidthsChange?: ((colWidths: number[]) => void) | undefined;
    /** Height of column headers */
    colHeaderHeight: number;
    /** Width of row headers */
    rowHeaderWidth: number;
    /** Render a single cell. Renderer is responsible for clipping and padding */
    renderCell: (props: RenderCellProps) => ReactNode;
    /** Render a single column header. Renderer is responsible for clipping and padding */
    renderColHeader?: ((props: RenderColHeaderProps) => ReactNode) | undefined;
    /** Render a single row header. Renderer is responsible for clipping and padding */
    renderRowHeader?: ((props: RenderRowHeaderProps) => ReactNode) | undefined;
    /** Cell editor when editing set */
    renderCellEditor?: ((props: RenderCellEditorProps) => ReactElement<any>) | undefined;
    /** Check if a cell can be edited */
    canEdit?: ((props: {
        row: number;
        col: number;
    }) => Promise<boolean> | boolean) | undefined;
    /** Width of extra region to right of last column header */
    colHeaderExtraWidth?: number | undefined;
    /** Render extra region to the right of last column header */
    renderColHeaderExtra?: (() => ReactNode) | undefined;
    /** Height of extra region below last row header */
    rowHeaderExtraHeight?: number | undefined;
    /** Render extra region below last row header */
    renderRowHeaderExtra?: (() => ReactNode) | undefined;
    /** Handle row click. Prevents selection by click if present */
    onRowClick?: ((rowIndex: number) => void) | undefined;
    /** Handle row double click. Prevents editing by double click if present */
    onRowDoubleClick?: ((rowIndex: number) => void) | undefined;
}) => JSX.Element;
/** Props passed to render a cell */
export interface RenderCellProps {
    /** Zero-based row number */
    row: number;
    /** Zero-based column number */
    col: number;
    /** Width of cell to be rendered */
    width: number;
    /** Height of cell to be rendered */
    height: number;
    /** True if cell is selected */
    selected: boolean;
    /** Call to start editing cell. Assumes cell is selected because of click */
    onStartEdit: () => void;
}
export interface RenderColHeaderProps {
    /** Zero-based column number */
    col: number;
    /** Width of header to be rendered */
    width: number;
    /** Height of header to be rendered */
    height: number;
    /** True if cell in column is selected */
    selected: boolean;
}
export interface RenderRowHeaderProps {
    /** Zero-based row number */
    row: number;
    /** Width of header to be rendered */
    width: number;
    /** Height of header to be rendered */
    height: number;
    /** True if cell in row is selected */
    selected: boolean;
}
/** Will be called to save the current edit. Returns true if successful */
export declare type SaveEditFunc = () => Promise<boolean>;
export interface RenderCellEditorProps {
    /** Zero-based row number */
    row: number;
    /** Zero-based column number */
    col: number;
    /** Width of cell to be rendered */
    width: number;
    /** Height of cell to be rendered */
    height: number;
    /** True if saving */
    saving: boolean;
    /** Call to set a optional asynchronous save function */
    setSaveEdit: (saveEditFunc: SaveEditFunc) => void;
    /** Call to end editing. Returns success */
    onEndEdit: () => Promise<boolean>;
}
