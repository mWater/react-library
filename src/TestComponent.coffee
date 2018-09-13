React = require('react')
ReactDOM = require('react-dom')
ReactTestUtils = require('react-addons-test-utils')
R = React.createElement
_ = require 'lodash'

# Test component that can be created, have its element changed, have clicks and other actions simulated
# Used for unit testing React components
module.exports = class TestComponent
  constructor: (elem) ->
    @div = document.createElement('div')
    @comp = ReactDOM.render(elem, @div)

  setElement: (elem) ->
    ReactDOM.render(elem, @div)

  getComponent: ->
    return @comp

  destroy: ->
    ReactDOM.unmountComponentAtNode(@div)

  # Finds DOM node by pattern (optional)
  findDOMNodesByText: (pattern) ->
    matches = []

    findRecursively = (node) ->
      # Recurse to children
      if node.nodeType == 1
        for subnode in node.childNodes
          # Check text match
          if subnode.nodeType == 3 and subnode.nodeValue.match(pattern)
            matches.push(node)

          findRecursively(subnode)

    findRecursively(ReactDOM.findDOMNode(@comp))
    return matches

  # Finds a DOM node by pattern
  findDOMNodeByText: (pattern) ->
    return @findDOMNodesByText(pattern)[0]

  # Find a subcomponent by a pattern (deprecated)
  findComponentByText: (pattern) -> return @findDOMNodesByText(pattern)

  # Find input field
  findInput: ->
    return ReactTestUtils.findRenderedDOMComponentWithTag(@comp, "input")

  findComponentById: (id) ->
    return ReactTestUtils.findAllInRenderedTree(@comp, (c) ->
      c.id == id
    )[0]

  @click: (comp) -> ReactTestUtils.Simulate.click(comp)
  @pressEnter: (comp) -> ReactTestUtils.Simulate.keyDown(comp, {key: "Enter", keyCode: 13, which: 13})
  @pressTab: (comp) -> ReactTestUtils.Simulate.keyDown(comp, {key: "Tab", keyCode: 9, which: 9})
  @changeValue: (comp, value) -> 
    comp.value = value
    ReactTestUtils.Simulate.change(comp)
