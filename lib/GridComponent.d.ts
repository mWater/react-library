import React from "react";
import './GridComponent.css';
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
    renderCell: (props: RenderCellProps) => React.ReactNode;
    /** Render a single column header. Renderer is responsible for clipping and padding */
    renderColHeader?: ((props: RenderColHeaderProps) => React.ReactNode) | undefined;
    /** Render a single row header. Renderer is responsible for clipping and padding */
    renderRowHeader?: ((props: RenderRowHeaderProps) => React.ReactNode) | undefined;
    /** Cell editor when editing set */
    renderCellEditor?: ((props: RenderCellEditorProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) | undefined;
    /** Check if a cell can be edited */
    canEdit?: ((props: {
        row: number;
        col: number;
    }) => boolean | Promise<boolean>) | undefined;
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
}
export interface RenderColHeaderProps {
    /** Zero-based column number */
    col: number;
    /** Width of header to be rendered */
    width: number;
    /** Height of header to be rendered */
    height: number;
}
export interface RenderRowHeaderProps {
    /** Zero-based row number */
    row: number;
    /** Width of header to be rendered */
    width: number;
    /** Height of header to be rendered */
    height: number;
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
}
