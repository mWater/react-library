import { ReactNode, useState } from "react"
import React from "react"
import ActionCancelModal from './ActionCancelModalComponent'

/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup
 */
export function ListEditorComponent<T>(props: {
  items: T[]
  onItemsChange: (items: T[]) => void

  /** Render the item in the list. Already inside a list-group-item */
  renderItem: (item: T) => ReactNode

  /** Render the editor in the popup modal */
  renderEditor: (item: Partial<T>, onItemChange: (item: Partial<T>) => void) => ReactNode
  
  /** Create a new item. Doesn't allow add if not present */
  createNew?: () => Partial<T>

  /** Validate an item. True for valid */
  validateItem: (item: Partial<T>) => boolean

  /** Override label of add button */
  addLabel?: string
}) {
  const [adding, setAdding] = useState<Partial<T>>()
  const [editing, setEditing] = useState<Partial<T>>()
  const [editingIndex, setEditingIndex] = useState<number>()
  
  const handleAdd = () => {
    setAdding(props.createNew!())
  }

  const handleDelete = (index: number, ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.stopPropagation()
    ev.preventDefault()
    if (confirm("Delete item?")) {
      const items = props.items.slice()
      items.splice(index, 1)
      props.onItemsChange(items)
    }
  }
  
  const itemNodes = props.items.map((item, index) => (
    <li className="list-group-item" onClick={() => {
      setEditing(item)
      setEditingIndex(index)
    }} key={index}>
      <a className="btn btn-link btn-xs" onClick={handleDelete.bind(null, index)} style={{ float: "right", cursor: "pointer", marginTop: 2 }}>
        <i className="fa fa-remove"/>
      </a>
      {props.renderItem(item)}
    </li>
  ))

  return <div>
    { adding ?
      <ActionCancelModal
        actionLabel="Add"
        onCancel={() => setAdding(undefined)}
        onAction={() => {
          if (!props.validateItem(adding)) {
            return
          }
          props.onItemsChange(props.items.concat([adding as T]))
          setAdding(undefined)
        }}
      >
        { props.renderEditor(adding, setAdding) }
      </ActionCancelModal>
    : null }
    { editing != null ?
      <ActionCancelModal
        size="large"
        onCancel={() => setEditing(undefined)}
        onAction={() => {
          if (!props.validateItem(editing)) {
            return
          }
          const items = props.items.slice()
          items.splice(editingIndex!, 1, editing as T)
          props.onItemsChange(items)
          setEditing(undefined)
        }}
      >
        { props.renderEditor(editing, setEditing) }
      </ActionCancelModal>
    : null }
    <ul className="list-group">
      { itemNodes }
    </ul>
    { props.createNew ?
      <div key="add">
        <button type="button" className="btn btn-link" onClick={handleAdd}>
          <i className="fa fa-plus"/> { props.addLabel || "Add" }
        </button>
      </div>
    : null }
  </div>
}