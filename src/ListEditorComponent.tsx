import { ReactNode, useState } from "react"
import React from "react"
import ActionCancelModal from './ActionCancelModalComponent'
import ReorderableListComponent from "./reorderable/ReorderableListComponent"

/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup
 */
export function ListEditorComponent<T>(props: {
  items: T[]
  onItemsChange: (items: T[]) => void

  /** Render the item in the list. Already inside a list-group-item */
  renderItem: (item: T, index: number) => ReactNode

  /** Render the editor in the popup modal */
  renderEditor: (item: Partial<T>, onItemChange: (item: Partial<T>) => void) => ReactNode
  
  /** Create a new item. Doesn't allow add if not present */
  createNew?: () => Partial<T>

  /** Validate an item. True for valid */
  validateItem: (item: Partial<T>) => boolean

  /** Override label of add button */
  addLabel?: string

  /** Prompt to confirm deletion */
  deleteConfirmPrompt?: string

  /** Allows list to be re-ordered by dragging. Returns unique key for each item */
  getReorderableKey?: (item: T) => any
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

    // Confirm deletion
    if (props.deleteConfirmPrompt && !confirm(props.deleteConfirmPrompt)) {
      return
    }

    const items = props.items.slice()
    items.splice(index, 1)
    props.onItemsChange(items)
  }

  /** Render as an li element */
  const renderListItem = (
    item: T, 
    index: number
  ) => {
    return <li className="list-group-item" onClick={() => {
      setEditing(item)
      setEditingIndex(index)
    }} key={index}>
      <a className="btn btn-link btn-xs" onClick={handleDelete.bind(null, index)} style={{ float: "right", cursor: "pointer" }}>
        <i className="fa fa-remove"/>
      </a>
      {props.renderItem(item, index)}
    </li>
  }
  
  /** Render as an li element */
  const renderDraggableListItem = (
    item: T, 
    index: number, 
    connectDragSource: (node: ReactNode) => ReactNode, 
    connectDragPreview: (node: ReactNode) => ReactNode,
    connectDropTarget: (node: ReactNode) => ReactNode
  ) => {
    let elem: ReactNode = renderListItem(item, index)
    elem = connectDragSource(elem)
    elem = connectDragPreview(elem)
    elem = connectDropTarget(elem)
    return elem
  }
  
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
    { props.getReorderableKey ?
      <ReorderableListComponent
        items={props.items}
        getItemId={props.getReorderableKey}
        onReorder={props.onItemsChange}
        renderItem={renderDraggableListItem}
        element={<ul className="list-group"/>}
      />
    :
      <ul className="list-group">
        { props.items.map(renderListItem) }
      </ul>
    }
    { props.createNew ?
      <div key="add">
        <button type="button" className="btn btn-link" onClick={handleAdd}>
          <i className="fa fa-plus"/> { props.addLabel || "Add" }
        </button>
      </div>
    : null }
  </div>
}