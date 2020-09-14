/// <reference types="react" />
import { LocalizeString } from 'ez-localize';
/** Row of a GANTT chart */
export interface GanttChartRow {
    /** Label to left */
    label: string;
    /** Indent number. 0 is top-level */
    level: number;
    /** YYYY-MM-DD */
    startDate: string | null;
    /** YYYY-MM-DD */
    endDate: string | null;
    /** Color for bar */
    color: string;
}
/** Display an editable GANTT chart */
export declare function GanttChart(props: {
    /** Rows to display */
    rows: GanttChartRow[];
    /** Start of display range YYYY-MM-DD */
    startDate: string;
    /** End of display range YYYY-MM-DD */
    endDate: string;
    /** Add level 0 row to bottom of list */
    onAddRow?: () => void;
    /** Insert row at same level above specified row */
    onInsertRowAbove?: (rowIndex: number) => void;
    /** Insert row at same level below specified row */
    onInsertRowBelow?: (rowIndex: number) => void;
    /** Move row to be next sibling of parent */
    onMoveRowLeft?: (rowIndex: number) => void;
    /** Move row to be last child of previous sibling */
    onMoveRowRight?: (rowIndex: number) => void;
    /** Move row to be before previous sibling */
    onMoveRowUp?: (rowIndex: number) => void;
    /** Move row to be after next sibling */
    onMoveRowDown?: (rowIndex: number) => void;
    /** Handle row being clicked on */
    onRowClick?: (rowIndex: number) => void;
    /** Localizer for labels */
    T: LocalizeString;
}): JSX.Element;
