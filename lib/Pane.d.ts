import React from "react";
export default class Pane extends React.Component<{
    split?: "vertical" | "horizontal";
    width?: number | string;
}> {
    static defaultProps(): {
        split: string;
    };
    render(): React.DetailedReactHTMLElement<{
        style: React.CSSProperties;
        className: string;
    }, HTMLElement>;
}
