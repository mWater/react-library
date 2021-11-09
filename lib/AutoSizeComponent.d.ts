import React from "react";
import ReactResizeDetector from "react-resize-detector/build/withPolyfill";
export interface AutoSizeComponentProps {
    /** True to inject width */
    injectWidth?: boolean;
    /** True to inject height */
    injectHeight?: boolean;
    children: (size: {
        width?: number;
        height?: number;
    }) => React.ReactElement<any>;
}
export default class AutoSizeComponent extends React.Component<AutoSizeComponentProps> {
    render(): React.CElement<import("react-resize-detector/build/ResizeDetector").ComponentsProps<HTMLElement>, ReactResizeDetector<HTMLElement>>;
}
