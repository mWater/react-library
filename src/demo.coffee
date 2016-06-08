React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement
_ = require 'lodash'
uuid = require 'node-uuid'

SampleComponent = require './SampleComponent'
ModalPopupComponent = require './ModalPopupComponent'
ModalWindowComponent = require './ModalWindowComponent'
VerticalTreeLayoutComponent = require './VerticalTreeLayoutComponent'
ReorderableListComponent = require "./reorderable/ReorderableListComponent"

class Block extends React.Component
  render: ->
    H.div style: { height: 200, width: 200, border: "solid 2px blue" }, " "

class Block2 extends React.Component
  render: ->
    H.div style: { height: 300, width: 200, border: "solid 2px blue" }, " "

class ModalSample extends React.Component
  constructor: ->
    super
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

    H.div null,
      # H.a onClick: @startEditing,
      #   "Edit me"
      R ModalWindowComponent, { isOpen: true },
        H.div null,
          _.map(_.range(1, 100), (x) -> H.div null, "#{x}")
      # if @state.editing 
      #   R ModalWindowComponent, { isOpen: true, onRequestClose: @handleModalClose },
      #     R ModalSample

class SortableSampleItem extends React.Component
  render: ->
    id = uuid.v4()
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
    H.div {style: itemStyle},
      @props.connectDragSource(H.span {style: handleStyle})
      H.span null,
        @props.item.id
      R ReorderableListComponent, {items: @props.item.children, onReorder: @props.updateOrder, getItemId: @props.getItemId, renderItem: @props.renderItem}

class SortableSample extends React.Component
  constructor: ->
    super
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

  renderItem: (item, index, connectDragSource ) =>
    H.div null,
      R SortableSampleItem, {item: item, index: index, connectDragSource:connectDragSource, updateOrder: @updateOrder, renderItem: @renderItem, getItemId: @getItemId}

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
    id = uuid.v4()
    items.push({
      id: id,
      children: [],
      parent: null
    })
    @setState(items: items)

  render: ->
    id = uuid.v4()
    style=
      padding: 10
    H.div {style: style},
      H.button onClick: @addNewItem,
        "Add new item"
      R ReorderableListComponent, {items: @state.items, onReorder: @updateOrder, renderItem: @renderItem, getItemId: @getItemId}
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
  
  # ModalPopupComponent.show((onClose) =>
  #   return React.createElement(ModalPopupComponent, {
  #     footer: H.button(type: "button", className: "btn btn-default", onClick: onClose, "TEST")
  #     }, "TEST")
  #   )
  # elem = H.div null,
  #    React.createElement(SampleComponent)
  #    H.br()



#  elem = R ModalPopupComponent, { header: "OUTER", size: "large", trigger: H.button(null, "Open Modal") },
#    R ModalPopupComponent, { header: "INNER", trigger: H.a(null, "Open Modal") },
#      R ModalPopupComponent, { header: "INNER-1" , size: "small", trigger: H.button(null, "Open Modal")},
#        R ModalPopupComponent, { header: "INNER-2", size: "large", trigger: H.a(null, "Open Modal") },
#          "The last modal"

  elem = R SortableSample


  ReactDOM.render(elem, document.getElementById("main"))
