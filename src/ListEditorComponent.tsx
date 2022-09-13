import { ReactNode, useState } from "react"
import React from "react"
import ActionCancelModal from "./ActionCancelModalComponent"
import ReorderableListComponent from "./reorderable/ReorderableListComponent"

/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup if present
 */
export function ListEditorComponent<T>(props: {
  items: T[]
  onItemsChange: (items: T[]) => void

  /** Render the item in the list. Already inside a list-group-item */
  renderItem: (item: T, index: number, onItemChange: (item: T) => void) => ReactNode

  /** Render the editor in the popup modal */
  renderEditor?: (item: Partial<T>, onItemChange: (item: Partial<T>) => void) => ReactNode

  /** Create a new item. Doesn't allow add if not present. If editor not present, must return valid item */
  createNew?: () => Partial<T>

  /** Validate an item. True for valid */
  validateItem?: (item: Partial<T>) => boolean

  /** Override label of add button */
  addLabel?: string

  /** Prompt to confirm deletion */
  deleteConfirmPrompt?: string

  /** Allows list to be re-ordered by dragging. Returns unique key for each item.
   * Can just return index for simplicity.
   */
  getReorderableKey?: (item: T, index: number) => any

  /** Puts an edit on the right which must be clicked to edit */
  editLink?: boolean
}) {
  const [adding, setAdding] = useState<Partial<T>>()
  const [editing, setEditing] = useState<Partial<T>>()
  const [editingIndex, setEditingIndex] = useState<number>()

  const handleAdd = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation()

    if (props.renderEditor != null) {
      setAdding(props.createNew!())
    } else {
      props.onItemsChange(props.items.concat(props.createNew!() as T))
    }
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
  const renderListItem = (item: T, index: number) => {
    const handleChange = (value: T) => {
      const items = props.items.slice()
      items[index] = value
      props.onItemsChange(items)
    }

    const handleClick = () => {
      if (props.renderEditor != null) {
        setEditing(item)
        setEditingIndex(index)
      }
    }

    return (
      <li className="list-group-item" onClick={props.editLink ? undefined : handleClick} key={index}>
        <a
          onClick={handleDelete.bind(null, index)}
          style={{ float: "right", cursor: "pointer", color: "var(--bs-primary)" }}
        >
          <i className="fa fa-remove" />
        </a>
        {props.editLink && props.renderEditor != null ? (
          <a onClick={handleClick} style={{ float: "right", cursor: "pointer", color: "var(--bs-primary)" }}>
            <i className="fa fa-pencil" />
          </a>
        ) : null}
        {props.renderItem(item, index, handleChange)}
      </li>
    )
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

  return (
    <div>
      {adding && props.renderEditor != null ? (
        <ActionCancelModal
          size="large"
          actionLabel="Add"
          onCancel={() => setAdding(undefined)}
          onAction={() => {
            if (props.validateItem != null && !props.validateItem(adding)) {
              return
            }
            props.onItemsChange(props.items.concat([adding as T]))
            setAdding(undefined)
          }}
        >
          {props.renderEditor(adding, setAdding)}
        </ActionCancelModal>
      ) : null}
      {editing != null && props.renderEditor != null ? (
        <ActionCancelModal
          size="large"
          onCancel={() => setEditing(undefined)}
          onAction={() => {
            if (props.validateItem != null && !props.validateItem(editing)) {
              return
            }
            const items = props.items.slice()
            items.splice(editingIndex!, 1, editing as T)
            props.onItemsChange(items)
            setEditing(undefined)
          }}
        >
          {props.renderEditor(editing, setEditing)}
        </ActionCancelModal>
      ) : null}
      {props.getReorderableKey ? (
        <ReorderableListComponent
          items={props.items}
          getItemId={props.getReorderableKey}
          onReorder={props.onItemsChange}
          renderItem={renderDraggableListItem}
          element={<ul className="list-group" />}
        />
      ) : (
        <ul className="list-group">{props.items.map(renderListItem)}</ul>
      )}
      {props.createNew ? (
        <div key="add">
          <button type="button" className="btn btn-link" onClick={handleAdd}>
            <i className="fa fa-plus" /> {props.addLabel || "Add"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
