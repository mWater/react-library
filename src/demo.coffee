React = require 'react'
ReactDOM = require 'react-dom'
R = React.createElement
_ = require 'lodash'
uuid = require 'uuid'

SampleComponent = require './SampleComponent'
ModalPopupComponent = require './ModalPopupComponent'
ModalWindowComponent = require './ModalWindowComponent'
VerticalTreeLayoutComponent = require './VerticalTreeLayoutComponent'
ReorderableListComponent = require "./reorderable/ReorderableListComponent"
ReorderableListItemComponent = require "./reorderable/ReorderableListItemComponent"
PopoverHelpComponent = require './PopoverHelpComponent'
PopupHelpComponent = require('./PopupHelpComponent').default
FillDownwardComponent = require './FillDownwardComponent'
AutoSizeComponent = require './AutoSizeComponent'
ui = require './bootstrap'
ReactElementPrinter = require './ReactElementPrinter'
GridComponentDemo = require('./GridComponentDemo').GridComponentDemo

HTML5Backend = require('react-dnd-html5-backend').default
DragDropContext = require("react-dnd").DragDropContext

class PopoverHelpSample extends React.Component
  render: ->
    R PopoverHelpComponent, null,
      "This is a test"

class Block extends React.Component
  render: ->
    R 'div', style: { height: 200, width: 200, border: "solid 2px blue" }, " "

class Block2 extends React.Component
  render: ->
    R 'div', style: { height: 300, width: 200, border: "solid 2px blue" }, " "


class ReactElementPrinterSample extends React.Component
  handlePrint: =>
    printer = new ReactElementPrinter()
    elem = R 'h1', null, "Print this!"
    printer.print(elem, {})

  render: ->
    R 'div', null,
      R 'button', type: "button", onClick: @handlePrint, "Print"
      "DO NOT PRINT THIS"

class ModalWindowSample extends React.Component
  constructor: (props) ->
    super(props)
    @state = {
      editing: false
    }

  startEditing:=>
    @setState(editing: true)

  finishEditing:=>
    @setState(editing: false)

  handleModalClose: =>
    @finishEditing()
    console.log "editing finished"

  render: ->
    sizes = ["large", "small", ""]

    R 'div', null,
      R 'a', onClick: @startEditing,
        "Edit me"
      if @state.editing
        R ModalWindowComponent, { isOpen: @state.editing, onRequestClose: @finishEditing },
          R 'div', null,
            _.map(_.range(1, 100), (x) -> R 'div', null, "#{x}")

class ModalPopupSample extends React.Component
  constructor: (props) ->
    super(props)
    @state = {
      editing: false
    }

  startEditing:=>
    @setState(editing: true)

  finishEditing:=>
    @setState(editing: false)

  handleModalClose: =>
    @finishEditing()
    console.log "editing finished"

  render: ->
    R 'div', null,
      R 'a', onClick: @startEditing,
        "Edit me"
      if @state.editing
        R ModalPopupComponent, onClose: @handleModalClose, showCloseX: true, width: 350,
          R 'div', null,
            _.map(_.range(1, 100), (x) -> R 'div', null, "#{x}")

class SortableSampleItem extends React.Component
  constructor: (props) ->
    super(props)
    @state = {
      value: Math.floor(Math.random() * 1000) + "!"
    }

  render: ->
    id = uuid()
    itemStyle =
      border: "1px solid #aeaeae"
      padding: "8px"

    handleStyle =
      height: 10
      width: 10
      background: "green"
      marginRight: 10
      display: "inline-block"
      cursor: "move"

    @props.connectDragPreview(@props.connectDropTarget(R 'tr', null,
      R 'td', {style: itemStyle},
        @props.connectDragSource(R 'span', {style: handleStyle})
        R 'span', null,
          @props.item.id
          @state.value
        R 'div', null,
          R 'table', null,
            R ReorderableListComponent, {
              items: @props.item.children
              onReorder: @props.updateOrder
              getItemId: @props.getItemId
              renderItem: @props.renderItem
              element: R 'tbody', style: { background: 'red'}
            }
      )
    )

class SortableSample extends React.Component
  constructor: (props) ->
    super(props)
    @state =
      items: [
        id: "red"
        children: []
        parent: null
      ,
        id: "green"
        parent: null
        children:
          [
            id: "leaves"
            children: []
            parent: "green"
          ,
            id: "plants"
            children: []
            parent: "green"
          ,
            id: "hulk"
            children:
              [
                id: "hulk-blue"
                children:
                  [
                    id: "hulk-blue-white"
                    children: []
                    parent: "hulk-blue"
                  ,
                    id: "hulk-blue-black"
                    children: []
                    parent: "hulk-blue"
                  ]
                parent: "hulk"
              ,
                id: "hulk-white"
                children: []
                parent: "hulk"
              ]
            parent: "green"
          ]
      ,
        id: "blue"
        children: []
        parent: null
      ,
        id: "white"
        children: []
        parent: null
      ,
        id: "black"
        children: []
        parent: null
      ]

  renderItem: (item, index, connectDragSource, connectDragPreview, connectDropTarget ) =>
    R SortableSampleItem, {
      item: item
      index: index
      connectDragSource: connectDragSource
      connectDragPreview: connectDragPreview
      connectDropTarget: connectDropTarget
      updateOrder: @updateOrder
      renderItem: @renderItem
      getItemId: @getItemId
    }

  updateOrder: (reorderedList) =>
    item = reorderedList[0]

    if item.parent == null
      @setState(items: reorderedList)
    else
      items = @state.items.splice(0)
      node = @findNodeById(items, item.parent)
      node.children = reorderedList
      @setState(items: items)

  findNodeById: (items, id) ->
    for value, index in items
      if value.id == id
        return value

      if value.children and value.children.length
        result = @findNodeById(value.children, id)
        if result
          return result
    return false

  getItemId: (item) ->
    item.id

  addNewItem: =>
    items = @state.items.splice(0)
    id = uuid()
    items.push({
      id: id,
      children: [],
      parent: null
    })
    @setState(items: items)

  render: ->
    id = uuid()
    style=
      padding: 10
    R 'div', {style: style},
      R 'button', onClick: @addNewItem,
        "Add new item"
      R 'table', null,
        R 'thead', null,
          R 'tr', null,
            R 'th', null, "Item Name"

        #R 'tbody', null,
        R ReorderableListComponent, {
          items: @state.items
          onReorder: @updateOrder
          renderItem: @renderItem
          getItemId: @getItemId
          element: R 'tbody', style: { background: '#afafaf'}
        }


class BlocksComponent extends React.Component
  constructor: (props) ->
    super(props)
    @state = {
      items: [
        { id: "1", type: "title" }
        { id: "2", type: "image" }
        { id: "3", type: "text" }
      ]
    }

  renderItem: (item, index, connectDragSource, connectDragPreview, connectDropTarget) ->
    wrapBorder = (e, inline=false) ->
      return R 'div', style: { 
          margin: 5
          border: "solid 1px #DDD"
          borderRadius: 5
          padding: 5
          position: "relative"
          display: if inline then "inline-block"
        }, 
        connectDragSource(R 'div', style: { position: "absolute", left: "50%", top: -8, border: "solid 1px #DDF", backgroundColor: "white" },
          R 'span', className: "glyphicon glyphicon-move"
        )
        e
    

    switch item.type
      when "title"
        elem = R 'h2', null, "Title"
        elem = wrapBorder(elem)
      when "image"
        elem = R 'img', 
          src: "http://image.shutterstock.com/display_pic_with_logo/359716/161613653/stock-photo-orange-fruit-isolated-on-white-161613653.jpg"
          style: {
            width: "33%"
            className: "img-thumbnail"
            border: "solid 1px #DDD"
            float: "right"
          }
      when "text"
        elem = R 'div', null, '''
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        '''
        elem = wrapBorder(elem)



    return connectDragPreview(connectDropTarget(elem))

  render: ->
    R 'div', null,
      "Start"
      R ReorderableListComponent, {
        items: @state.items
        onReorder: (items) => @setState(items: items)
        renderItem: @renderItem
        getItemId: (item) -> item.id
      }
      "End"

class AutoSizeTestComponent extends React.Component
  render: ->
    R AutoSizeComponent, injectHeight: true,
      (size) =>
        R 'div', style: { height: size.height + 1, backgroundColor: "#FDF" }, JSON.stringify(size)

class ToggleTestComponent extends React.Component
  constructor: (props) ->
    super(props)
    @state = {
      action: 'keep'
    }
  render: ->
    R ui.Toggle,
      value: @state.action
      options: [{value: 'keep', label: 'Keep'}, {value: 'merge', label: 'Merge'}, {value: 'nd', label: 'Not duplicate'}, {value: 'ignore', label: 'Ignore'}]
      onChange: ((action) => 
        console.log action
        @setState(action: action)
      )
      size: 'xs'
      # allowReset: true

class ReorderDemo extends React.Component 
  constructor: (props) ->
    super(props)
    @state = {
      items: ["red", "green", "blue"]
    }

  render: -> 
    R ReorderableListComponent,
      items: @state.items
      onReorder: (items) => @setState(items: items)
      # function which renders the item, gets passed the current item and react dnd connectors
      # signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
      renderItem: (item, index, connectDragSource, connectDragPreview, connectDropTarget) =>
        return connectDragSource(connectDragPreview(connectDropTarget(R("div", null, item))))
      getItemId: (item) => item

ReorderDemoWrapped = DragDropContext(HTML5Backend)(ReorderDemo)

# Wait for DOM to load
$ ->
  # elem = R VerticalTreeLayoutComponent,
  #   line: "solid 1px red"
  #   height: 50
  #   headElem: R(Block)
  #   R(Block)
  #   R(Block2)
  #   R(Block)
  #   R(Block)
  
  # showModal = (n) ->
  #   ModalPopupComponent.show((onClose) =>
  #     return R ModalPopupComponent, 
  #       showCloseX: true
  #       onClose: onClose
  #       size: "large"
  #       footer: R('button', type: "button", className: "btn btn-default", onClick: onClose, "TEST")
  #       header: "This is a test modal", 
  #         _.map(_.range(1, n), (x) -> R 'div', null, "#{x}")
  #         R 'button', type: "button", onClick: (-> showModal(10)), "SHOW"
  #     )

  # elem = R 'div', style: { paddingLeft: 30 },
  #   _.map(_.range(1, 100), (x) -> R 'div', null, "#{x}")
  #   R 'button', type: "button", onClick: (-> showModal(100)), "SHOW"

  # elem = R 'div', null,
  #   R 'div', style: { height: 300, backgroundColor: "red" }
  #   R FillDownwardComponent, null,
  #     R 'div', style: { height: "100%", backgroundColor: "green" }

  # elem = R AutoSizeTestComponent

  # elem = R ToggleTestComponent

  # elem = R ui.NumberInput,
  #     onChange: console.log
  #     min: 0
  #     max: 100
  #     decimal: false 

  # elem = R PopupHelpComponent, null,
  #   "This is a test!" 
  
  # elem = R ReactElementPrinterSample, null
  elem = R ModalPopupSample, null

  # elem = R 'div', null,
  #    React.createElement(SampleComponent)
  #    R('br')

  # elem = R 'div', style: { padding: 20, textAlign: "right" },
  #   "Lorem ipsum est"
  #   React.createElement(PopoverHelpSample)
  #   R('br')

  # ModalPopupComponent.show((onClose) =>
  #   return React.createElement(ModalPopupComponent, {
  #     showCloseX: true
  #     }, _.map(_.range(1, 10), (x) -> R 'div', null, "#{x}"))
  #   )

  ReactDOM.render(elem, document.getElementById("main"))



#  elem = R ModalPopupComponent, { header: "OUTER", size: "large", trigger: R('button', null, "Open Modal") },
#    R ModalPopupComponent, { header: "INNER", trigger: R('a', null, "Open Modal") },
#      R ModalPopupComponent, { header: "INNER-1" , size: "small", trigger: R('button', null, "Open Modal")},
#        R ModalPopupComponent, { header: "INNER-2", size: "large", trigger: R('a', null, "Open Modal") },
#          "The last modal"

#  elem = R ModalSample


