/*
The MIT License (MIT)

Copyright (c) 2014 Nicholas Rakoto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


https://github.com/nrako/react-component-resizable
ES6 compiled

*/

'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropTypes = require('prop-types')

var React = global.React || require('react');
var objectAssign = require('object-assign');

var Resizable = React.createClass({
  displayName: 'Resizable',


  lastDimensions: {
    width: null,
    height: null
  },

  propTypes: {
    triggersClass: PropTypes.string,
    expandClass: PropTypes.string,
    contractClass: PropTypes.string,
    embedCss: PropTypes.bool,
    onResize: PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      triggersClass: 'resize-triggers',
      expandClass: 'expand-trigger',
      contractClass: 'contract-trigger',
      embedCss: true
    };
  },

  requestFrame: function requestFrame(fn) {
    return (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
      return window.setTimeout(fn, 20);
    })(fn);
  },

  cancelFrame: function cancelFrame(id) {
    return (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id);
  },

  componentDidMount: function componentDidMount() {
    this.resetTriggers();
    this.initialResetTriggersTimeout = setTimeout(this.resetTriggers, 1000);
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.initialResetTriggersTimeout);
  },

  componentDidUpdate: function componentDidUpdate() {
    this.resetTriggers();
  },

  resetTriggers: function resetTriggers() {
    var contract = this.contract;
    var expandChild = this.expandChild;
    var expand = this.expand;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  },

  onScroll: function onScroll() {
    if (this.r) this.cancelFrame(this.r);
    this.r = this.requestFrame(function () {
      var dimensions = this.getDimensions();

      // Ref is gone, just ignore
      if (!dimensions) {
        return;
      }

      if (this.haveDimensionsChanged(dimensions)) {
        this.lastDimensions = dimensions;
        this.props.onResize(dimensions);
      }
    }.bind(this));
  },

  getDimensions: function getDimensions() {
    var el = this.resizable;
    if (!el) {
      return null;
    }

    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  },

  haveDimensionsChanged: function haveDimensionsChanged(dimensions) {
    return dimensions.width != this.lastDimensions.width || dimensions.height != this.lastDimensions.height;
  },

  render: function render() {
    var _props = this.props;
    var triggersClass = _props.triggersClass;
    var expandClass = _props.expandClass;
    var contractClass = _props.contractClass;
    var embedCss = _props.embedCss;
    var onResize = _props.onResize;

    var rest = _objectWithoutProperties(_props, ['triggersClass', 'expandClass', 'contractClass', 'embedCss', 'onResize']);

    var props = objectAssign({}, rest, { onScroll: this.onScroll, ref: ((c) => this.resizable = c) });
    return React.createElement('div', props, [this.props.children, React.createElement('div', { className: triggersClass, key: 'trigger' }, [React.createElement('div', { className: expandClass, ref: ((c) => this.expand = c), key: 'expand' }, React.createElement('div', { ref: ((c) => this.expandChild = c) })), React.createElement('div', { className: contractClass, ref: ((c) => this.contract = c), key: 'contract' })]), embedCss ? React.createElement('style', { key: 'embededCss', dangerouslySetInnerHTML: { __html: '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }' } }) : null]);
  }

});

module.exports = Resizable;
global.Resizable = Resizable;