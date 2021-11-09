export interface ReorderableListItemComponentProps {
    /** the item from reorderable list */
    item: any;
    /** internally used for tracking if an item is being dragged */
    isDragging: boolean;
    /** internally used to check if an item is over the current component */
    isOver: boolean;
    /** internally used as a flag it the item being dragged can be dropped in place of the item it is over */
    canDrop: boolean;
    /** the drag source connector, supplied by React DND */
    connectDragSource: any;
    /** the drop target connector, supplied by React DND */
    connectDropTarget: any;
    /** the drag preview connector, supplied by React DND */
    connectDragPreview: any;
    /** Call with (id, beforeId) */
    onPutBefore: any;
    /** Call with (id, afterId) */
    onPutAfter: any;
    /** Called when drag is complete */
    onEndDrag: any;
    /** index of the current item */
    index: number;
    /** function to render the current item, passed by ReorderableListComponent */
    renderItem: any;
    /** the ID of the list where reordering is constrained to */
    constrainTo: string;
    getItemId: any;
}
declare const _default: any;
export default _default;
