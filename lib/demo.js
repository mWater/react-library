var Block, Block2, BlocksComponent, H, ModalPopupComponent, ModalPopupSample, ModalWindowComponent, ModalWindowSample, PopoverHelpComponent, PopoverHelpSample, R, React, ReactDOM, ReorderableListComponent, ReorderableListItemComponent, SampleComponent, SortableSample, SortableSampleItem, VerticalTreeLayoutComponent, _, uuid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

React = require('react');

ReactDOM = require('react-dom');

H = React.DOM;

R = React.createElement;

_ = require('lodash');

uuid = require('node-uuid');

SampleComponent = require('./SampleComponent');

ModalPopupComponent = require('./ModalPopupComponent');

ModalWindowComponent = require('./ModalWindowComponent');

VerticalTreeLayoutComponent = require('./VerticalTreeLayoutComponent');

ReorderableListComponent = require("./reorderable/ReorderableListComponent");

ReorderableListItemComponent = require("./reorderable/ReorderableListItemComponent");

PopoverHelpComponent = require('./PopoverHelpComponent');

PopoverHelpSample = (function(superClass) {
  extend(PopoverHelpSample, superClass);

  function PopoverHelpSample() {
    return PopoverHelpSample.__super__.constructor.apply(this, arguments);
  }

  PopoverHelpSample.prototype.render = function() {
    return R(PopoverHelpComponent, null, "This is a test");
  };

  return PopoverHelpSample;

})(React.Component);

Block = (function(superClass) {
  extend(Block, superClass);

  function Block() {
    return Block.__super__.constructor.apply(this, arguments);
  }

  Block.prototype.render = function() {
    return H.div({
      style: {
        height: 200,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block;

})(React.Component);

Block2 = (function(superClass) {
  extend(Block2, superClass);

  function Block2() {
    return Block2.__super__.constructor.apply(this, arguments);
  }

  Block2.prototype.render = function() {
    return H.div({
      style: {
        height: 300,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block2;

})(React.Component);

ModalWindowSample = (function(superClass) {
  extend(ModalWindowSample, superClass);

  function ModalWindowSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalWindowSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalWindowSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalWindowSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalWindowSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalWindowSample.prototype.render = function() {
    var sizes;
    sizes = ["large", "small", ""];
    return H.div(null, R(ModalWindowComponent, {
      isOpen: true
    }, H.div(null, _.map(_.range(1, 100), function(x) {
      return H.div(null, "" + x);
    }))));
  };

  return ModalWindowSample;

})(React.Component);

ModalPopupSample = (function(superClass) {
  extend(ModalPopupSample, superClass);

  function ModalPopupSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalPopupSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalPopupSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalPopupSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalPopupSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalPopupSample.prototype.render = function() {
    return H.div(null, R(ModalPopupComponent, {
      onClose: this.handleModalClose,
      showCloseX: true
    }, H.div(null, _.map(_.range(1, 100), function(x) {
      return H.div(null, "" + x);
    }))));
  };

  return ModalPopupSample;

})(React.Component);

SortableSampleItem = (function(superClass) {
  extend(SortableSampleItem, superClass);

  function SortableSampleItem() {
    SortableSampleItem.__super__.constructor.apply(this, arguments);
    this.state = {
      value: Math.floor(Math.random() * 1000) + "!"
    };
  }

  SortableSampleItem.prototype.render = function() {
    var handleStyle, id, itemStyle;
    id = uuid.v4();
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
    return this.props.connectDragPreview(this.props.connectDropTarget(H.tr(null, H.td({
      style: itemStyle
    }, this.props.connectDragSource(H.span({
      style: handleStyle
    })), H.span(null, this.props.item.id, this.state.value), H.div(null, H.table(null, R(ReorderableListComponent, {
      items: this.props.item.children,
      onReorder: this.props.updateOrder,
      getItemId: this.props.getItemId,
      renderItem: this.props.renderItem,
      element: H.tbody({
        style: {
          background: 'red'
        }
      })
    })))))));
  };

  return SortableSampleItem;

})(React.Component);

SortableSample = (function(superClass) {
  extend(SortableSample, superClass);

  function SortableSample() {
    this.addNewItem = bind(this.addNewItem, this);
    this.updateOrder = bind(this.updateOrder, this);
    this.renderItem = bind(this.renderItem, this);
    SortableSample.__super__.constructor.apply(this, arguments);
    this.state = {
      items: [
        {
          id: "red",
          children: [],
          parent: null
        }, {
          id: "green",
          parent: null,
          children: [
            {
              id: "leaves",
              children: [],
              parent: "green"
            }, {
              id: "plants",
              children: [],
              parent: "green"
            }, {
              id: "hulk",
              children: [
                {
                  id: "hulk-blue",
                  children: [
                    {
                      id: "hulk-blue-white",
                      children: [],
                      parent: "hulk-blue"
                    }, {
                      id: "hulk-blue-black",
                      children: [],
                      parent: "hulk-blue"
                    }
                  ],
                  parent: "hulk"
                }, {
                  id: "hulk-white",
                  children: [],
                  parent: "hulk"
                }
              ],
              parent: "green"
            }
          ]
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
        }
      ]
    };
  }

  SortableSample.prototype.renderItem = function(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
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
  };

  SortableSample.prototype.updateOrder = function(reorderedList) {
    var item, items, node;
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
  };

  SortableSample.prototype.findNodeById = function(items, id) {
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
  };

  SortableSample.prototype.getItemId = function(item) {
    return item.id;
  };

  SortableSample.prototype.addNewItem = function() {
    var id, items;
    items = this.state.items.splice(0);
    id = uuid.v4();
    items.push({
      id: id,
      children: [],
      parent: null
    });
    return this.setState({
      items: items
    });
  };

  SortableSample.prototype.render = function() {
    var id, style;
    id = uuid.v4();
    style = {
      padding: 10
    };
    return H.div({
      style: style
    }, H.button({
      onClick: this.addNewItem
    }, "Add new item"), H.table(null, H.thead(null, H.tr(null, H.th(null, "Item Name"))), R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId,
      element: H.tbody({
        style: {
          background: '#afafaf'
        }
      })
    })));
  };

  return SortableSample;

})(React.Component);

BlocksComponent = (function(superClass) {
  extend(BlocksComponent, superClass);

  function BlocksComponent(props) {
    BlocksComponent.__super__.constructor.apply(this, arguments);
    this.state = {
      items: [
        {
          id: "1",
          type: "title"
        }, {
          id: "2",
          type: "image"
        }, {
          id: "3",
          type: "text"
        }
      ]
    };
  }

  BlocksComponent.prototype.renderItem = function(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
    var elem, wrapBorder;
    wrapBorder = function(e, inline) {
      if (inline == null) {
        inline = false;
      }
      return H.div({
        style: {
          margin: 5,
          border: "solid 1px #DDD",
          borderRadius: 5,
          padding: 5,
          position: "relative",
          display: inline ? "inline-block" : void 0
        }
      }, connectDragSource(H.div({
        style: {
          position: "absolute",
          left: "50%",
          top: -8,
          border: "solid 1px #DDF",
          backgroundColor: "white"
        }
      }, H.span({
        className: "glyphicon glyphicon-move"
      }))), e);
    };
    switch (item.type) {
      case "title":
        elem = H.h2(null, "Title");
        elem = wrapBorder(elem);
        break;
      case "image":
        elem = H.img({
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
        elem = H.div(null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        elem = wrapBorder(elem);
    }
    return connectDragPreview(connectDropTarget(elem));
  };

  BlocksComponent.prototype.render = function() {
    return H.div(null, "Start", R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: (function(_this) {
        return function(items) {
          return _this.setState({
            items: items
          });
        };
      })(this),
      renderItem: this.renderItem,
      getItemId: function(item) {
        return item.id;
      }
    }), "End");
  };

  return BlocksComponent;

})(React.Component);

$(function() {
  var elem, showModal;
  showModal = function(n) {
    return ModalPopupComponent.show((function(_this) {
      return function(onClose) {
        return R(ModalPopupComponent, {
          showCloseX: true,
          onClose: onClose,
          size: "large",
          footer: H.button({
            type: "button",
            className: "btn btn-default",
            onClick: onClose
          }, "TEST"),
          header: "This is a test modal"
        }, _.map(_.range(1, n), function(x) {
          return H.div(null, "" + x);
        }), H.button({
          type: "button",
          onClick: (function() {
            return showModal(10);
          })
        }, "SHOW"));
      };
    })(this));
  };
  elem = H.div({
    style: {
      paddingLeft: 30
    }
  }, _.map(_.range(1, 100), function(x) {
    return H.div(null, "" + x);
  }), H.button({
    type: "button",
    onClick: (function() {
      return showModal(100);
    })
  }, "SHOW"));
  return ReactDOM.render(elem, document.getElementById("main"), (function(_this) {
    return function() {
      return showModal(100);
    };
  })(this));
});
