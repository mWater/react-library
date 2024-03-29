import React from "react";
import CrossComponent from "./CrossComponent";
export interface VerticalTreeLayoutComponentProps {
    headElem?: any;
    /** e.g. 50 */
    height?: number;
    line: string;
}
export default class VerticalTreeLayoutComponent extends React.Component<VerticalTreeLayoutComponentProps> {
    renderChildren(): (React.CElement<import("./CrossComponent").CrossComponentProps, CrossComponent> | React.DetailedReactHTMLElement<{
        key: number;
        style: {
            display: "flex";
            flexFlow: "column nowrap";
            justifyContent: "flex-start";
            flexShrink: number;
        };
    }, HTMLElement>)[];
    render(): React.DetailedReactHTMLElement<{
        style: {
            display: "flex";
            flexFlow: "column nowrap";
            alignItems: "center";
        };
    }, HTMLElement>;
}
