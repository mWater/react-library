var H, React, ReactDOM, SampleComponent;

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

SampleComponent = require('./SampleComponent');

$(function() {
  var elem;
  elem = H.div(null, React.createElement(SampleComponent), H.br());
  return ReactDOM.render(elem, document.getElementById("main"));
});
