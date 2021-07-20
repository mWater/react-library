import React from "react";
export default class FillDownwardComponent extends React.Component<{}, {
    height: number | null;
}> {
    self: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateSize: () => void;
    render(): React.DetailedReactHTMLElement<{
        style: {
            height: number;
            position: "relative";
        };
        ref: (c: HTMLElement | null) => HTMLElement | null;
    }, HTMLElement>;
}
