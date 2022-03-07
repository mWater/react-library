import React from "react";
export interface FillDownwardComponentProps {
    /** Optional bottom margin */
    margin?: number;
}
/** Component which sets its height to automatically fill all remaining vertical space, minus an optional margin */
export default class FillDownwardComponent extends React.Component<FillDownwardComponentProps, {
    height: number | null;
}> {
    self: any;
    constructor(props: FillDownwardComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateSize: () => void;
    render(): React.DetailedReactHTMLElement<{
        style: {
            height: number;
            position: "relative";
        };
        ref: (c: HTMLElement | null) => void;
    }, HTMLElement>;
}
