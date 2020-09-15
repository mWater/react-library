import React from "react";
import { defaultT } from 'ez-localize'
import { GanttChart } from "./GanttChart";

export function GanttChartDemo() {
  return <div style={{ paddingTop: 20 }}>
    <GanttChart
      rows={[
        { color: "#68cdee", level: 0, startDate: "2020-01-14", endDate: "2020-05-23", label: "Activity 1" },
        { color: "#68cdee", level: 1, startDate: "2020-02-14", endDate: "2020-06-23", label: "Activity 2" },
        { color: "#68cdee", level: 2, startDate: "2020-04-12", endDate: null, label: "Activity 3" },
        { color: "#68cdee", level: 0, startDate: "2020-01-14", endDate: "2020-05-23", label: "Activity 1" },
        { color: "#68cdee", level: 1, startDate: "2020-02-14", endDate: "2020-06-23", label: "Activity 2" },
        { color: "#68cdee", level: 1, startDate: "2020-04-12", endDate: "2020-07-23", label: "Activity 3" }
      ]}
      startDate="2020-01-01"
      endDate="2022-10-01"
      T={defaultT}
      onMoveRowDown={() => {}}
      onMoveRowUp={() => {}}
      onMoveRowLeft={() => {}}
      onMoveRowRight={() => {}}
      onRowClick={() => { alert("onRowClick")}}
      onAddRow={() => { alert("sdfasdf")}}
      onInsertRowAbove={() => {}}
      onInsertRowBelow={() => {}}
      />
  </div>
}
