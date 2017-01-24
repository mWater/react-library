_ = require 'lodash'
React = require 'react'
uuid = require 'node-uuid'
H = React.DOM
R = React.createElement
DragDropContext = require('react-dnd').DragDropContext
HTML5Backend = require('react-dnd-html5-backend')
NestedReorderableListItemComponent = require "./NestedReorderableListItemComponent"
NestableDragDropContext = require "../NestableDragDropContext"

NestedHelper = (WrappedComponent) ->
  return class NestedReorderableHelper extends React.Component
    constructor: (props) ->
      super(props)
      @state = {
        items: props.items
        lastOperation: null
      }
      
    componentWillReceiveProps: (nextProps) ->
      newOrder = _.map nextProps.items, (item) => @props.getItemId(item)
      oldOrder = _.map @state.items, (item) => @props.getItemId(item)

      # If order changed, reset order
      if not _.isEqual(newOrder, oldOrder)
        @setState(items: nextProps.items)
        
      
    findItemById: (listId, itemId) =>
      value = _.cloneDeep @props.items
      list = _.find value, { id: itemId }
      
      if list # check in the root array first
        return list
        
      found = null
      doFind = (items) =>  
        for item in items
          if item.id == listId
            return _.find item.children, { id: itemId }
          else 
            if item.children?
              found = doFind(item.children)
              if found 
                return found
      
      # if not root then only iterate through section type properties
      return doFind(value)
      
    handleIndent: (sourceList, sourceId) =>
      value = _.cloneDeep @props.items
      cutIndex = _.findIndex value, { id: sourceId }
      
      draggedItem = @findItemById(sourceList, sourceId)
      
      changed = false
      if cutIndex > 0
        _.pullAt value, cutIndex
        sibling = value[cutIndex - 1]
        sibling.children.push(draggedItem)
        
      else 
        cut = (listId, itemId, items) => 
          for item in items
            if item.id == listId
              cutIndex = _.findIndex item.children, { id: sourceId }
              if cutIndex > 0
                _.pullAt item.children, cutIndex
              
                sibling = item.children[cutIndex - 1]
                sibling.children.push(draggedItem)
            else 
              cut(listId, itemId, item.children)
        cut(sourceList, sourceId, value)
      
      # if changed
      @setState(items: value)
    
    handlePut: (sourceList, targetList, sourceId, targetId, before = true) => 
      operation = {
        sourceList: sourceList
        targetList: targetList
        sourceId: sourceId
        targetId: targetId
        before: before
      }
      
      if _.isEqual @state.lastOperation, operation
        return
      
      value = _.cloneDeep @props.items
      
      cutIndex = _.findIndex value, { id: sourceId }
      pasteIndex = _.findIndex value, { id: targetId }
      
      # If dragging and dropping in same list, ignore if both items are siblings
      if sourceList == targetList 
        if before and pasteIndex - cutIndex == 1
          return
        if not before and cutIndex - pasteIndex == 1
          return  
        
      # Actually performing drop replace now
      console.log "handlePut :: ", sourceList, targetList ,sourceId, targetId, before
      draggedItem = @findItemById(sourceList, sourceId)
      
      if cutIndex > -1
        _.pullAt value, cutIndex
      else 
        cut = (listId, itemId, items) => 
          for item in items
            if item.id == listId
              cutIndex = _.findIndex item.children, { id: sourceId }
              _.pullAt item.children, cutIndex
            else 
              cut(listId, itemId, item.children)
        cut(sourceList, sourceId, value)
      
      # re-calculate as an item was removed
      pasteIndex = _.findIndex value, { id: targetId }
      if pasteIndex > -1
        if not before
          pasteIndex = pasteIndex + 1
        value.splice(pasteIndex, 0, draggedItem)
      else
        paste = (listId, itemId, items) =>
          for item in items
            if item.id == listId
              # target Item Id can be null if dropping into empty children listId
              if not targetId
                item.children.push(draggedItem)
              else 
                pasteIndex = _.findIndex item.children, { id: targetId }
                if not before
                  pasteIndex = pasteIndex + 1
                  
                item.children.splice(pasteIndex, 0, draggedItem)
            else 
              paste(listId, itemId, item.children)
        paste(targetList, targetId, value)
      
      
      @setState(items: value, lastOperation: operation)
      
    handleEndDrag: =>
      @props.onReorder(@state.items)
      
    # Put beforeId right before id  
    handlePutBefore: (sourceList, targetList, id, beforeId) =>
      @handlePut(sourceList, targetList, id, beforeId)
      

    # Put afterId right after id
    handlePutAfter: (sourceList, targetList, id, afterId) =>
      @handlePut(sourceList, targetList, id, afterId, false)
    
    render: ->
      newProps = 
        items: @state.items
        handlePutBefore: @handlePutBefore
        handlePutAfter: @handlePutAfter
        handleEndDrag: @handleEndDrag
        handleIndent: @handleIndent
        listId: if @props.listId then @props.listId else uuid.v4()
      R WrappedComponent, _.assign({}, @props, newProps)

# Reorderable component for nested items
# Currently supports reordering within the same list
class NestedReorderableListComponent extends React.Component
  @propTypes:
    items: React.PropTypes.array.isRequired # items to be reordered
    # onReorder: React.PropTypes.func.isRequired # callback function, called when an item is dropped, gets passed the reordered item list
    # function which renders the item, gets passed the current item, react dnd connectors and the child node
    # signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget, children)
    renderItem: React.PropTypes.func.isRequired
    listId: React.PropTypes.string # a uniqid for the list
    getItemId: React.PropTypes.func.isRequired # function which should return the identifier of the current item, gets passed the current item
    element: React.PropTypes.object # the element to render this component as
    handlePutAfter: React.PropTypes.func #supplied by the helper
    handlePutBefore: React.PropTypes.func #supplied by the helper
    handleEndDrag: React.PropTypes.func #supplied by the helper
    handleIndent: React.PropTypes.func #supplied by the helper

  @defaultProps:
    element: H.div null

  render: ->
    React.cloneElement(
      @props.element
      null
      _.map @props.items, (item, index) =>
        children = null
        if item.children
          children = R NestedReorderableListComponent,
            items: item.children or []
            renderItem: @props.renderItem
            listId: @props.getItemId(item)
            getItemId: @props.getItemId
            handlePutAfter: @props.handlePutAfter
            handlePutBefore: @props.handlePutBefore
            handleEndDrag: @props.handleEndDrag
            handleIndent: @props.handleIndent
            element: @props.element
          
        R NestedReorderableListItemComponent, 
          key: @props.getItemId(item)
          item: item
          index: index
          renderItem: @props.renderItem
          getItemId: @props.getItemId
          onPutAfter: @props.handlePutAfter
          onPutBefore: @props.handlePutBefore
          onEndDrag: @props.handleEndDrag
          listId: @props.listId
          children: children
          onIndent: @props.handleIndent
    )

module.exports = NestedHelper(NestableDragDropContext(HTML5Backend)(NestedReorderableListComponent))
