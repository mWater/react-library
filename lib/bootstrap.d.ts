import React, { CSSProperties, ReactNode } from "react";
/** Simple spinner */
export declare function Spinner(): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
/** Standard button */
export declare class Button extends React.Component<{
    /** "default" gets mapped to "secondary" */
    type: string;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    /** xs is deprecated. TODO how to handle */
    size?: "sm" | "xs" | "lg";
}> {
    static defaultProps: {
        type: string;
    };
    render(): React.DetailedReactHTMLElement<{
        type: string;
        className: string;
        onClick: (() => void) | undefined;
        disabled: boolean | undefined;
    }, HTMLElement>;
}
/** Icon, font-awesome v4 */
export declare class Icon extends React.Component<{
    id: string;
}> {
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement> | null;
}
/** Indented form group with a label, optional help text. Label and indented contents */
export declare class FormGroup extends React.Component<{
    /** Label to display */
    label: ReactNode;
    /** True to mute label */
    labelMuted?: boolean;
    /** Hint to append to label. Makes label faded if only hint presented */
    hint?: ReactNode;
    /** Help block at bottom */
    help?: ReactNode;
    /** @deprecated True to display as success */
    hasSuccess?: boolean;
    /** @deprecated True to display as warning */
    hasWarnings?: boolean;
    /** @deprecated True to display as error */
    hasErrors?: boolean;
}> {
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
export interface CheckboxProps {
    value: boolean | null | undefined;
    onChange?: (value: boolean) => void;
    inline?: boolean;
    /** Uses null for false */
    nullForFalse?: boolean;
    disabled?: boolean;
}
export declare class Checkbox extends React.Component<CheckboxProps> {
    id: string;
    constructor(props: CheckboxProps);
    handleChange: (ev: any) => void;
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
export interface RadioProps {
    /** Value to display */
    value: any;
    /** Value that radio button represents. If equal to value, button is checked */
    radioValue: any;
    /** Called with radio value */
    onChange: (value: any) => void;
    /** Makes horizontal */
    inline?: boolean;
    disabled?: boolean;
}
export declare class Radio extends React.Component<RadioProps> {
    id: string;
    constructor(props: RadioProps);
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
/** Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
 * all work as possible options.*/
export declare class Select<T> extends React.Component<{
    value: T | null;
    onChange?: (value: T | null) => void;
    options: Array<{
        value: T | null;
        label: string;
    }>;
    size?: "lg" | "sm";
    nullLabel?: string;
    style?: object;
    inline?: boolean;
}> {
    handleChange: (ev: any) => void;
    render(): React.DOMElement<{
        style: {};
        disabled: boolean;
        className: string;
        value: string;
        onChange: (ev: any) => void;
    }, Element>;
}
export declare type TextInputProps = TextInputPropsNull | TextInputPropsNoNull;
export interface TextInputPropsNoNull {
    value: string | null;
    onChange?: (value: string) => void;
    placeholder?: string;
    size?: "sm" | "lg";
    emptyNull?: false;
    style?: object;
}
export interface TextInputPropsNull {
    value: string | null;
    onChange?: (value: string | null) => void;
    placeholder?: string;
    size?: "sm" | "lg";
    emptyNull: true;
    style?: object;
}
export declare class TextInput extends React.Component<TextInputProps> {
    input?: HTMLInputElement | null;
    handleChange: (ev: any) => void;
    focus(): void | undefined;
    render(): React.DetailedReactHTMLElement<{
        ref: (c: HTMLInputElement | null) => HTMLInputElement | null;
        type: string;
        className: string;
        value: string;
        style: object | undefined;
        onChange: ((ev: any) => void) | undefined;
        placeholder: string | undefined;
        disabled: boolean;
    }, HTMLInputElement>;
}
export interface NumberInputProps {
    decimal: boolean;
    value?: number | null;
    onChange?: (value: number | null) => void;
    style?: CSSProperties;
    size?: "sm" | "lg";
    onTab?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    onEnter?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Force an exact number of decimal places, rounding value as necessary */
    decimalPlaces?: number;
    placeholder?: string;
    min?: number;
    max?: number;
}
export declare class NumberInput extends React.Component<NumberInputProps, {
    inputText: string;
}> {
    input?: HTMLInputElement | null;
    constructor(props: NumberInputProps);
    componentWillReceiveProps(nextProps: any): void;
    formatInput(props: any): any;
    focus(): void | undefined;
    handleKeyDown: (ev: any) => any;
    handleBlur: () => void;
    getNumericValue: () => number | null;
    isValid(): boolean;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
export interface CollapsibleSectionProps {
    initiallyOpen?: boolean;
    /** Label to display */
    label: ReactNode;
    /** True to mute label */
    labelMuted?: boolean;
    /** Hint to append to label. Makes label faded if only hint presented */
    hint?: ReactNode;
}
/** Indented section than can be opened and closed. Defaults closed */
export declare class CollapsibleSection extends React.Component<CollapsibleSectionProps, {
    open: boolean;
}> {
    constructor(props: CollapsibleSectionProps);
    handleToggle: () => void;
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
export declare class NavPills extends React.Component<{
    pills: {
        id: string;
        label: ReactNode;
        href?: string;
    }[];
    activePill?: string;
    onPillClick?: (id: string) => void;
}> {
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
/** Button toggle component */
export declare class Toggle<T> extends React.Component<{
    value: T | null;
    onChange?: (value: T | null) => void;
    options: Array<{
        value: T | null;
        label: ReactNode;
    }>;
    /** xs is deprecated */
    size?: "xs" | "sm" | "lg";
    allowReset?: boolean;
}> {
    renderOption: (option: any, index: any) => React.DOMElement<React.DOMAttributes<Element>, Element>;
    render(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}
/** Panel that can be opened and closed */
export declare function CollapsiblePanel(props: {
    title: ReactNode;
    hint?: ReactNode;
    children: any;
    initiallyClosed?: boolean;
}): JSX.Element;
