// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let CrossComponent;
import PropTypes from 'prop-types';
import React from 'react';
const R = React.createElement;

// Displays a box with a cross in it with any segments optionally drawn
export default CrossComponent = (function() {
  CrossComponent = class CrossComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        n: PropTypes.string, // north border style (e.g. "solid 1px blue")
        e: PropTypes.string, // east border style (e.g. "solid 1px blue")
        s: PropTypes.string, // south border style (e.g. "solid 1px blue")
        w: PropTypes.string, // west border style (e.g. "solid 1px blue")
        width: PropTypes.any,  // 100% or 20, etc. Default: 100%
        height: PropTypes.any, // 100% or 20, etc. Default: 100%
        collapseTop: PropTypes.bool   // True to collapse top half of box
      };
  
      this.defaultProps = {
        width: "100%",
        height: "100%"
      };
    }

    // Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)
    render() {
      // Make horizontal two boxes
      return R('div', {className: "flexBox", style: { display: "flex", flexDirection: "column", width: this.props.width, height: this.props.height }},
        R('div', {className: "flexBox", style: { display: "flex", flex: (this.props.collapseTop ? "0 1 0px" : "1 1 0px") }},
          R('div', {className: "flexBox", style: { flex: "1 1 0px", borderRight: this.props.n, borderBottom: this.props.w }}),
          R('div', {className: "flexBox", style: { flex: "1 1 0px", borderBottom: this.props.e }})),
        R('div', {className: "flexBox", style: { display: "flex", flex: "1 1 0px" }},
          R('div', {className: "flexBox", style: { flex: "1 1 0px", borderRight: this.props.s }}),
          R('div', {className: "flexBox", style: { flex: "1 1 0px" }})));
    }
  };
  CrossComponent.initClass();
  return CrossComponent;
})();
