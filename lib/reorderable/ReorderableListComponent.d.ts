import React, { ReactNode, ReactElement } from "react"

/** Reorderable component for nested items
 * Currently supports reordering within the same list */
export default class ReorderableListComponent<T> extends React.Component<{
  /** items to be reordered */
  items: T[] 
  
  /** callback function, called when an item is dropped, gets passed the reordered item list */
  onReorder: (items: T[]) => void  

  /** function which renders the item, gets passed the current item and react dnd connectors
   * signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget) */
  renderItem: (
    item: T, 
    index: number, 
    connectDragSource: (node: ReactNode) => ReactNode,
    connectDragPreview: (node: ReactNode) => ReactNode,
    connectDropTarget: (node: ReactNode) => ReactNode
  ) => ReactNode

  /** function which should return the identifier of the current item, gets passed the current item. Used for key */
  getItemId: (item: T) => any

  /** a unique id for the list */
  listId?: string 

  /** the element to render this component as. Default is div */
  element?: ReactElement 
}> {}
