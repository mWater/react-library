// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let LoadingComponent;
import PropTypes from 'prop-types';
import React from 'react';
const R = React.createElement;

// Displays a spinner with loading in the center
export default LoadingComponent = (function() {
  LoadingComponent = class LoadingComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        width: PropTypes.any, // Defaults to 100%
        height: PropTypes.any, // Defaults to 100%
        label: PropTypes.node // Defaults to Loading...
      };
  
      this.defaultProps = {
        width: "100%",
        height: "100%",
        label: R('div', {className: "text-muted", style: { fontSize: 30 }},
          R('i', {className: "fa fa-spin fa-spinner"}),
          " Loading...")
      };
    }

    render() {
      return R('div', { style: { 
        width: this.props.width,
        height: this.props.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    },
        this.props.label);
    }
  };
  LoadingComponent.initClass();
  return LoadingComponent;
})();
