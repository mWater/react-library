var H, React, ReactDOM, SampleComponent, elem;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

SampleComponent = require('./SampleComponent');

elem = React.createElement(SampleComponent);

ReactDOM.render(elem, document.getElementById("main"));
