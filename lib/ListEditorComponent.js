"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEditorComponent = void 0;
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
var ActionCancelModalComponent_1 = __importDefault(require("./ActionCancelModalComponent"));
var ReorderableListComponent_1 = __importDefault(require("./reorderable/ReorderableListComponent"));
/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup if present
 */
function ListEditorComponent(props) {
    var _a = react_1.useState(), adding = _a[0], setAdding = _a[1];
    var _b = react_1.useState(), editing = _b[0], setEditing = _b[1];
    var _c = react_1.useState(), editingIndex = _c[0], setEditingIndex = _c[1];
    var handleAdd = function () {
        if (props.renderEditor != null) {
            setAdding(props.createNew());
        }
        else {
            props.onItemsChange(props.items.concat(props.createNew()));
        }
    };
    var handleDelete = function (index, ev) {
        ev.stopPropagation();
        ev.preventDefault();
        // Confirm deletion
        if (props.deleteConfirmPrompt && !confirm(props.deleteConfirmPrompt)) {
            return;
        }
        var items = props.items.slice();
        items.splice(index, 1);
        props.onItemsChange(items);
    };
    /** Render as an li element */
    var renderListItem = function (item, index) {
        return react_2.default.createElement("li", { className: "list-group-item", onClick: function () {
                if (props.renderEditor != null) {
                    setEditing(item);
                    setEditingIndex(index);
                }
            }, key: index },
            react_2.default.createElement("a", { className: "btn btn-link btn-xs", onClick: handleDelete.bind(null, index), style: { float: "right", cursor: "pointer" } },
                react_2.default.createElement("i", { className: "fa fa-remove" })),
            props.renderItem(item, index));
    };
    /** Render as an li element */
    var renderDraggableListItem = function (item, index, connectDragSource, connectDragPreview, connectDropTarget) {
        var elem = renderListItem(item, index);
        elem = connectDragSource(elem);
        elem = connectDragPreview(elem);
        elem = connectDropTarget(elem);
        return elem;
    };
    return react_2.default.createElement("div", null,
        adding && props.renderEditor != null ?
            react_2.default.createElement(ActionCancelModalComponent_1.default, { actionLabel: "Add", onCancel: function () { return setAdding(undefined); }, onAction: function () {
                    if (!props.validateItem(adding)) {
                        return;
                    }
                    props.onItemsChange(props.items.concat([adding]));
                    setAdding(undefined);
                } }, props.renderEditor(adding, setAdding))
            : null,
        editing != null && props.renderEditor != null ?
            react_2.default.createElement(ActionCancelModalComponent_1.default, { size: "large", onCancel: function () { return setEditing(undefined); }, onAction: function () {
                    if (!props.validateItem(editing)) {
                        return;
                    }
                    var items = props.items.slice();
                    items.splice(editingIndex, 1, editing);
                    props.onItemsChange(items);
                    setEditing(undefined);
                } }, props.renderEditor(editing, setEditing))
            : null,
        props.getReorderableKey ?
            react_2.default.createElement(ReorderableListComponent_1.default, { items: props.items, getItemId: props.getReorderableKey, onReorder: props.onItemsChange, renderItem: renderDraggableListItem, element: react_2.default.createElement("ul", { className: "list-group" }) })
            :
                react_2.default.createElement("ul", { className: "list-group" }, props.items.map(renderListItem)),
        props.createNew ?
            react_2.default.createElement("div", { key: "add" },
                react_2.default.createElement("button", { type: "button", className: "btn btn-link", onClick: handleAdd },
                    react_2.default.createElement("i", { className: "fa fa-plus" }),
                    " ",
                    props.addLabel || "Add"))
            : null);
}
exports.ListEditorComponent = ListEditorComponent;
