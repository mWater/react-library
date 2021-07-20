import PropTypes from "prop-types";
import React from "react";
export default class Divider extends React.Component {
    static propTypes: {
        split: PropTypes.Requireable<string>;
    };
    static defaultProps(): {
        split: string;
    };
    onMouseDown: (event: any) => any;
    render(): React.DetailedReactHTMLElement<{
        className: string;
        onMouseDown: (event: any) => any;
    }, HTMLElement>;
}
