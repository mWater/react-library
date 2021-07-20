// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import React from 'react';
import ReactDOM from 'react-dom';
const R = React.createElement;
import _ from 'lodash';
import uuid from 'uuid';
import SampleComponent from './SampleComponent';
import ModalPopupComponent from './ModalPopupComponent';
import ModalWindowComponent from './ModalWindowComponent';
import VerticalTreeLayoutComponent from './VerticalTreeLayoutComponent';
import ReorderableListComponent from "./reorderable/ReorderableListComponent";
import ReorderableListItemComponent from "./reorderable/ReorderableListItemComponent";
import PopoverHelpComponent from './PopoverHelpComponent';
import { default as PopupHelpComponent } from './PopupHelpComponent';
import FillDownwardComponent from './FillDownwardComponent';
import AutoSizeComponent from './AutoSizeComponent';
import * as ui from './bootstrap';
import ReactElementPrinter from './ReactElementPrinter';
import { GridComponentDemo } from './GridComponentDemo';
import { GanttChartDemo } from './GanttChartDemo';
import { default as HTML5Backend } from 'react-dnd-html5-backend';
import { DragDropContext } from "react-dnd";

class PopoverHelpSample extends React.Component {
  render() {
    return R(PopoverHelpComponent, null,
      "This is a test");
  }
}

class Block extends React.Component {
  render() {
    return R('div', {style: { height: 200, width: 200, border: "solid 2px blue" }}, " ");
  }
}

class Block2 extends React.Component {
  render() {
    return R('div', {style: { height: 300, width: 200, border: "solid 2px blue" }}, " ");
  }
}


class ReactElementPrinterSample extends React.Component {
  handlePrint = () => {
    const printer = new ReactElementPrinter();
    const elem = R('h1', null, "Print this!");
    return printer.print(elem, {});
  };

  render() {
    return R('div', null,
      R('button', {type: "button", onClick: this.handlePrint}, "Print"),
      "DO NOT PRINT THIS");
  }
}

class ModalWindowSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  startEditing = () => {
    return this.setState({editing: true});
  };

  finishEditing = () => {
    return this.setState({editing: false});
  };

  handleModalClose = () => {
    this.finishEditing();
    return console.log("editing finished");
  };

  render() {
    const sizes = ["large", "small", ""];

    return R('div', null,
      R('a', {onClick: this.startEditing},
        "Edit me"),
      this.state.editing ?
        R(ModalWindowComponent, { isOpen: this.state.editing, onRequestClose: this.finishEditing },
          R('div', null,
            _.map(_.range(1, 100), x => R('div', null, `${x}`)))
        ) : undefined
    );
  }
}

class ModalPopupSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  startEditing = () => {
    return this.setState({editing: true});
  };

  finishEditing = () => {
    return this.setState({editing: false});
  };

  handleModalClose = () => {
    this.finishEditing();
    return console.log("editing finished");
  };

  render() {
    return R('div', null,
      R('a', {onClick: this.startEditing},
        "Edit me"),
      this.state.editing ?
        R(ModalPopupComponent, {onClose: this.handleModalClose, showCloseX: true, width: 350},
          R('div', null,
            _.map(_.range(1, 100), x => R('div', null, `${x}`)))
        ) : undefined
    );
  }
}

class SortableSampleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Math.floor(Math.random() * 1000) + "!"
    };
  }

  render() {
    const id = uuid();
    const itemStyle = {
      border: "1px solid #aeaeae",
      padding: "8px"
    };

    const handleStyle = {
      height: 10,
      width: 10,
      background: "green",
      marginRight: 10,
      display: "inline-block",
      cursor: "move"
    };

    return this.props.connectDragPreview(
      this.props.connectDropTarget(R('tr', null,
        R('td', {style: itemStyle},
          this.props.connectDragSource(R('span', {style: handleStyle})),
          R('span', null,
            this.props.item.id,
            this.state.value),
          R('div', null,
            R('table', null,
              R(ReorderableListComponent, {
                items: this.props.item.children,
                onReorder: this.props.updateOrder,
                getItemId: this.props.getItemId,
                renderItem: this.props.renderItem,
                element: R('tbody', {style: { background: 'red'}})
              }))))
        ))
    );
  }
}

class SortableSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: "red",
        children: [],
        parent: null
      }
      , {
        id: "green",
        parent: null,
        children:
          [{
            id: "leaves",
            children: [],
            parent: "green"
          }
          , {
            id: "plants",
            children: [],
            parent: "green"
          }
          , {
            id: "hulk",
            children:
              [{
                id: "hulk-blue",
                children:
                  [{
                    id: "hulk-blue-white",
                    children: [],
                    parent: "hulk-blue"
                  }
                  , {
                    id: "hulk-blue-black",
                    children: [],
                    parent: "hulk-blue"
                  }
                  ],
                parent: "hulk"
              }
              , {
                id: "hulk-white",
                children: [],
                parent: "hulk"
              }
              ],
            parent: "green"
          }
          ]
      }
      , {
        id: "blue",
        children: [],
        parent: null
      }
      , {
        id: "white",
        children: [],
        parent: null
      }
      , {
        id: "black",
        children: [],
        parent: null
      }
      ]
    };
  }

  renderItem = (item, index, connectDragSource, connectDragPreview, connectDropTarget) => {
    return R(SortableSampleItem, {
      item,
      index,
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      updateOrder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId
    });
  };

  updateOrder = reorderedList => {
    const item = reorderedList[0];

    if (item.parent === null) {
      return this.setState({items: reorderedList});
    } else {
      const items = this.state.items.splice(0);
      const node = this.findNodeById(items, item.parent);
      node.children = reorderedList;
      return this.setState({items});
    }
  };

  findNodeById(items, id) {
    for (let index = 0; index < items.length; index++) {
      const value = items[index];
      if (value.id === id) {
        return value;
      }

      if (value.children && value.children.length) {
        const result = this.findNodeById(value.children, id);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  getItemId(item) {
    return item.id;
  }

  addNewItem = () => {
    const items = this.state.items.splice(0);
    const id = uuid();
    items.push({
      id,
      children: [],
      parent: null
    });
    return this.setState({items});
  };

  render() {
    const id = uuid();
    const style=
      {padding: 10};
    return R('div', {style},
      R('button', {onClick: this.addNewItem},
        "Add new item"),
      R('table', null,
        R('thead', null,
          R('tr', null,
            R('th', null, "Item Name"))
        ),

        //R 'tbody', null,
        R(ReorderableListComponent, {
          items: this.state.items,
          onReorder: this.updateOrder,
          renderItem: this.renderItem,
          getItemId: this.getItemId,
          element: R('tbody', {style: { background: '#afafaf'}})
        })));
  }
}


class BlocksComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: "1", type: "title" },
        { id: "2", type: "image" },
        { id: "3", type: "text" }
      ]
    };
  }

  renderItem(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
    let elem;
    const wrapBorder = (e, inline=false) => R('div', { style: { 
        margin: 5,
        border: "solid 1px #DDD",
        borderRadius: 5,
        padding: 5,
        position: "relative",
        display: inline ? "inline-block" : undefined
      }
  }, 
      connectDragSource(R('div', {style: { position: "absolute", left: "50%", top: -8, border: "solid 1px #DDF", backgroundColor: "white" }},
        R('span', {className: "glyphicon glyphicon-move"})
      )),
      e);
    

    switch (item.type) {
      case "title":
        elem = R('h2', null, "Title");
        elem = wrapBorder(elem);
        break;
      case "image":
        elem = R('img', { 
          src: "http://image.shutterstock.com/display_pic_with_logo/359716/161613653/stock-photo-orange-fruit-isolated-on-white-161613653.jpg",
          style: {
            width: "33%",
            className: "img-thumbnail",
            border: "solid 1px #DDD",
            float: "right"
          }
        });
        break;
      case "text":
        elem = R('div', null, `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
`
        );
        elem = wrapBorder(elem);
        break;
    }



    return connectDragPreview(connectDropTarget(elem));
  }

  render() {
    return R('div', null,
      "Start",
      R(ReorderableListComponent, {
        items: this.state.items,
        onReorder: items => this.setState({items}),
        renderItem: this.renderItem,
        getItemId(item) { return item.id; }
      }),
      "End");
  }
}

class AutoSizeTestComponent extends React.Component {
  render() {
    return R(AutoSizeComponent, {injectHeight: true},
      size => {
        return R('div', {style: { height: size.height + 1, backgroundColor: "#FDF" }}, JSON.stringify(size));
    });
  }
}

class ToggleTestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'keep'
    };
  }
  render() {
    return R(ui.Toggle, {
      value: this.state.action,
      options: [{value: 'keep', label: 'Keep'}, {value: 'merge', label: 'Merge'}, {value: 'nd', label: 'Not duplicate'}, {value: 'ignore', label: 'Ignore'}],
      onChange: (action => { 
        console.log(action);
        return this.setState({action});
      }
      ),
      size: 'xs'
    }
    );
  }
}
// allowReset: true

class ReorderDemo extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      items: ["red", "green", "blue"]
    };
  }

  render() { 
    return R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: items => this.setState({items}),
      // function which renders the item, gets passed the current item and react dnd connectors
      // signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
      renderItem: (item, index, connectDragSource, connectDragPreview, connectDropTarget) => {
        return connectDragSource(connectDragPreview(connectDropTarget(R("div", null, item))));
      },
      getItemId: item => item
    }
    );
  }
}

const ReorderDemoWrapped = DragDropContext(HTML5Backend)(ReorderDemo);

// Wait for DOM to load
$(function() {
  // elem = R VerticalTreeLayoutComponent,
  //   line: "solid 1px red"
  //   height: 50
  //   headElem: R(Block)
  //   R(Block)
  //   R(Block2)
  //   R(Block)
  //   R(Block)
  
  // showModal = (n) ->
  //   ModalPopupComponent.show((onClose) =>
  //     return R ModalPopupComponent, 
  //       showCloseX: true
  //       onClose: onClose
  //       size: "large"
  //       footer: R('button', type: "button", className: "btn btn-default", onClick: onClose, "TEST")
  //       header: "This is a test modal", 
  //         _.map(_.range(1, n), (x) -> R 'div', null, "#{x}")
  //         R 'button', type: "button", onClick: (-> showModal(10)), "SHOW"
  //     )

  // elem = R 'div', style: { paddingLeft: 30 },
  //   _.map(_.range(1, 100), (x) -> R 'div', null, "#{x}")
  //   R 'button', type: "button", onClick: (-> showModal(100)), "SHOW"

  // elem = R 'div', null,
  //   R 'div', style: { height: 300, backgroundColor: "red" }
  //   R FillDownwardComponent, null,
  //     R 'div', style: { height: "100%", backgroundColor: "green" }

  // elem = R AutoSizeTestComponent

  // elem = R ToggleTestComponent

  // elem = R ui.NumberInput,
  //     onChange: console.log
  //     min: 0
  //     max: 100
  //     decimal: false 

  // elem = R PopupHelpComponent, null,
  //   "This is a test!" 
  
  // elem = R ReactElementPrinterSample, null
  // elem = R ModalPopupSample, null
  // elem = R GridComponentDemo
  const elem = R(GanttChartDemo);

  // elem = R 'div', null,
  //    React.createElement(SampleComponent)
  //    R('br')

  // elem = R 'div', style: { padding: 20, textAlign: "right" },
  //   "Lorem ipsum est"
  //   React.createElement(PopoverHelpSample)
  //   R('br')

  // ModalPopupComponent.show((onClose) =>
  //   return React.createElement(ModalPopupComponent, {
  //     showCloseX: true
  //     }, _.map(_.range(1, 10), (x) -> R 'div', null, "#{x}"))
  //   )

  return ReactDOM.render(elem, document.getElementById("main"));
});



//  elem = R ModalPopupComponent, { header: "OUTER", size: "large", trigger: R('button', null, "Open Modal") },
//    R ModalPopupComponent, { header: "INNER", trigger: R('a', null, "Open Modal") },
//      R ModalPopupComponent, { header: "INNER-1" , size: "small", trigger: R('button', null, "Open Modal")},
//        R ModalPopupComponent, { header: "INNER-2", size: "large", trigger: R('a', null, "Open Modal") },
//          "The last modal"

//  elem = R ModalSample


