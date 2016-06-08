var Block, Block2, H, ModalPopupComponent, ModalSample, ModalWindowComponent, R, React, ReactDOM, ReorderableListComponent, SampleComponent, SortableSample, SortableSampleItem, VerticalTreeLayoutComponent, _, uuid,
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

ModalSample = (function(superClass) {
  extend(ModalSample, superClass);

  function ModalSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalSample.prototype.render = function() {
    var sizes;
    sizes = ["large", "small", ""];
    return H.div(null, R(ModalWindowComponent, {
      isOpen: true
    }, H.div(null, _.map(_.range(1, 100), function(x) {
      return H.div(null, "" + x);
    }))));
  };

  return ModalSample;

})(React.Component);

SortableSampleItem = (function(superClass) {
  extend(SortableSampleItem, superClass);

  function SortableSampleItem() {
    return SortableSampleItem.__super__.constructor.apply(this, arguments);
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
    return H.div({
      style: itemStyle
    }, this.props.connectDragSource(H.span({
      style: handleStyle
    })), H.span(null, this.props.item.id), R(ReorderableListComponent, {
      items: this.props.item.children,
      onReorder: this.props.updateOrder,
      getItemId: this.props.getItemId,
      renderItem: this.props.renderItem
    }));
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

  SortableSample.prototype.renderItem = function(item, index, connectDragSource) {
    return H.div(null, R(SortableSampleItem, {
      item: item,
      index: index,
      connectDragSource: connectDragSource,
      updateOrder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId
    }));
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
    }, "Add new item"), R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId
    }));
  };

  return SortableSample;

})(React.Component);

$(function() {
  var elem;
  elem = R(SortableSample);
  return ReactDOM.render(elem, document.getElementById("main"));
});
