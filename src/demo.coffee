React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement
_ = require 'lodash'

SampleComponent = require './SampleComponent'
ModalPopupComponent = require './ModalPopupComponent'
ModalWindowComponent = require './ModalWindowComponent'
VerticalTreeLayoutComponent = require './VerticalTreeLayoutComponent'
SortableContainer = require "./sortable/SortableContainer"

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
    itemStyle =
      border: "1px solid #aeaeae"
      padding: "8px"
      cursor: "move"
    H.div {style: itemStyle},
      @props.item.id

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
            children: []
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

  renderItem: (item, index ) =>
    if item.children.length > 0
      style=
        padding: 10
        paddingLeft: 20
      H.div {style: style},
        R SortableContainer, {items: item.children, updateOrder: @updateOrder, renderItem: @renderItem, parentIndex: index, constrainTo: item.id}
#        R SortableSampleItemGroup, { items: item.children, index: index }
    else
      H.div null,
        R SortableSampleItem, {item: item, index: index}

  updateOrder: (dragItemIndex, hoverItemIndex, dragArrayIndex, hoverArrayIndex) =>
    items = @state.items.splice(0)

    sourceArray = if dragArrayIndex == null then items else items[dragArrayIndex].children
    targetArray = if hoverArrayIndex == null then items else items[hoverArrayIndex].children

    draggedItem = sourceArray[dragItemIndex]

    sourceArray.splice(dragItemIndex, 1);
    targetArray.splice(hoverItemIndex, 0, draggedItem);

    @setState(items: items)


  render: ->
    style=
      padding: 10
    H.div {style: style},
      R SortableContainer, {items: @state.items, updateOrder: @updateOrder, renderItem: @renderItem, parentIndex: null, constrainTo: ""}
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
