import React from "react";
export default class Divider extends React.Component<{
    split?: "vertical" | "horizontal";
    onMouseDown: (ev: any) => void;
}> {
    onMouseDown: (event: any) => void;
    render(): React.DetailedReactHTMLElement<{
        className: string;
        onMouseDown: (event: any) => void;
    }, HTMLElement>;
}
