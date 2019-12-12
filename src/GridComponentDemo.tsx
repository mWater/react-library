import React, { useState, useCallback } from "react"
import { RenderCellProps, RenderColHeaderProps, RenderRowHeaderProps, GridComponent, RenderCellEditorProps, SaveEditFunc } from "./GridComponent"
import ReactSelect from 'react-select'

export const GridComponentDemo = () => {
  const [colWidths, setColWidths] = useState([100, 200, 300, 400, 500])
  const renderCell = (props: RenderCellProps) => {
    return <div style={{padding: 10}}>{`x${props.row}:${props.col}`}</div>
  }
  const renderColHeader = (props: RenderColHeaderProps) => {
    return <div style={{padding: 5}}>{`x${props.col}`}</div>
  }
  const renderRowHeader = (props: RenderRowHeaderProps) => {
    return <div style={{padding: 10}}><i className="fa fa-open"/></div>
  }

  const renderCellEditor = (props: RenderCellEditorProps) => {
    return <Editor width={props.width} setSaveEdit={props.setSaveEdit}/>
  }

  return <div style={{ padding: 20 }}>
    <GridComponent
      colWidths={colWidths}
      onColWidthsChange={setColWidths}
      height={600}
      numRows={1000}
      rowHeight={40}
      rowHeaderWidth={40}
      colHeaderHeight={32}
      width={800}
      renderCell={renderCell}
      renderColHeader={renderColHeader}
      renderRowHeader={renderRowHeader}
      renderCellEditor={renderCellEditor}
      colHeaderExtraWidth={20}
      renderColHeaderExtra={() => "X"}
      rowHeaderExtraHeight={20}
      renderRowHeaderExtra={() => "X"}
      canEdit={() => true}
      />
  </div> 
}

const Editor = (props: { width: number, setSaveEdit: (saveEditFunc: SaveEditFunc) => void  }) => {
  const [value, setValue] = useState<any>(null)

  props.setSaveEdit(() => {
    alert(value)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  })

  /** Focus on select */
  const selectRef = useCallback((node: ReactSelect | null) => {
    if (node) { 
      setTimeout(() => { node.focus()  }, 0)
    }
  }, [])

  return <div style={{width: props.width}}>
     <ReactSelect options={[{ value: "x", label: "X"}, { value: "y", label: "Y"}]} value={value} onChange={(v: any) => {
       console.log("onChange")
       setValue(v)
     }} onBlur={() => { console.log("onBlur")}}
        isMulti={true}
        ref={selectRef}
      />
  </div>  
}