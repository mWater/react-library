"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEditorComponent = void 0;
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
var ActionCancelModalComponent_1 = __importDefault(require("./ActionCancelModalComponent"));
/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup
 */
function ListEditorComponent(props) {
    var _a = react_1.useState(), adding = _a[0], setAdding = _a[1];
    var _b = react_1.useState(), editing = _b[0], setEditing = _b[1];
    var _c = react_1.useState(), editingIndex = _c[0], setEditingIndex = _c[1];
    var handleAdd = function () {
        setAdding(props.createNew());
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
    var itemNodes = props.items.map(function (item, index) { return (react_2.default.createElement("li", { className: "list-group-item", onClick: function () {
            setEditing(item);
            setEditingIndex(index);
        }, key: index },
        react_2.default.createElement("a", { className: "btn btn-link btn-xs", onClick: handleDelete.bind(null, index), style: { float: "right", cursor: "pointer" } },
            react_2.default.createElement("i", { className: "fa fa-remove" })),
        props.renderItem(item, index))); });
    return react_2.default.createElement("div", null,
        adding ?
            react_2.default.createElement(ActionCancelModalComponent_1.default, { actionLabel: "Add", onCancel: function () { return setAdding(undefined); }, onAction: function () {
                    if (!props.validateItem(adding)) {
                        return;
                    }
                    props.onItemsChange(props.items.concat([adding]));
                    setAdding(undefined);
                } }, props.renderEditor(adding, setAdding))
            : null,
        editing != null ?
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
        react_2.default.createElement("ul", { className: "list-group" }, itemNodes),
        props.createNew ?
            react_2.default.createElement("div", { key: "add" },
                react_2.default.createElement("button", { type: "button", className: "btn btn-link", onClick: handleAdd },
                    react_2.default.createElement("i", { className: "fa fa-plus" }),
                    " ",
                    props.addLabel || "Add"))
            : null);
}
exports.ListEditorComponent = ListEditorComponent;
