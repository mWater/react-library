import React, { ReactNode } from "react";
interface PopoverHelpComponentProps {
    placement?: "top" | "right" | "bottom" | "left";
    /** hover is default */
    trigger?: "hover" | "click";
    /** Override content. Defaults to gray question circle */
    content?: ReactNode;
}
/** Shows a popover when help icon is clicked. Needs bootstrap */
export default class PopoverHelpComponent extends React.Component<PopoverHelpComponentProps> {
    static defaultProps: {
        placement: string;
        trigger: string;
    };
    render(): React.CElement<{
        trigger: string[];
        placement: "left" | "right" | "bottom" | "top" | undefined;
        overlay: React.CElement<{}, React.Component<{}, any, any>>;
    }, React.Component<{
        trigger: string[];
        placement: "left" | "right" | "bottom" | "top" | undefined;
        overlay: React.CElement<{}, React.Component<{}, any, any>>;
    }, any, any>>;
}
export {};
