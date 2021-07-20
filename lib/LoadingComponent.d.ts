import React, { ReactNode } from "react";
interface LoadingComponentProps {
    /** Defaults to 100% */
    width?: string | number;
    /** Defaults to 100% */
    height?: string | number;
    /** Defaults to Loading... */
    label?: ReactNode;
}
export default class LoadingComponent extends React.Component<LoadingComponentProps> {
    static defaultProps: {
        width: string;
        height: string;
        label: React.DetailedReactHTMLElement<{
            className: string;
            style: {
                fontSize: number;
            };
        }, HTMLElement>;
    };
    render(): React.DetailedReactHTMLElement<{
        style: {
            width: string | number | undefined;
            height: string | number | undefined;
            display: "flex";
            alignItems: "center";
            justifyContent: "center";
        };
    }, HTMLElement>;
}
export {};
