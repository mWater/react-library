import React, { ReactNode } from "react";
interface TabbedComponentProps {
    /** Array of { id, label, elem, onRemove (optional) } */
    tabs: Array<{
        id: string;
        label: ReactNode;
        elem: ReactNode;
        onRemove?: () => void;
    }>;
    /** Initially selected id of tab */
    initialTabId?: string;
    /** Selected id of tab if controlled component */
    tabId?: string;
    /** Set to have a plus to add a tab */
    onAddTab?: () => void;
    /** Set to be called back when a tab is clicked (tabId) instead of setting internal state */
    onTabClick?: (tabId: string) => void;
}
export default class TabbedComponent extends React.Component<TabbedComponentProps, {
    tabId?: string;
}> {
    constructor(props: any);
    handleClick: (tabId: any) => void;
    handleRemove: (tab: any, ev: any) => any;
    renderTab: (tab: any) => React.DetailedReactHTMLElement<{
        key: any;
        className: string | undefined;
    }, HTMLElement>;
    render(): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}
export {};
