import React from "react";
interface CrossComponentProps {
    /** north border style (e.g. "solid 1px blue") */
    n?: string;
    /** east border style (e.g. "solid 1px blue") */
    e?: string;
    /** south border style (e.g. "solid 1px blue") */
    s?: string;
    /** west border style (e.g. "solid 1px blue") */
    w?: string;
    /** 100% or 20, etc. Default: 100% */
    width?: any;
    /** 100% or 20, etc. Default: 100% */
    height?: any;
    /** True to collapse top half of box */
    collapseTop?: boolean;
}
export default class CrossComponent extends React.Component<CrossComponentProps> {
    static defaultProps: {
        width: string;
        height: string;
    };
    render(): React.DetailedReactHTMLElement<{
        className: string;
        style: {
            display: "flex";
            flexDirection: "column";
            width: any;
            height: any;
        };
    }, HTMLElement>;
}
export {};
