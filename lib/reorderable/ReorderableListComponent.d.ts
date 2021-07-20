import React from "react";
interface ReorderableListComponentProps {
    /** items to be reordered */
    items: any;
    /** callback function, called when an item is dropped, gets passed the reordered item list */
    onReorder: any;
    /** function which renders the item, gets passed the current item and react dnd connectors */
    renderItem: any;
    /** a uniqid for the list */
    listId?: string;
    /** function which should return the identifier of the current item, gets passed the current item */
    getItemId: any;
    element?: any;
}
interface ReorderableListComponentState {
    order: any;
    listId: any;
}
declare class ReorderableListComponent extends React.Component<ReorderableListComponentProps, ReorderableListComponentState> {
    static defaultProps: {
        element: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handlePutBefore: (id: any, beforeId: any) => void;
    handlePutAfter: (id: any, afterId: any) => void;
    handleEndDrag: () => any;
    fixOrder: (items: any, order: any) => any;
    render(): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}
export default ReorderableListComponent;
