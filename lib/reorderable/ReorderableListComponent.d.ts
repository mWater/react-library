import React, { ReactElement, ReactNode } from "react";
interface ReorderableListComponentProps<T> {
    /** items to be reordered */
    items: T[];
    /** callback function, called when an item is dropped, gets passed the reordered item list */
    onReorder: (items: T[]) => void;
    /** function which renders the item, gets passed the current item and react dnd connectors
     * signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget) */
    renderItem: (item: T, index: number, connectDragSource: (node: ReactNode) => ReactNode, connectDragPreview: (node: ReactNode) => ReactNode, connectDropTarget: (node: ReactNode) => ReactNode) => ReactNode;
    /** function which should return the identifier of the current item, gets passed the current item. Used for key */
    getItemId: (item: T) => any;
    /** a unique id for the list */
    listId?: string;
    /** the element to render this component as. Default is div */
    element?: ReactElement;
}
interface ReorderableListComponentState {
    order: any;
    listId: any;
}
/** Reorderable component for nested items
 * Currently supports reordering within the same list */
export default class ReorderableListComponent<T> extends React.Component<ReorderableListComponentProps<T>, ReorderableListComponentState> {
    static defaultProps: {
        element: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: ReorderableListComponentProps<T>): void;
    handlePutBefore: (id: any, beforeId: any) => void;
    handlePutAfter: (id: any, afterId: any) => void;
    handleEndDrag: () => void;
    fixOrder: (items: any, order: any) => any;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
}
export {};
