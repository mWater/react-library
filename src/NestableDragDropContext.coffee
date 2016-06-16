React = require 'react'
DragDropContext = require('react-dnd').DragDropContext


# Wrapped DragDropContext for nested React DnD as it does not allow multiple backend initialised
# use it as you would use DragDropContext normally 
# NestableDragDropContext = require './NestableDragDropContext'
# module.exports = NestableDragDropContext(HTML5Backend)(component)
module.exports = (backend) ->
  (component) ->
    contextClass = DragDropContext(backend)(component)

    class NestableDragDropContextContainer extends React.Component
      @contextTypes:
        dragDropManager: React.PropTypes.object

      render: ->
        if @context.dragDropManager
          return React.createElement(component, @props)
        else
          return React.createElement(contextClass, @props)



