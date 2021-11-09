import React from "react";
export interface ModalPopupComponentProps {
    /** Header of modal. Any react element */
    header?: React.ReactNode;
    /** Footer of modal. Any react element */
    footer?: React.ReactNode;
    /** Size of modal. Default is "normal" */
    size?: "large" | "full" | "normal" | "small";
    /** True to show close 'x' at top right */
    showCloseX?: boolean;
    /** callback function to be called when close is requested */
    onClose?: () => void;
    width?: number;
}
export default class ModalPopupComponent extends React.Component<ModalPopupComponentProps> {
    modalNode: any;
    static show: (modalFunc: any, onClose: any) => Element;
    constructor(props: any);
    componentWillUnmount(): any;
    render(): React.ReactPortal;
}
export interface InnerModalComponentProps {
    /** Header of modal. Any react element */
    header?: any;
    /** Footer of modal. Any react element */
    footer?: any;
    /** "large" for large, "full" for full-width */
    size?: string;
    /** True to show close 'x' at top right */
    showCloseX?: boolean;
    /** callback function to be called when close is requested */
    onClose?: any;
    width?: number;
}
