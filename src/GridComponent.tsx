import _ from 'lodash'
import React from "react"
import { ReactNode, useRef, useState, useCallback, CSSProperties, useMemo, ReactElement } from "react"

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
export const GridComponent = (props: {
  /** Width of display of grid */
  width: number
  /** Height of display of grid */
  height: number

  /** Number of rows in the grid */
  numRows: number
  /** Height of each row in grid (excluding header) */
  rowHeight: number

  /** Widths of columns */
  colWidths: number[]
  /** Called when columns are resized */
  onColWidthsChange?: (colWidths: number[]) => void
  /** Height of column headers */
  colHeaderHeight: number

  /** Width of row headers */
  rowHeaderWidth: number

  /** Render a single cell. Renderer is responsible for clipping and padding */
  renderCell: (props: RenderCellProps) => ReactNode
  /** Render a single column header. Renderer is responsible for clipping and padding */
  renderColHeader?: (props: RenderColHeaderProps) => ReactNode
  /** Render a single row header. Renderer is responsible for clipping and padding */
  renderRowHeader?: (props: RenderRowHeaderProps) => ReactNode

  /** Cell editor when editing set */
  renderCellEditor?: (props: RenderCellEditorProps) => ReactElement<any>
  /** Check if a cell can be edited */
  canEdit?: (props: { row: number, col: number }) => Promise<boolean> | boolean

  /** Width of extra region to right of last column header */
  colHeaderExtraWidth?: number
  /** Render extra region to the right of last column header */
  renderColHeaderExtra?: () => ReactNode

  /** Height of extra region below last row header */
  rowHeaderExtraHeight?: number
  /** Render extra region below last row header */
  renderRowHeaderExtra?: () => ReactNode

  /** Handle row click. Prevents selection by click if present */
  onRowClick?: (rowIndex: number) => void
  /** Handle row double click. Prevents editing by double click if present */
  onRowDoubleClick?: (rowIndex: number) => void
}) => {
  /** Range of visible cells */
  const [visibleRange, setVisibleRange] = useState<CellRange | null>(null)

  /** Currently selected cell */
  const [selection, setSelection] = useState<CellSelection | null>(null)

  /** Editing state. "none" is not editing, "active" is active editor, "saving" is when save has been requested */
  const [editing, setEditing] = useState<"none" | "active" | "saving">("none")

  /** Edit is pending (from doubleclick on other cell). When save is done, start editing again
   * Since this is needed asynchronously, use a ref */
  const editPending = useRef(false)

  /** Save edit function ref. Editor sets this to block saves */
  const saveEditRef = useRef<SaveEditFunc | null>(null)

  /** Div of the large inner pane */
  const paneDiv = useRef<HTMLDivElement | null>(null)

  /** Column resize dragging state */
  const [colResizing, setColResizing] = useState<number>()
  const [colResizingDelta, setColResizingDelta] = useState<number>()
  const colResizingStartX = useRef<number>()

  /** Compute column x coordinates */
  const colXs = useMemo(() => {
    const xs = []

    // Add widths before visible columns
    let x = props.rowHeaderWidth
    for (let c = 0 ; c < props.colWidths.length ; c++) {
      xs[c] = x
      x += props.colWidths[c]
    }
    return xs
  }, [props.colWidths, props.rowHeaderWidth])

  /** Gets the row and column (may be null if out of range) for a point */
  const xyToRowCol = (x: number, y: number) => {
    const row = Math.floor((y - props.colHeaderHeight) / props.rowHeight)
    
    let col: number | null = null
    for (let c = 0 ; c < props.colWidths.length; c++) {
      const colStartX = colXs[c]
      const colEndX = colXs[c] + props.colWidths[c]
      if (x >= colStartX && x < colEndX) {
        col = c
      }
    }

    return { 
      row: row >= 0 && row < props.numRows ? row : null,
      col: col
    }
  }

  /** Gets the bounds of a cell */
  const rowColToXY = (row: number, col: number) => {
    const minX = colXs[col]
    const maxX = minX + props.colWidths[col]
    const minY = row * props.rowHeight + props.colHeaderHeight
    const maxY = minY + props.rowHeight
    return { minX, minY, maxX, maxY }
  }

  /** Scrolls the cell into view */
  const scrollIntoView = (row: number, col: number) => {
    if (!paneDiv.current) {
      return
    }

    const { minX, minY, maxX, maxY } = rowColToXY(row, col)
    
    // Make x in view
    if (minX < paneDiv.current.scrollLeft + props.rowHeaderWidth) {
      paneDiv.current.scrollLeft = minX - props.rowHeaderWidth
    }
    else if (maxX > paneDiv.current.scrollLeft + paneDiv.current.clientWidth) {
      paneDiv.current.scrollLeft = maxX - paneDiv.current.clientWidth
    }

    // Make y in view
    if (minY < paneDiv.current.scrollTop + props.colHeaderHeight) {
      paneDiv.current.scrollTop = minY - props.colHeaderHeight
    }
    else if (maxY > paneDiv.current.scrollTop + paneDiv.current.clientHeight) {
      paneDiv.current.scrollTop = maxY - paneDiv.current.clientHeight
    }
  }
  
  /** Determine range of cells that are visible */
  const updateVisibleRange = useCallback(() => {
    if (!paneDiv.current) {
      return
    }

    // Get visible x and y
    const minY = paneDiv.current.scrollTop
    const maxY = paneDiv.current.scrollTop + paneDiv.current.clientHeight
    const minX = paneDiv.current.scrollLeft
    const maxX = paneDiv.current.scrollLeft + paneDiv.current.clientWidth

    // Determine ranges
    const { col: colStart, row: rowStart } = xyToRowCol(minX, minY)
    const { col: colEnd, row: rowEnd } = xyToRowCol(maxX, maxY)

    // Null means end or start
    const cellRange = { 
      rowStart: rowStart != null ? rowStart : 0,
      rowEnd: rowEnd != null ? rowEnd : props.numRows - 1,
      colStart: colStart != null ? colStart : 0,
      colEnd: colEnd != null ? colEnd : props.colWidths.length - 1
    }

    setVisibleRange(cellRange)
  }, [props.rowHeight, props.colWidths, props.colHeaderHeight, props.rowHeaderWidth])

  /** Capture the pane div */
  const paneRef = useCallback((node: HTMLDivElement | null) => {
    paneDiv.current = node
    updateVisibleRange()
  }, [])

  /** Respond to a scroll event */
  const handleScroll = () => {
    updateVisibleRange()

    // Prevent disappearing editor
    if (editing == "active" && selection) {
      scrollIntoView(selection.row, selection.col)
    }
  }

  /** Update selection if needed, scrolling into view. Returns whether was successful (edits can block) */
  const moveSelection = async (sel: CellSelection) => {
    // Do nothing if already selected
    if (selection && selection.col == sel.col && selection.row == sel.row) {
      return true
    }

    // If saving edit, can't move selection
    if (editing == "saving") {
      return false
    }

    // If editing, stop editing
    if (editing == "active") {
      setEditing("saving")
      if (saveEditRef.current) {
        // Allow control to abort save
        if (!await saveEditRef.current()) {
          setEditing("active")
          return
        }
      }
      setEditing("none")
    }

    // Set selection
    setSelection(sel)

    // If edit pending, start edit
    if (editPending.current) {
      editPending.current = false
      saveEditRef.current = null
      setEditing("active")
    }

    // Make selection visible
    scrollIntoView(sel.row, sel.col)

    return true
  }

  /** Handle arrow keys and enter */
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle arrow keys if not editing 
    if ([37, 38, 39, 40].includes(ev.keyCode) && selection && editing == "none") {
      // Stop it from scolling
      ev.preventDefault()

      // Move selection
      if (ev.keyCode == 37) { // Left
        moveSelection({ row: selection.row, col: Math.max(0, selection.col - 1 )})
      }
      if (ev.keyCode == 38) { // Up
        moveSelection({ row: Math.max(selection.row - 1, 0), col: selection.col })
      }
      if (ev.keyCode == 39) { // Right
        moveSelection({ row: selection.row, col: Math.min(props.colWidths.length - 1, selection.col + 1 )})
      }
      if (ev.keyCode == 40) { // Down
        moveSelection({ row: Math.min(selection.row + 1, props.numRows - 1), col: selection.col })
      }
    }
    
    // Enter edits if not editing 
    if (ev.keyCode == 13 && selection && editing == "none") {
      handleEdit(selection.row, selection.col)
    }
  }

  /** Handle mouse down (selects cell) */
  const handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!paneDiv.current) {
      return
    }

    // Convert to row and col
    const { row, col } = xyToRowCol(
      ev.clientX - paneDiv.current.getBoundingClientRect().left + paneDiv.current.scrollLeft, 
      ev.clientY - paneDiv.current.getBoundingClientRect().top + paneDiv.current.scrollTop)

    if (row != null && col != null) {
      // Handle override in prop
      if (props.onRowClick) {
        props.onRowClick(row)
        return
      }

      moveSelection({ row, col })
    }
  }

  /** Attempt to edit a cell. Assumes that cell is already selected, or selection is in progress already */
  const handleEdit = (row: number, col: number) => {
    if (!props.canEdit) {
      return
    }

    // Check if can edit
    Promise.resolve(props.canEdit({ row: row, col: col })).then((editable) => {
      if (!editable) {
        return
      }

      // If already editing, do nothing. handleMouseDown will already be trying
      // to switch cells, so if not "saving", then it's because it was refused
      if (editing == "active") {
        return
      }

      // If saving, set a flag to start editing once move is complete
      if (editing == "saving") {
        editPending.current = true
        return
      }

      saveEditRef.current = null
      setEditing("active")
    })
  }

  /** Double click edits a cell */
  const handleDoubleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!paneDiv.current) {
      return
    }

    // Convert to row and col
    const { row, col } = xyToRowCol(
      ev.clientX - paneDiv.current.getBoundingClientRect().left + paneDiv.current.scrollLeft, 
      ev.clientY - paneDiv.current.getBoundingClientRect().top + paneDiv.current.scrollTop)

    // If not on the grid
    if (row == null || col == null) {
      return
    }

    // If overridden, call prop
    if (props.onRowDoubleClick) {
      props.onRowDoubleClick(row)
      return
    }

    handleEdit(row, col)
  }

  /** Render column headers */
  const renderColHeaders = () => {
    if (!visibleRange || !props.renderColHeader || !props.colHeaderHeight) {
      return null
    }

    const nodes: ReactNode[] = []

    for (let c = visibleRange.colStart ; c <= visibleRange.colEnd; c++) {
      const selected = selection ? selection.col == c : false

      // Render column headers
      const colHeaderStyle: CSSProperties = {
        position: "absolute",
        left: colXs[c], 
        top: paneDiv.current!.scrollTop, 
        width: props.colWidths[c] + 1, 
        height: props.colHeaderHeight + 1,
        border: "solid 1px #c0c0c0",
        backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
      }
      const colHeaderContents = props.renderColHeader({ 
        col: c, 
        width: props.colWidths[c] - 1, 
        height: props.colHeaderHeight - 1,
        selected: selected
      })
      nodes.push(<div key={c + ":h"} style={colHeaderStyle}>{colHeaderContents}</div>)
    }

    return nodes
  }

  /** Column resize start */
  const handleStartResizeColumn = (col: number, ev: React.MouseEvent<HTMLDivElement>) => {
    setColResizing(col)
    setColResizingDelta(0)
    colResizingStartX.current = ev.pageX
    ev.preventDefault()
  }

  /** Column resize move */
  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (colResizing == null) {
      return
    }
    let delta = ev.pageX - colResizingStartX.current!

    // Enforce minimum size
    if (props.colWidths[colResizing] + delta < 50) {
      delta = 50 - props.colWidths[colResizing]
    }
    setColResizingDelta(delta)
  }

  /** Column resize end */
  const handleMouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (colResizing != null) {
      if (props.onColWidthsChange) {
        const colWidths = props.colWidths.slice()
        colWidths[colResizing] = colWidths[colResizing] + colResizingDelta!
        props.onColWidthsChange(colWidths)
      }
      setColResizing(undefined)
    }
  }

  /** Render row headers */
  const renderRowHeaders = () => {
    if (!visibleRange || !props.renderRowHeader || !props.rowHeaderWidth) {
      return null
    }

    const nodes: ReactNode[] = []

    let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight
    for (let r = visibleRange.rowStart ; r <= visibleRange.rowEnd; r++) {
      const selected = selection ? selection.row == r : false

      // Render row header
      const rowHeaderStyle: CSSProperties = {
        position: "absolute",
        left: paneDiv.current!.scrollLeft, 
        top: y, 
        width: props.rowHeaderWidth + 1, 
        height: props.rowHeight + 1,
        border: "solid 1px #c0c0c0",
        backgroundColor: selected ? "#eaeaea" : "#f5f5f5"
      }
      const rowHeaderContents = props.renderRowHeader({ 
        row: r, 
        width: props.rowHeaderWidth - 1, 
        height: props.rowHeight - 1,
        selected: selected
      })
      nodes.push(<div key={"h:" + r} style={rowHeaderStyle}>{rowHeaderContents}</div>)
      y += props.rowHeight
    }

    return nodes
  }
  
  /** Render the vertical and horizontal grid as a series of rectangles */
  const renderGrid = () => {
    if (!visibleRange) {
      return null
    }

    const nodes: ReactNode[] = []

    // Render horizontal grids
    let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight
    for (let r = visibleRange.rowStart ; r <= visibleRange.rowEnd; r++) {
      const cellStyle: CSSProperties = {
        position: "absolute",
        left: colXs[visibleRange.colStart], 
        top: y,
        width: colXs[visibleRange.colEnd] + props.colWidths[visibleRange.colEnd] - colXs[visibleRange.colStart], 
        height: props.rowHeight + 1,
        border: "solid 1px #EEE", 
      }
      nodes.push(<div key={"g:" + r} style={cellStyle}/>)
      y += props.rowHeight
    }

    // Render vertical grids
    for (let c = visibleRange.colStart ; c <= visibleRange.colEnd; c++) {
      const y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight
      const cellStyle: CSSProperties = {
        position: "absolute",
        left: colXs[c], 
        width: props.colWidths[c] + 1, 
        top: y,
        height: props.rowHeight * (visibleRange.rowEnd - visibleRange.rowStart + 1),
        border: "solid 1px #EEE", 
      }
      nodes.push(<div key={c + ":g"} style={cellStyle}/>)
    }
    return nodes
  }

  /** Render all visible cells */
  const renderCells = () => {
    if (!visibleRange) {
      return null
    }

    const nodes: ReactNode[] = []

    for (let c = visibleRange.colStart ; c <= visibleRange.colEnd; c++) {
      let y = visibleRange.rowStart * props.rowHeight + props.colHeaderHeight
      for (let r = visibleRange.rowStart ; r <= visibleRange.rowEnd; r++) {
        const cellStyle: CSSProperties = {
          position: "absolute",
          left: colXs[c] + 1, 
          top: y + 1
        }
        const cellContents = props.renderCell({ 
          row: r, 
          col: c, 
          width: props.colWidths[c] - 1, 
          height: props.rowHeight - 1,
          selected: selection ? selection.row == r && selection.col == c : false
        })
        nodes.push(<div key={c + ":" + r} style={cellStyle}>{cellContents}</div>)
        y += props.rowHeight
      }
    }
    return nodes
  }

  /** Render extra region to right of last column header */
  const renderColHeaderExtra = () => {
    if (!paneDiv.current || !props.renderColHeaderExtra || !props.colHeaderExtraWidth) {
      return null
    }

    return <div key="colextra" style={{
        position: "absolute",
        top: paneDiv.current.scrollTop,
        left: props.rowHeaderWidth + props.colWidths.reduce((a,b) => a + b, 0),
        height: props.colHeaderHeight,
        width: props.colHeaderExtraWidth
      }}>{ props.renderColHeaderExtra() }</div>
  }

  /** Render extra region below last row header */
  const renderRowHeaderExtra = () => {
    if (!paneDiv.current || !props.renderRowHeaderExtra || !props.rowHeaderExtraHeight) {
      return null
    }

    return <div key="rowextra" style={{
        position: "absolute",
        left: paneDiv.current.scrollLeft,
        top: props.colHeaderHeight + props.rowHeight * props.numRows,
        height: props.rowHeaderExtraHeight,
        width: props.rowHeaderWidth
      }}>{ props.renderRowHeaderExtra() }</div>
  }
  
  /** Render column resizers */
  const renderColResizers = () => {
    if (!paneDiv.current || !props.onColWidthsChange) {
      return null
    }

    const nodes: ReactNode[] = []

    for (let c = 0 ; c < props.colWidths.length; c++) {
      let left = colXs[c] + props.colWidths[c] - 2
      if (colResizing == c && colResizingDelta != null) {
        left = left + colResizingDelta
      }
      nodes.push(<div key={"colresize:" + c} style={{
          position: "absolute",
          top: paneDiv.current.scrollTop,
          left: left,
          height: colResizing == c ? props.height : props.colHeaderHeight,
          width: 4,
          backgroundColor: colResizing == c ? "#66afe9" : undefined,
          cursor: "col-resize"
        }}
        onMouseDown={handleStartResizeColumn.bind(null, c)}
      />)
    }

    return nodes
  }

  /** Render the blue selection box */
  const renderSelection = () => {
    if (!selection) {
      return null
    }

    const style: CSSProperties = {
      position: "absolute",
      left: colXs[selection.col], 
      top: selection.row * props.rowHeight + props.colHeaderHeight,
      width: props.colWidths[selection.col] + 1, 
      height: props.rowHeight + 1,
      border: "2px solid #66afe9",
      pointerEvents: "none"
    }
    return <div style={style}/>
  }

  /** Render the top left corner */
  const renderTopLeft = () => {
    if (!visibleRange) {
      return null
    }

    const style: CSSProperties = {
      position: "absolute",
      left: paneDiv.current!.scrollLeft, 
      top: paneDiv.current!.scrollTop, 
      width: props.rowHeaderWidth + 1, 
      height: props.colHeaderHeight + 1,
      border: "solid 1px #c0c0c0",
      backgroundColor: "#f5f5f5"
    }

    return <div key="h:h" style={style} />
  }

  /** Render editor control */
  const renderEditor = () => {
    if (editing == "none" || !selection || !props.renderCellEditor) {
      return null
    }

    const style: CSSProperties = {
      position: "absolute",
      left: colXs[selection.col] + 1, 
      top: selection.row * props.rowHeight + props.colHeaderHeight + 1,
      width: props.colWidths[selection.col] - 1, 
      height: props.rowHeight - 1
    }
    const editorContent = props.renderCellEditor({
      row: selection.row,
      col: selection.col,
      width: props.colWidths[selection.col] - 1, 
      height: props.rowHeight - 1,
      saving: editing == "saving",
      setSaveEdit: (saveEditFunc: SaveEditFunc) => { saveEditRef.current = saveEditFunc }
    })

    return <div style={style}>{editorContent}</div>
  }

  // Calculate the size of the grid
  const totalWidth = props.rowHeaderWidth + props.colWidths.reduce((a,b) => a + b, 0) + (props.colHeaderExtraWidth || 0)
  const totalHeight = props.rowHeight * props.numRows + props.colHeaderHeight + (props.rowHeaderExtraHeight || 0)

  return <div key="pane" 
    style={{ width: props.width, height: props.height, overflow: "scroll", position: "relative" }} 
    onScroll={handleScroll} 
    ref={paneRef}>
    <div key="inner" 
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={(node) => { if (node) { node.focus() }}}
      style={{ width: totalWidth, height: totalHeight, cursor: colResizing != null ? "col-resize" : undefined, outline: "none" }}>
      { renderGrid() }
      { renderCells() }
      { renderSelection() }
      { renderEditor() }
      { renderColHeaders() }
      { renderColHeaderExtra() }
      { renderColResizers() }
      { renderRowHeaders() }
      { renderRowHeaderExtra() }
      { renderTopLeft() }
    </div>
  </div>
}

/** Props passed to render a cell */
export interface RenderCellProps {
  /** Zero-based row number */
  row: number
  /** Zero-based column number */
  col: number
  /** Width of cell to be rendered */
  width: number
  /** Height of cell to be rendered */
  height: number
  /** True if cell is selected */
  selected: boolean
}

export interface RenderColHeaderProps {
  /** Zero-based column number */
  col: number
  /** Width of header to be rendered */
  width: number
  /** Height of header to be rendered */
  height: number
  /** True if cell in column is selected */
  selected: boolean
}

export interface RenderRowHeaderProps {
  /** Zero-based row number */
  row: number
  /** Width of header to be rendered */
  width: number
  /** Height of header to be rendered */
  height: number
  /** True if cell in row is selected */
  selected: boolean
}

/** Will be called to save the current edit. Returns true if successful */
export type SaveEditFunc = () => Promise<boolean>

export interface RenderCellEditorProps {
  /** Zero-based row number */
  row: number
  /** Zero-based column number */
  col: number
  /** Width of cell to be rendered */
  width: number
  /** Height of cell to be rendered */
  height: number
  /** True if saving */
  saving: boolean

  /** Call to set a optional asynchronous save function */
  setSaveEdit: (saveEditFunc: SaveEditFunc) => void
}

interface CellRange {
  colStart: number
  colEnd: number
  rowStart: number
  rowEnd: number
}

interface CellSelection {
  row: number
  col: number
}
