import React, { CSSProperties, useState, useCallback, useRef, ReactNode, useEffect, useLayoutEffect } from "react"
import AutoSizeComponent from "./AutoSizeComponent"
import moment, { Moment } from "moment"
import { LocalizeString } from "ez-localize"

/** Row of a GANTT chart */
export interface GanttChartRow {
  /** Label to left */
  label: string

  /** Indent number. 0 is top-level */
  level: number

  /** YYYY-MM-DD */
  startDate: string | null

  /** YYYY-MM-DD */
  endDate: string | null

  /** Color for bar/milestone */
  color: string
}

/** Height reserved for horiz scroll bar */
const scrollBarHeight = 20

/** Height of all header parts of the bar section */
const headerHeight = 40

/** Height of each row */
const rowHeight = 21

/** Display an editable GANTT chart */
export function GanttChart(props: {
  /** Rows to display */
  rows: GanttChartRow[]

  /** Start of display range YYYY-MM-DD */
  startDate: string

  /** End of display range YYYY-MM-DD */
  endDate: string

  /** Override simple plus label for add button */
  addRowLabel?: ReactNode

  /** Add level 0 row to bottom of list */
  onAddRow?: () => void

  /** Insert row at same level above specified row */
  onInsertRowAbove?: (rowIndex: number) => void

  /** Insert row at same level below specified row */
  onInsertRowBelow?: (rowIndex: number) => void

  /** Move row to be next sibling of parent */
  onMoveRowLeft?: (rowIndex: number) => void

  /** Move row to be last child of previous sibling */
  onMoveRowRight?: (rowIndex: number) => void

  /** Move row to be before previous sibling */
  onMoveRowUp?: (rowIndex: number) => void

  /** Move row to be after next sibling */
  onMoveRowDown?: (rowIndex: number) => void

  /** Handle row being clicked on */
  onRowClick?: (rowIndex: number) => void

  /** Insert child row */
  onInsertChildRow?: (rowIndex: number) => void

  /** Remove row */
  onRemoveRow?: (rowIndex: number) => void

  /** Localizer for labels */
  T: LocalizeString
}) {
  /** Style of labels on left */
  const labelStyle: CSSProperties = {
    height: rowHeight,
    paddingTop: 0,
    whiteSpace: "nowrap",
    cursor: props.onRowClick ? "pointer" : "arrow"
  }

  /** Index of row being hovered over */
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  /** Overall container (for measuring mouse position) */
  const containerRef = useRef<HTMLDivElement | null>(null)

  /** Reset hover when out */
  const handleMouseLeave = (ev: React.MouseEvent) => {
    setHoverIndex(null)
  }

  /** Handle mouse moves to hover rows */
  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return
    }

    // Do not update if within dropdown
    let target: HTMLElement | null = ev.target as HTMLElement
    while (target) {
      if (target.classList.contains("dropdown-menu")) {
        return
      }
      target = target.parentElement
    }

    // Get relative Y
    const y = ev.clientY - containerRef.current.getBoundingClientRect().top
    const rowIndex = Math.floor((y - headerHeight) / rowHeight)
    setHoverIndex(rowIndex >= 0 && rowIndex < props.rows.length ? rowIndex : null)
  }

  /** Handle mouse moves to hover rows */
  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return
    }

    // Ignore if dropdown
    let target: HTMLElement | null = ev.target as HTMLElement
    while (target) {
      if (target.classList.contains("menu")) {
        return
      }
      target = target.parentElement
    }

    // Get relative Y
    const y = ev.clientY - containerRef.current.getBoundingClientRect().top
    const rowIndex = Math.floor((y - headerHeight) / rowHeight)
    if (rowIndex >= 0 && rowIndex < props.rows.length && props.onRowClick) {
      props.onRowClick(rowIndex)
    }
  }

  /** Render a single label in left pane */
  const renderLabel = (row: GanttChartRow, index: number) => {
    // Determine if can move left (indented and previous is previous level)
    const canMoveLeft =
      props.onMoveRowLeft && row.level > 0 && index > 0 && props.rows[index - 1].level == row.level - 1

    // Determine if can move right (previous is same level)
    const canMoveRight = props.onMoveRowRight && index > 0 && props.rows[index - 1].level == row.level

    // Determine if can move up (exists previous of same level before one of previous level)
    let canMoveUp: boolean = false
    for (let i = index - 1; i >= 0; i--) {
      if (props.rows[i].level < row.level) {
        break
      }
      if (props.rows[i].level == row.level) {
        canMoveUp = props.onMoveRowUp != null
        break
      }
    }

    // Determine if can move down (exists next of same level before one of next level)
    let canMoveDown: boolean = false
    for (let i = index + 1; i < props.rows.length; i++) {
      if (props.rows[i].level < row.level) {
        break
      }
      if (props.rows[i].level == row.level) {
        canMoveDown = props.onMoveRowDown != null
        break
      }
    }

    // Determine if dropdown menu should be shown
    const showMenu =
      canMoveLeft ||
      canMoveRight ||
      canMoveUp ||
      canMoveDown ||
      props.onInsertRowBelow != null ||
      props.onInsertRowAbove != null ||
      props.onInsertChildRow != null ||
      props.onRemoveRow != null

    return (
      <div
        key={index}
        className="gantt-label"
        style={{ ...labelStyle, paddingLeft: row.level * 10, position: "relative", paddingRight: 25 }}
      >
        <span
          style={{ fontSize: 12 }}
          onClick={() => {
            if (props.onRowClick) {
              props.onRowClick(index)
            }
          }}
        >
          {row.label}
        </span>
        {showMenu ? (
          <div className="menu" style={{ position: "absolute", right: 5, top: 1 }}>
            <div
              style={{ cursor: "pointer", visibility: hoverIndex == index ? "visible" : "hidden" }}
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-caret-square-o-down text-primary" />
            </div>
            <ul className="dropdown-menu" style={{ marginTop: 0 }}>
              {props.onInsertRowAbove != null ? (
                <li>
                  <a className="dropdown-item" onClick={() => props.onInsertRowAbove!(index)}>
                    <i className="fa fa-fw text-muted fa-chevron-up" /> {props.T("Add Above")}
                  </a>
                </li>
              ) : null}
              {props.onInsertRowBelow != null ? (
                <li>
                  <a className="dropdown-item" onClick={() => props.onInsertRowBelow!(index)}>
                    <i className="fa fa-fw text-muted fa-chevron-down" /> {props.T("Add Below")}
                  </a>
                </li>
              ) : null}
              {props.onInsertChildRow != null ? (
                <li>
                  <a className="dropdown-item" onClick={() => props.onInsertChildRow!(index)}>
                    <i className="fa fa-fw text-muted fa-chevron-right" /> {props.T("Add Subitem")}
                  </a>
                </li>
              ) : null}
              {canMoveUp ? (
                <li key="moveUp">
                  <a className="dropdown-item" onClick={() => props.onMoveRowUp!(index)}>
                    <i className="fa fa-fw text-muted fa-arrow-up" /> {props.T("Move Up")}
                  </a>
                </li>
              ) : null}
              {canMoveDown ? (
                <li key="moveDown">
                  <a className="dropdown-item" onClick={() => props.onMoveRowDown!(index)}>
                    <i className="fa fa-fw text-muted fa-arrow-down" /> {props.T("Move Down")}
                  </a>
                </li>
              ) : null}
              {canMoveLeft ? (
                <li key="moveLeft">
                  <a className="dropdown-item" onClick={() => props.onMoveRowLeft!(index)}>
                    <i className="fa fa-fw text-muted fa-arrow-left" /> {props.T("Move Left")}
                  </a>
                </li>
              ) : null}
              {canMoveRight ? (
                <li key="moveRight">
                  <a className="dropdown-item" onClick={() => props.onMoveRowRight!(index)}>
                    <i className="fa fa-fw text-muted fa-arrow-right" /> {props.T("Move Right")}
                  </a>
                </li>
              ) : null}
              {props.onRemoveRow ? (
                <li key="removeRow">
                  <a className="dropdown-item" onClick={() => props.onRemoveRow!(index)}>
                    <i className="fa fa-fw text-muted fa-remove" /> {props.T("Remove")}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={containerRef}
    >
      <style>{`@media print { .no-print { display: none } }}`}</style>
      {/* Background highlight hovered row */}
      <div key="hover-row">
        {hoverIndex != null ? (
          <div
            style={{
              left: 0,
              right: 0,
              top: headerHeight + rowHeight * hoverIndex,
              height: rowHeight,
              position: "absolute",
              backgroundColor: "#EEE"
            }}
          />
        ) : null}
      </div>
      <div key="main" style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <div key="left" style={{ paddingLeft: 5, paddingTop: headerHeight, marginBottom: scrollBarHeight }}>
          {props.rows.map(renderLabel)}
          {props.onAddRow ? (
            <div key="add" className="no-print">
              <a style={{ fontSize: 12, cursor: "pointer" }} onClick={props.onAddRow}>
                {props.addRowLabel ? props.addRowLabel : <i className="fa fa-plus" />}
              </a>
            </div>
          ) : null}
        </div>
        <AutoSizeComponent key="right" injectWidth={true} injectHeight={true}>
          {(size: any) => {
            if (!size.width || !size.height) {
              // Placeholder until width is known
              return <div />
            }
            return (
              <GanttBarArea
                width={size.width - 5}
                height={size.height}
                startDate={props.startDate}
                endDate={props.endDate}
                rows={props.rows}
                onRowClick={props.onRowClick}
              />
            )
          }}
        </AutoSizeComponent>
      </div>
    </div>
  )
}

/** Area of the Gantt chart that contains the bars */
function GanttBarArea(props: {
  rows: GanttChartRow[]

  /** YYYY-MM-DD */
  startDate: string

  /** YYYY-MM-DD */
  endDate: string

  /** Width of the area in pixels */
  width: number

  /** Height of the area in pixels */
  height: number

  onRowClick?: (rowIndex: number) => void
}) {
  /** Container (for measuring mouse position) */
  const containerRef = useRef<HTMLDivElement | null>(null)

  /** Amount to scroll by in next render */
  const scrollLeftBy = useRef(0)

  // Expand to nearest month
  const startDate = moment(props.startDate, "YYYY-MM-DD").startOf("month")
  const endDate = moment(props.endDate, "YYYY-MM-DD").endOf("month")

  // Calculate total days
  const totalDays = endDate.diff(startDate, "days")
  const initialScale = props.width / totalDays

  // Set initial scale
  const [scale, setScale] = useState(initialScale)

  /** Function to convert a date into pixels at current scale */
  const dateToPx = useCallback(
    (date: Moment) => {
      return Math.floor(date.diff(startDate, "days") * scale) + 0.5
    },
    [scale, props.startDate]
  )

  /** Allow zooming using mouse wheel */
  const handleWheel = (ev: React.WheelEvent) => {
    if (!containerRef.current) {
      return
    }

    let newScale: number
    if (ev.deltaY > 0) {
      // Prevent scaling down
      newScale = Math.max(initialScale, scale / 1.1)
    } else if (ev.deltaY < 0) {
      newScale = scale * 1.1
    } else {
      return
    }

    // Set scale
    setScale(newScale)

    // Get relative X to keep in the same place
    const x = ev.clientX - containerRef.current.getBoundingClientRect().left + containerRef.current.scrollLeft

    // Determine offset needed to keep mouse position in same place
    const diffX = (x / scale) * newScale - x
    scrollLeftBy.current = diffX
  }

  // Perform scrolling immediately
  useLayoutEffect(() => {
    if (scrollLeftBy.current != 0 && containerRef.current) {
      containerRef.current.scrollBy({ left: scrollLeftBy.current })
      scrollLeftBy.current = 0
    }
  })

  /** Draw a bar of the GANTT chart */
  const renderBar = (row: GanttChartRow, index: number) => {
    // Draw bars for actual ranges
    if (row.startDate && row.endDate && row.startDate != row.endDate) {
      const rowStartDate = moment(row.startDate, "YYYY-MM-DD")
      const rowEndDate = moment(row.endDate, "YYYY-MM-DD")
      return (
        <rect
          key={index}
          x={dateToPx(rowStartDate)}
          y={headerHeight + 5 + rowHeight * index}
          width={dateToPx(rowEndDate) - dateToPx(rowStartDate)}
          height={11}
          rx={4}
          color={row.color}
          fill={row.color}
        />
      )
    }
    // Diamonds for single dates
    else if (row.startDate || row.endDate) {
      const rowDate = moment(row.startDate || row.endDate, "YYYY-MM-DD")
      const x = dateToPx(rowDate)
      const y = headerHeight + rowHeight * index + rowHeight / 2
      const size = 7
      return (
        <polygon key={index} points={[x - size, y, x, y - size, x + size, y, x, y + size].join(" ")} fill={row.color} />
      )
    } else {
      return null
    }
  }

  const todayPx = dateToPx(moment())

  return (
    <div style={{ overflowX: "auto", position: "relative", height: "100%" }} ref={containerRef} onWheel={handleWheel}>
      <svg width={totalDays * scale} height={props.height - scrollBarHeight}>
        <DayWeekScale dateToPx={dateToPx} startDate={startDate} endDate={endDate} height={props.height} scale={scale} />
        <MonthScale dateToPx={dateToPx} startDate={startDate} endDate={endDate} height={props.height} />
        <YearScale dateToPx={dateToPx} startDate={startDate} endDate={endDate} height={props.height} />
        <line key="today" x1={todayPx} y1={32} x2={todayPx} y2={props.height} stroke="#3CF" />

        {props.rows.map(renderBar)}
      </svg>
    </div>
  )
}

/** Display scale at top for each year */
function YearScale(props: { startDate: Moment; endDate: Moment; dateToPx: (date: Moment) => number; height: number }) {
  const { startDate, endDate } = props

  const date = moment(startDate)

  /** Start and end of each segment to draw */
  const segs: [Moment, Moment][] = []

  while (date.isBefore(endDate)) {
    const itemStart = moment(date)
    date.add(1, "years")
    const itemEnd = moment(date)
    if (itemEnd.isAfter(endDate)) {
      segs.push([itemStart, endDate])
    } else {
      segs.push([itemStart, itemEnd])
    }
  }

  return (
    <g>
      {segs.map((seg, i) => {
        const left = props.dateToPx(seg[0])
        const right = props.dateToPx(seg[1])
        return (
          <g key={i}>
            <line key="left" x1={left} y1={0} x2={left} y2={props.height} stroke="#DDD" strokeWidth={1} />
            <line key="right" x1={right} y1={0} x2={right} y2={props.height} stroke="#DDD" strokeWidth={1} />
            <text textAnchor="middle" x={(left + right) / 2} y={8} fill="#333" fontSize={9}>
              {seg[0].format("YYYY")}
            </text>
          </g>
        )
      })}
    </g>
  )
}

/** Display scale at top for each month */
function MonthScale(props: { startDate: Moment; endDate: Moment; dateToPx: (date: Moment) => number; height: number }) {
  const { startDate, endDate } = props

  const date = moment(startDate)

  /** Start and end of each segment to draw */
  const segs: [Moment, Moment][] = []

  while (date.isBefore(endDate)) {
    const itemStart = moment(date)
    date.add(1, "months")
    const itemEnd = moment(date)
    if (itemEnd.isAfter(endDate)) {
      segs.push([itemStart, endDate])
    } else {
      segs.push([itemStart, itemEnd])
    }
  }

  return (
    <g>
      {segs.map((seg, i) => {
        const left = props.dateToPx(seg[0])
        const right = props.dateToPx(seg[1])
        return (
          <g key={i}>
            <line key="left" x1={left} y1={11} x2={left} y2={props.height} stroke="#DDD" strokeWidth={1} />
            <line key="right" x1={right} y1={11} x2={right} y2={props.height} stroke="#DDD" strokeWidth={1} />
            <text key="text" textAnchor="middle" x={(left + right) / 2} y={21} fill="#666" fontSize={9}>
              {seg[0].format("MMM")}
            </text>
          </g>
        )
      })}
    </g>
  )
}

/** Display scale at top for each week or day (if scale permits) */
function DayWeekScale(props: {
  startDate: Moment
  endDate: Moment
  dateToPx: (date: Moment) => number
  height: number
  scale: number
}) {
  const { startDate, endDate } = props

  const date = moment(startDate).startOf("week")

  /** Start and end of each segment to draw */
  const segs: [Moment, Moment][] = []

  // Display nothing if too zoomed out
  if (props.scale < 1.6) {
    return null
  }

  while (date.isBefore(endDate)) {
    const itemStart = moment(date)
    // Use day if scale permits
    date.add(1, props.scale > 15 ? "days" : "weeks")
    const itemEnd = moment(date)

    // Weeks should not extend outside of range
    if (!itemEnd.isAfter(endDate) && !itemStart.isBefore(startDate)) {
      segs.push([itemStart, itemEnd])
    }
  }

  return (
    <g>
      {segs.map((seg, i) => {
        const left = props.dateToPx(seg[0])
        const right = props.dateToPx(seg[1])
        return (
          <g key={i}>
            <line key="left" x1={left} y1={22} x2={left} y2={props.height} stroke="#F6F6F6" strokeWidth={1} />
            <line key="right" x1={right} y1={22} x2={right} y2={props.height} stroke="#F6F6F6" strokeWidth={1} />
            <text key="text" textAnchor="middle" x={(left + right) / 2} y={31} fill="#AAA" fontSize={9}>
              {seg[0].format("DD")}
            </text>
          </g>
        )
      })}
    </g>
  )
}
