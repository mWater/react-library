import React from "react";
import { default as ReactResizeDetector } from "react-resize-detector";
interface AutoSizeComponentProps {
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
export {};
