import React from "react";
import * as ui from "./bootstrap";
export interface NumberInputComponentProps {
    decimal?: boolean;
    value?: number;
    onChange: any;
    /** Will be merged with style of input box */
    style?: any;
    /** True to render with input-sm */
    small?: boolean;
    /** Placeholder text */
    placeholder?: string;
}
export default class NumberInputComponent extends React.Component<NumberInputComponentProps> {
    render(): React.CElement<ui.NumberInputProps, ui.NumberInput>;
}
