import React, { ReactElement, ReactNode } from "react";
export interface ReorderableListComponentProps<T> {
    /** items to be reordered */
    items: T[];
    /** callback function, called when an item is dropped, gets passed the reordered item list */
    onReorder: (items: T[]) => void;
    /** function which renders the item, gets passed the current item and react dnd connectors
     * signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget) */
    renderItem: (item: T, index: number, connectDragSource: (node: ReactNode) => ReactNode, connectDragPreview: (node: ReactNode) => ReactNode, connectDropTarget: (node: ReactNode) => ReactNode) => ReactNode;
    /** function which should return the identifier of the current item, gets passed the current item. Used for key. Optional */
    getItemId?: (item: T, index: number) => any;
    /** a unique id for the list */
    listId?: string;
    /** the element to render this component as. Default is div */
    element?: ReactElement;
}
interface ReorderableListComponentState {
    order: number[] | null;
    listId: string;
}
/** Reorderable component for nested items
 * Currently supports reordering within the same list */
export default class ReorderableListComponent<T> extends React.Component<ReorderableListComponentProps<T>, ReorderableListComponentState> {
    static defaultProps: {
        element: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    };
    constructor(props: any);
    componentDidUpdate(prevProps: Readonly<ReorderableListComponentProps<T>>, prevState: Readonly<ReorderableListComponentState>): void;
    handlePutBefore: (id: number, beforeId: number) => void;
    handlePutAfter: (id: number, afterId: number) => void;
    handleEndDrag: () => void;
    fixOrder: (items: T[], order: number[] | null) => T[];
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
export {};
