import React from "react";
interface ModalWindowComponentProps {
    /** True to display modal window */
    isOpen: boolean;
    /** Called when close X is clicked */
    onRequestClose?: () => void;
    backgroundColor?: string;
    /** Outer padding default 40 */
    outerPadding?: number;
    /** Inner padding default 20 */
    innerPadding?: number;
}
export default class ModalWindowComponent extends React.Component<ModalWindowComponentProps> {
    modalNode: any;
    static show: (modalFunc: any, onClose: any) => Element;
    constructor(props: any);
    componentWillUnmount(): any;
    render(): React.ReactPortal;
}
export {};
