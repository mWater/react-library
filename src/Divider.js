let Divider;
import PropTypes from 'prop-types';

//
// Divider
// 
// Internally used by SplitPane to create the draggable divider between 2 panes
//
// Vertical splitpane divider gets the classes "divider vertical"
// Horizontal splitpane divider gets the classes "divider horizontal"


import React from 'react';

const R = React.createElement;

export default Divider = (function() {
  Divider = class Divider extends React.Component {
    constructor(...args) {
      super(...args);
      this.onMouseDown = this.onMouseDown.bind(this);
    }

    static initClass() {
    
      this.propTypes = {
        split: PropTypes.oneOf(['vertical', 'horizontal'])
      };
    }

    static defaultProps() {
      return {split: 'vertical'};
    }

    onMouseDown(event) { 
      return this.props.onMouseDown(event);
    }

    render() {
      const classNames = ["divider"];

      if (this.props.split === "vertical") {
        classNames.push("vertical");
      }
      if (this.props.split === "horizontal") {
        classNames.push("horizontal");
      }
      
      return R('div', {className: classNames.join(" "), onMouseDown: this.onMouseDown});
    }
  };
  Divider.initClass();
  return Divider;
})();