import React, { ReactElement } from "react";
export interface ModalWindowComponentProps {
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
    /** Render something into a top-level div */
    static show: (modalFunc: (close: () => void) => ReactElement, onClose?: (() => void) | undefined) => void | Element | React.Component<any, any, any>;
    constructor(props: ModalWindowComponentProps);
    componentWillUnmount(): any;
    render(): React.ReactPortal;
}
