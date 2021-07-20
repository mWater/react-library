"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const R = react_1.default.createElement;
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = __importDefault(require("uuid"));
const ModalPopupComponent_1 = __importDefault(require("./ModalPopupComponent"));
const ModalWindowComponent_1 = __importDefault(require("./ModalWindowComponent"));
const ReorderableListComponent_1 = __importDefault(require("./reorderable/ReorderableListComponent"));
const PopoverHelpComponent_1 = __importDefault(require("./PopoverHelpComponent"));
const AutoSizeComponent_1 = __importDefault(require("./AutoSizeComponent"));
const ui = __importStar(require("./bootstrap"));
const ReactElementPrinter_1 = __importDefault(require("./ReactElementPrinter"));
const GanttChartDemo_1 = require("./GanttChartDemo");
const react_dnd_html5_backend_1 = __importDefault(require("react-dnd-html5-backend"));
const react_dnd_1 = require("react-dnd");
class PopoverHelpSample extends react_1.default.Component {
    render() {
        return R(PopoverHelpComponent_1.default, null, "This is a test");
    }
}
class Block extends react_1.default.Component {
    render() {
        return R("div", { style: { height: 200, width: 200, border: "solid 2px blue" } }, " ");
    }
}
class Block2 extends react_1.default.Component {
    render() {
        return R("div", { style: { height: 300, width: 200, border: "solid 2px blue" } }, " ");
    }
}
class ReactElementPrinterSample extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handlePrint = () => {
            const printer = new ReactElementPrinter_1.default();
            const elem = R("h1", null, "Print this!");
            return printer.print(elem, {});
        };
    }
    render() {
        return R("div", null, R("button", { type: "button", onClick: this.handlePrint }, "Print"), "DO NOT PRINT THIS");
    }
}
class ModalWindowSample extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.startEditing = () => {
            return this.setState({ editing: true });
        };
        this.finishEditing = () => {
            return this.setState({ editing: false });
        };
        this.handleModalClose = () => {
            this.finishEditing();
            return console.log("editing finished");
        };
        this.state = {
            editing: false
        };
    }
    render() {
        const sizes = ["large", "small", ""];
        return R("div", null, R("a", { onClick: this.startEditing }, "Edit me"), this.state.editing
            ? R(ModalWindowComponent_1.default, { isOpen: this.state.editing, onRequestClose: this.finishEditing }, R("div", null, lodash_1.default.map(lodash_1.default.range(1, 100), (x) => R("div", null, `${x}`))))
            : undefined);
    }
}
class ModalPopupSample extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.startEditing = () => {
            return this.setState({ editing: true });
        };
        this.finishEditing = () => {
            return this.setState({ editing: false });
        };
        this.handleModalClose = () => {
            this.finishEditing();
            return console.log("editing finished");
        };
        this.state = {
            editing: false
        };
    }
    render() {
        return R("div", null, R("a", { onClick: this.startEditing }, "Edit me"), this.state.editing
            ? R(ModalPopupComponent_1.default, { onClose: this.handleModalClose, showCloseX: true, width: 350 }, R("div", null, lodash_1.default.map(lodash_1.default.range(1, 100), (x) => R("div", null, `${x}`))))
            : undefined);
    }
}
class SortableSampleItem extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Math.floor(Math.random() * 1000) + "!"
        };
    }
    render() {
        const id = uuid_1.default();
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
        return this.props.connectDragPreview(this.props.connectDropTarget(R("tr", null, R("td", { style: itemStyle }, this.props.connectDragSource(R("span", { style: handleStyle })), R("span", null, this.props.item.id, this.state.value), R("div", null, R("table", null, R(ReorderableListComponent_1.default, {
            items: this.props.item.children,
            onReorder: this.props.updateOrder,
            getItemId: this.props.getItemId,
            renderItem: this.props.renderItem,
            element: R("tbody", { style: { background: "red" } })
        })))))));
    }
}
class SortableSample extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.renderItem = (item, index, connectDragSource, connectDragPreview, connectDropTarget) => {
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
        this.updateOrder = (reorderedList) => {
            const item = reorderedList[0];
            if (item.parent === null) {
                return this.setState({ items: reorderedList });
            }
            else {
                const items = this.state.items.splice(0);
                const node = this.findNodeById(items, item.parent);
                node.children = reorderedList;
                return this.setState({ items });
            }
        };
        this.addNewItem = () => {
            const items = this.state.items.splice(0);
            const id = uuid_1.default();
            items.push({
                id,
                children: [],
                parent: null
            });
            return this.setState({ items });
        };
        this.state = {
            items: [
                {
                    id: "red",
                    children: [],
                    parent: null
                },
                {
                    id: "green",
                    parent: null,
                    children: [
                        {
                            id: "leaves",
                            children: [],
                            parent: "green"
                        },
                        {
                            id: "plants",
                            children: [],
                            parent: "green"
                        },
                        {
                            id: "hulk",
                            children: [
                                {
                                    id: "hulk-blue",
                                    children: [
                                        {
                                            id: "hulk-blue-white",
                                            children: [],
                                            parent: "hulk-blue"
                                        },
                                        {
                                            id: "hulk-blue-black",
                                            children: [],
                                            parent: "hulk-blue"
                                        }
                                    ],
                                    parent: "hulk"
                                },
                                {
                                    id: "hulk-white",
                                    children: [],
                                    parent: "hulk"
                                }
                            ],
                            parent: "green"
                        }
                    ]
                },
                {
                    id: "blue",
                    children: [],
                    parent: null
                },
                {
                    id: "white",
                    children: [],
                    parent: null
                },
                {
                    id: "black",
                    children: [],
                    parent: null
                }
            ]
        };
    }
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
    render() {
        const id = uuid_1.default();
        const style = { padding: 10 };
        return R("div", { style }, R("button", { onClick: this.addNewItem }, "Add new item"), R("table", null, R("thead", null, R("tr", null, R("th", null, "Item Name"))), 
        //R 'tbody', null,
        R(ReorderableListComponent_1.default, {
            items: this.state.items,
            onReorder: this.updateOrder,
            renderItem: this.renderItem,
            getItemId: this.getItemId,
            element: R("tbody", { style: { background: "#afafaf" } })
        })));
    }
}
class BlocksComponent extends react_1.default.Component {
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
        const wrapBorder = (e, inline = false) => R("div", {
            style: {
                margin: 5,
                border: "solid 1px #DDD",
                borderRadius: 5,
                padding: 5,
                position: "relative",
                display: inline ? "inline-block" : undefined
            }
        }, connectDragSource(R("div", {
            style: { position: "absolute", left: "50%", top: -8, border: "solid 1px #DDF", backgroundColor: "white" }
        }, R("span", { className: "glyphicon glyphicon-move" }))), e);
        switch (item.type) {
            case "title":
                elem = R("h2", null, "Title");
                elem = wrapBorder(elem);
                break;
            case "image":
                elem = R("img", {
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
                elem = R("div", null, `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
`);
                elem = wrapBorder(elem);
                break;
        }
        return connectDragPreview(connectDropTarget(elem));
    }
    render() {
        return R("div", null, "Start", R(ReorderableListComponent_1.default, {
            items: this.state.items,
            onReorder: (items) => this.setState({ items }),
            renderItem: this.renderItem,
            getItemId(item) {
                return item.id;
            }
        }), "End");
    }
}
class AutoSizeTestComponent extends react_1.default.Component {
    render() {
        return R(AutoSizeComponent_1.default, { injectHeight: true }, (size) => {
            return R("div", { style: { height: size.height + 1, backgroundColor: "#FDF" } }, JSON.stringify(size));
        });
    }
}
class ToggleTestComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: "keep"
        };
    }
    render() {
        return R(ui.Toggle, {
            value: this.state.action,
            options: [
                { value: "keep", label: "Keep" },
                { value: "merge", label: "Merge" },
                { value: "nd", label: "Not duplicate" },
                { value: "ignore", label: "Ignore" }
            ],
            onChange: (action) => {
                console.log(action);
                return this.setState({ action });
            },
            size: "xs"
        });
    }
}
// allowReset: true
class ReorderDemo extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["red", "green", "blue"]
        };
    }
    render() {
        return R(ReorderableListComponent_1.default, {
            items: this.state.items,
            onReorder: (items) => this.setState({ items }),
            // function which renders the item, gets passed the current item and react dnd connectors
            // signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
            renderItem: (item, index, connectDragSource, connectDragPreview, connectDropTarget) => {
                return connectDragSource(connectDragPreview(connectDropTarget(R("div", null, item))));
            },
            getItemId: (item) => item
        });
    }
}
const ReorderDemoWrapped = react_dnd_1.DragDropContext(react_dnd_html5_backend_1.default)(ReorderDemo);
// Wait for DOM to load
$(function () {
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
    const elem = R(GanttChartDemo_1.GanttChartDemo);
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
    return react_dom_1.default.render(elem, document.getElementById("main"));
});
//  elem = R ModalPopupComponent, { header: "OUTER", size: "large", trigger: R('button', null, "Open Modal") },
//    R ModalPopupComponent, { header: "INNER", trigger: R('a', null, "Open Modal") },
//      R ModalPopupComponent, { header: "INNER-1" , size: "small", trigger: R('button', null, "Open Modal")},
//        R ModalPopupComponent, { header: "INNER-2", size: "large", trigger: R('a', null, "Open Modal") },
//          "The last modal"
//  elem = R ModalSample
