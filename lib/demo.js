"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var AutoSizeComponent,
    AutoSizeTestComponent,
    Block,
    Block2,
    BlocksComponent,
    DragDropContext,
    FillDownwardComponent,
    GridComponentDemo,
    HTML5Backend,
    ModalPopupComponent,
    ModalPopupSample,
    ModalWindowComponent,
    ModalWindowSample,
    PopoverHelpComponent,
    PopoverHelpSample,
    PopupHelpComponent,
    R,
    React,
    ReactDOM,
    ReactElementPrinter,
    ReactElementPrinterSample,
    ReorderDemo,
    ReorderDemoWrapped,
    ReorderableListComponent,
    ReorderableListItemComponent,
    SampleComponent,
    SortableSample,
    SortableSampleItem,
    ToggleTestComponent,
    VerticalTreeLayoutComponent,
    _,
    ui,
    uuid,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
_ = require('lodash');
uuid = require('uuid');
SampleComponent = require('./SampleComponent');
ModalPopupComponent = require('./ModalPopupComponent');
ModalWindowComponent = require('./ModalWindowComponent');
VerticalTreeLayoutComponent = require('./VerticalTreeLayoutComponent');
ReorderableListComponent = require("./reorderable/ReorderableListComponent");
ReorderableListItemComponent = require("./reorderable/ReorderableListItemComponent");
PopoverHelpComponent = require('./PopoverHelpComponent');
PopupHelpComponent = require('./PopupHelpComponent')["default"];
FillDownwardComponent = require('./FillDownwardComponent');
AutoSizeComponent = require('./AutoSizeComponent');
ui = require('./bootstrap');
ReactElementPrinter = require('./ReactElementPrinter');
GridComponentDemo = require('./GridComponentDemo').GridComponentDemo;
HTML5Backend = require('react-dnd-html5-backend')["default"];
DragDropContext = require("react-dnd").DragDropContext;

PopoverHelpSample =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(PopoverHelpSample, _React$Component);

  function PopoverHelpSample() {
    (0, _classCallCheck2["default"])(this, PopoverHelpSample);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PopoverHelpSample).apply(this, arguments));
  }

  (0, _createClass2["default"])(PopoverHelpSample, [{
    key: "render",
    value: function render() {
      return R(PopoverHelpComponent, null, "This is a test");
    }
  }]);
  return PopoverHelpSample;
}(React.Component);

Block =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2["default"])(Block, _React$Component2);

  function Block() {
    (0, _classCallCheck2["default"])(this, Block);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Block).apply(this, arguments));
  }

  (0, _createClass2["default"])(Block, [{
    key: "render",
    value: function render() {
      return R('div', {
        style: {
          height: 200,
          width: 200,
          border: "solid 2px blue"
        }
      }, " ");
    }
  }]);
  return Block;
}(React.Component);

Block2 =
/*#__PURE__*/
function (_React$Component3) {
  (0, _inherits2["default"])(Block2, _React$Component3);

  function Block2() {
    (0, _classCallCheck2["default"])(this, Block2);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Block2).apply(this, arguments));
  }

  (0, _createClass2["default"])(Block2, [{
    key: "render",
    value: function render() {
      return R('div', {
        style: {
          height: 300,
          width: 200,
          border: "solid 2px blue"
        }
      }, " ");
    }
  }]);
  return Block2;
}(React.Component);

ReactElementPrinterSample =
/*#__PURE__*/
function (_React$Component4) {
  (0, _inherits2["default"])(ReactElementPrinterSample, _React$Component4);

  function ReactElementPrinterSample() {
    var _this;

    (0, _classCallCheck2["default"])(this, ReactElementPrinterSample);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ReactElementPrinterSample).apply(this, arguments));
    _this.handlePrint = _this.handlePrint.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ReactElementPrinterSample, [{
    key: "handlePrint",
    value: function handlePrint() {
      var elem, printer;
      boundMethodCheck(this, ReactElementPrinterSample);
      printer = new ReactElementPrinter();
      elem = R('h1', null, "Print this!");
      return printer.print(elem, {});
    }
  }, {
    key: "render",
    value: function render() {
      return R('div', null, R('button', {
        type: "button",
        onClick: this.handlePrint
      }, "Print"), "DO NOT PRINT THIS");
    }
  }]);
  return ReactElementPrinterSample;
}(React.Component);

ModalWindowSample =
/*#__PURE__*/
function (_React$Component5) {
  (0, _inherits2["default"])(ModalWindowSample, _React$Component5);

  function ModalWindowSample(props) {
    var _this2;

    (0, _classCallCheck2["default"])(this, ModalWindowSample);
    _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ModalWindowSample).call(this, props));
    _this2.startEditing = _this2.startEditing.bind((0, _assertThisInitialized2["default"])(_this2));
    _this2.finishEditing = _this2.finishEditing.bind((0, _assertThisInitialized2["default"])(_this2));
    _this2.handleModalClose = _this2.handleModalClose.bind((0, _assertThisInitialized2["default"])(_this2));
    _this2.state = {
      editing: false
    };
    return _this2;
  }

  (0, _createClass2["default"])(ModalWindowSample, [{
    key: "startEditing",
    value: function startEditing() {
      boundMethodCheck(this, ModalWindowSample);
      return this.setState({
        editing: true
      });
    }
  }, {
    key: "finishEditing",
    value: function finishEditing() {
      boundMethodCheck(this, ModalWindowSample);
      return this.setState({
        editing: false
      });
    }
  }, {
    key: "handleModalClose",
    value: function handleModalClose() {
      boundMethodCheck(this, ModalWindowSample);
      this.finishEditing();
      return console.log("editing finished");
    }
  }, {
    key: "render",
    value: function render() {
      var sizes;
      sizes = ["large", "small", ""];
      return R('div', null, R('a', {
        onClick: this.startEditing
      }, "Edit me"), this.state.editing ? R(ModalWindowComponent, {
        isOpen: this.state.editing,
        onRequestClose: this.finishEditing
      }, R('div', null, _.map(_.range(1, 100), function (x) {
        return R('div', null, "".concat(x));
      }))) : void 0);
    }
  }]);
  return ModalWindowSample;
}(React.Component);

ModalPopupSample =
/*#__PURE__*/
function (_React$Component6) {
  (0, _inherits2["default"])(ModalPopupSample, _React$Component6);

  function ModalPopupSample(props) {
    var _this3;

    (0, _classCallCheck2["default"])(this, ModalPopupSample);
    _this3 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ModalPopupSample).call(this, props));
    _this3.startEditing = _this3.startEditing.bind((0, _assertThisInitialized2["default"])(_this3));
    _this3.finishEditing = _this3.finishEditing.bind((0, _assertThisInitialized2["default"])(_this3));
    _this3.handleModalClose = _this3.handleModalClose.bind((0, _assertThisInitialized2["default"])(_this3));
    _this3.state = {
      editing: false
    };
    return _this3;
  }

  (0, _createClass2["default"])(ModalPopupSample, [{
    key: "startEditing",
    value: function startEditing() {
      boundMethodCheck(this, ModalPopupSample);
      return this.setState({
        editing: true
      });
    }
  }, {
    key: "finishEditing",
    value: function finishEditing() {
      boundMethodCheck(this, ModalPopupSample);
      return this.setState({
        editing: false
      });
    }
  }, {
    key: "handleModalClose",
    value: function handleModalClose() {
      boundMethodCheck(this, ModalPopupSample);
      this.finishEditing();
      return console.log("editing finished");
    }
  }, {
    key: "render",
    value: function render() {
      return R('div', null, R('a', {
        onClick: this.startEditing
      }, "Edit me"), this.state.editing ? R(ModalPopupComponent, {
        onClose: this.handleModalClose,
        showCloseX: true
      }, R('div', null, _.map(_.range(1, 100), function (x) {
        return R('div', null, "".concat(x));
      }))) : void 0);
    }
  }]);
  return ModalPopupSample;
}(React.Component);

SortableSampleItem =
/*#__PURE__*/
function (_React$Component7) {
  (0, _inherits2["default"])(SortableSampleItem, _React$Component7);

  function SortableSampleItem(props) {
    var _this4;

    (0, _classCallCheck2["default"])(this, SortableSampleItem);
    _this4 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SortableSampleItem).call(this, props));
    _this4.state = {
      value: Math.floor(Math.random() * 1000) + "!"
    };
    return _this4;
  }

  (0, _createClass2["default"])(SortableSampleItem, [{
    key: "render",
    value: function render() {
      var handleStyle, id, itemStyle;
      id = uuid();
      itemStyle = {
        border: "1px solid #aeaeae",
        padding: "8px"
      };
      handleStyle = {
        height: 10,
        width: 10,
        background: "green",
        marginRight: 10,
        display: "inline-block",
        cursor: "move"
      };
      return this.props.connectDragPreview(this.props.connectDropTarget(R('tr', null, R('td', {
        style: itemStyle
      }, this.props.connectDragSource(R('span', {
        style: handleStyle
      })), R('span', null, this.props.item.id, this.state.value), R('div', null, R('table', null, R(ReorderableListComponent, {
        items: this.props.item.children,
        onReorder: this.props.updateOrder,
        getItemId: this.props.getItemId,
        renderItem: this.props.renderItem,
        element: R('tbody', {
          style: {
            background: 'red'
          }
        })
      })))))));
    }
  }]);
  return SortableSampleItem;
}(React.Component);

SortableSample =
/*#__PURE__*/
function (_React$Component8) {
  (0, _inherits2["default"])(SortableSample, _React$Component8);

  function SortableSample(props) {
    var _this5;

    (0, _classCallCheck2["default"])(this, SortableSample);
    _this5 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SortableSample).call(this, props));
    _this5.renderItem = _this5.renderItem.bind((0, _assertThisInitialized2["default"])(_this5));
    _this5.updateOrder = _this5.updateOrder.bind((0, _assertThisInitialized2["default"])(_this5));
    _this5.addNewItem = _this5.addNewItem.bind((0, _assertThisInitialized2["default"])(_this5));
    _this5.state = {
      items: [{
        id: "red",
        children: [],
        parent: null
      }, {
        id: "green",
        parent: null,
        children: [{
          id: "leaves",
          children: [],
          parent: "green"
        }, {
          id: "plants",
          children: [],
          parent: "green"
        }, {
          id: "hulk",
          children: [{
            id: "hulk-blue",
            children: [{
              id: "hulk-blue-white",
              children: [],
              parent: "hulk-blue"
            }, {
              id: "hulk-blue-black",
              children: [],
              parent: "hulk-blue"
            }],
            parent: "hulk"
          }, {
            id: "hulk-white",
            children: [],
            parent: "hulk"
          }],
          parent: "green"
        }]
      }, {
        id: "blue",
        children: [],
        parent: null
      }, {
        id: "white",
        children: [],
        parent: null
      }, {
        id: "black",
        children: [],
        parent: null
      }]
    };
    return _this5;
  }

  (0, _createClass2["default"])(SortableSample, [{
    key: "renderItem",
    value: function renderItem(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
      boundMethodCheck(this, SortableSample);
      return R(SortableSampleItem, {
        item: item,
        index: index,
        connectDragSource: connectDragSource,
        connectDragPreview: connectDragPreview,
        connectDropTarget: connectDropTarget,
        updateOrder: this.updateOrder,
        renderItem: this.renderItem,
        getItemId: this.getItemId
      });
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(reorderedList) {
      var item, items, node;
      boundMethodCheck(this, SortableSample);
      item = reorderedList[0];

      if (item.parent === null) {
        return this.setState({
          items: reorderedList
        });
      } else {
        items = this.state.items.splice(0);
        node = this.findNodeById(items, item.parent);
        node.children = reorderedList;
        return this.setState({
          items: items
        });
      }
    }
  }, {
    key: "findNodeById",
    value: function findNodeById(items, id) {
      var i, index, len, result, value;

      for (index = i = 0, len = items.length; i < len; index = ++i) {
        value = items[index];

        if (value.id === id) {
          return value;
        }

        if (value.children && value.children.length) {
          result = this.findNodeById(value.children, id);

          if (result) {
            return result;
          }
        }
      }

      return false;
    }
  }, {
    key: "getItemId",
    value: function getItemId(item) {
      return item.id;
    }
  }, {
    key: "addNewItem",
    value: function addNewItem() {
      var id, items;
      boundMethodCheck(this, SortableSample);
      items = this.state.items.splice(0);
      id = uuid();
      items.push({
        id: id,
        children: [],
        parent: null
      });
      return this.setState({
        items: items
      });
    }
  }, {
    key: "render",
    value: function render() {
      var id, style;
      id = uuid();
      style = {
        padding: 10
      };
      return R('div', {
        style: style
      }, R('button', {
        onClick: this.addNewItem //R 'tbody', null,

      }, "Add new item"), R('table', null, R('thead', null, R('tr', null, R('th', null, "Item Name"))), R(ReorderableListComponent, {
        items: this.state.items,
        onReorder: this.updateOrder,
        renderItem: this.renderItem,
        getItemId: this.getItemId,
        element: R('tbody', {
          style: {
            background: '#afafaf'
          }
        })
      })));
    }
  }]);
  return SortableSample;
}(React.Component);

BlocksComponent =
/*#__PURE__*/
function (_React$Component9) {
  (0, _inherits2["default"])(BlocksComponent, _React$Component9);

  function BlocksComponent(props) {
    var _this6;

    (0, _classCallCheck2["default"])(this, BlocksComponent);
    _this6 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BlocksComponent).call(this, props));
    _this6.state = {
      items: [{
        id: "1",
        type: "title"
      }, {
        id: "2",
        type: "image"
      }, {
        id: "3",
        type: "text"
      }]
    };
    return _this6;
  }

  (0, _createClass2["default"])(BlocksComponent, [{
    key: "renderItem",
    value: function renderItem(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
      var elem, wrapBorder;

      wrapBorder = function wrapBorder(e) {
        var inline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return R('div', {
          style: {
            margin: 5,
            border: "solid 1px #DDD",
            borderRadius: 5,
            padding: 5,
            position: "relative",
            display: inline ? "inline-block" : void 0
          }
        }, connectDragSource(R('div', {
          style: {
            position: "absolute",
            left: "50%",
            top: -8,
            border: "solid 1px #DDF",
            backgroundColor: "white"
          }
        }, R('span', {
          className: "glyphicon glyphicon-move"
        }))), e);
      };

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
              "float": "right"
            }
          });
          break;

        case "text":
          elem = R('div', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
          elem = wrapBorder(elem);
      }

      return connectDragPreview(connectDropTarget(elem));
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return R('div', null, "Start", R(ReorderableListComponent, {
        items: this.state.items,
        onReorder: function onReorder(items) {
          return _this7.setState({
            items: items
          });
        },
        renderItem: this.renderItem,
        getItemId: function getItemId(item) {
          return item.id;
        }
      }), "End");
    }
  }]);
  return BlocksComponent;
}(React.Component);

AutoSizeTestComponent =
/*#__PURE__*/
function (_React$Component10) {
  (0, _inherits2["default"])(AutoSizeTestComponent, _React$Component10);

  function AutoSizeTestComponent() {
    (0, _classCallCheck2["default"])(this, AutoSizeTestComponent);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AutoSizeTestComponent).apply(this, arguments));
  }

  (0, _createClass2["default"])(AutoSizeTestComponent, [{
    key: "render",
    value: function render() {
      return R(AutoSizeComponent, {
        injectHeight: true
      }, function (size) {
        return R('div', {
          style: {
            height: size.height + 1,
            backgroundColor: "#FDF"
          }
        }, JSON.stringify(size));
      });
    }
  }]);
  return AutoSizeTestComponent;
}(React.Component);

ToggleTestComponent =
/*#__PURE__*/
function (_React$Component11) {
  (0, _inherits2["default"])(ToggleTestComponent, _React$Component11);

  function ToggleTestComponent(props) {
    var _this8;

    (0, _classCallCheck2["default"])(this, ToggleTestComponent);
    _this8 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ToggleTestComponent).call(this, props));
    _this8.state = {
      action: 'keep'
    };
    return _this8;
  }

  (0, _createClass2["default"])(ToggleTestComponent, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      return R(ui.Toggle, {
        value: this.state.action,
        options: [{
          value: 'keep',
          label: 'Keep'
        }, {
          value: 'merge',
          label: 'Merge'
        }, {
          value: 'nd',
          label: 'Not duplicate'
        }, {
          value: 'ignore',
          label: 'Ignore'
        }],
        onChange: function onChange(action) {
          console.log(action);
          return _this9.setState({
            action: action
          });
        },
        size: 'xs'
      });
    }
  }]);
  return ToggleTestComponent;
}(React.Component); // allowReset: true


ReorderDemo =
/*#__PURE__*/
function (_React$Component12) {
  (0, _inherits2["default"])(ReorderDemo, _React$Component12);

  function ReorderDemo(props) {
    var _this10;

    (0, _classCallCheck2["default"])(this, ReorderDemo);
    _this10 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ReorderDemo).call(this, props));
    _this10.state = {
      items: ["red", "green", "blue"]
    };
    return _this10;
  }

  (0, _createClass2["default"])(ReorderDemo, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      return R(ReorderableListComponent, {
        items: this.state.items,
        onReorder: function onReorder(items) {
          return _this11.setState({
            items: items
          });
        },
        // function which renders the item, gets passed the current item and react dnd connectors
        // signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
        renderItem: function renderItem(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
          return connectDragSource(connectDragPreview(connectDropTarget(R("div", null, item))));
        },
        getItemId: function getItemId(item) {
          return item;
        }
      });
    }
  }]);
  return ReorderDemo;
}(React.Component);

ReorderDemoWrapped = DragDropContext(HTML5Backend)(ReorderDemo); // Wait for DOM to load

$(function () {
  var elem; // elem = R VerticalTreeLayoutComponent,
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

  elem = R(GridComponentDemo); // elem = R 'div', null,
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
}); //  elem = R ModalPopupComponent, { header: "OUTER", size: "large", trigger: R('button', null, "Open Modal") },
//    R ModalPopupComponent, { header: "INNER", trigger: R('a', null, "Open Modal") },
//      R ModalPopupComponent, { header: "INNER-1" , size: "small", trigger: R('button', null, "Open Modal")},
//        R ModalPopupComponent, { header: "INNER-2", size: "large", trigger: R('a', null, "Open Modal") },
//          "The last modal"
//  elem = R ModalSample