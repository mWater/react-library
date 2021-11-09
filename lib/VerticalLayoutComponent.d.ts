import React from "react";
export interface VerticalLayoutComponentProps {
    /** Height of component */
    height: number;
    /** Fraction to allocate for fractional heights. Should total 1.0. Keyed by key of child */
    relativeHeights: {
        [key: string]: number;
    };
}
interface VerticalLayoutComponentState {
    availableHeight: any;
}
export default class VerticalLayoutComponent extends React.Component<VerticalLayoutComponentProps, VerticalLayoutComponentState> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    recalculateSize: (props: any) => void;
    getComponent(key: any): any;
    render(): React.DetailedReactHTMLElement<{
        style: {
            height: number;
        };
    }, HTMLElement>;
}
export {};
