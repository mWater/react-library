React = require 'react'
DragDropContext = require('react-dnd').DragDropContext

module.exports = (backend) ->
  (component) ->
    class NestableDragDropContextContainer extends React.Component
      @contextTypes:
        dragDropManager: React.PropTypes.object

      render: ->
        if @context.dragDropManager
          return React.createElement(component, @props)
        else
          return React.createElement(DragDropContext(backend)(component), @props)



