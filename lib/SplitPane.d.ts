import React from "react";
export interface SplitPaneProps {
    split: "vertical" | "horizontal";
    firstPaneSize?: string | number;
    minFirstPaneSize?: number;
    onResize: (size?: number | string) => void;
}
export default class SplitPane extends React.Component<SplitPaneProps, {
    resizing: boolean;
    firstPaneSize?: string | number;
    dragStartAt?: any;
}> {
    firstPane: any;
    constructor(props: SplitPaneProps);
    static defaultProps(): {
        split: string;
    };
    onMouseUp: () => void;
    onMouseDown: (event: any) => void;
    onMouseMove: (event: any) => void;
    render(): React.DetailedReactHTMLElement<{
        style: React.CSSProperties;
        className: string;
        onMouseMove: (event: any) => void;
        onMouseUp: () => void;
    }, HTMLElement>;
}
