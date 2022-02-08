"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEditorComponent = void 0;
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ActionCancelModalComponent_1 = __importDefault(require("./ActionCancelModalComponent"));
const ReorderableListComponent_1 = __importDefault(require("./reorderable/ReorderableListComponent"));
/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup if present
 */
function ListEditorComponent(props) {
    const [adding, setAdding] = react_1.useState();
    const [editing, setEditing] = react_1.useState();
    const [editingIndex, setEditingIndex] = react_1.useState();
    const handleAdd = (ev) => {
        ev.stopPropagation();
        if (props.renderEditor != null) {
            setAdding(props.createNew());
        }
        else {
            props.onItemsChange(props.items.concat(props.createNew()));
        }
    };
    const handleDelete = (index, ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        // Confirm deletion
        if (props.deleteConfirmPrompt && !confirm(props.deleteConfirmPrompt)) {
            return;
        }
        const items = props.items.slice();
        items.splice(index, 1);
        props.onItemsChange(items);
    };
    /** Render as an li element */
    const renderListItem = (item, index) => {
        const handleChange = (value) => {
            const items = props.items.slice();
            items[index] = value;
            props.onItemsChange(items);
        };
        const handleClick = () => {
            if (props.renderEditor != null) {
                setEditing(item);
                setEditingIndex(index);
            }
        };
        return (react_2.default.createElement("li", { className: "list-group-item", onClick: props.editLink ? undefined : handleClick, key: index },
            react_2.default.createElement("a", { onClick: handleDelete.bind(null, index), style: { float: "right", cursor: "pointer", color: "var(--bs-primary)" } },
                react_2.default.createElement("i", { className: "fa fa-remove" })),
            props.editLink && props.renderEditor != null ? (react_2.default.createElement("a", { onClick: handleClick, style: { float: "right", cursor: "pointer", color: "var(--bs-primary)" } },
                react_2.default.createElement("i", { className: "fa fa-pencil" }))) : null,
            props.renderItem(item, index, handleChange)));
    };
    /** Render as an li element */
    const renderDraggableListItem = (item, index, connectDragSource, connectDragPreview, connectDropTarget) => {
        let elem = renderListItem(item, index);
        elem = connectDragSource(elem);
        elem = connectDragPreview(elem);
        elem = connectDropTarget(elem);
        return elem;
    };
    return (react_2.default.createElement("div", null,
        adding && props.renderEditor != null ? (react_2.default.createElement(ActionCancelModalComponent_1.default, { size: "large", actionLabel: "Add", onCancel: () => setAdding(undefined), onAction: () => {
                if (props.validateItem != null && !props.validateItem(adding)) {
                    return;
                }
                props.onItemsChange(props.items.concat([adding]));
                setAdding(undefined);
            } }, props.renderEditor(adding, setAdding))) : null,
        editing != null && props.renderEditor != null ? (react_2.default.createElement(ActionCancelModalComponent_1.default, { size: "large", onCancel: () => setEditing(undefined), onAction: () => {
                if (props.validateItem != null && !props.validateItem(editing)) {
                    return;
                }
                const items = props.items.slice();
                items.splice(editingIndex, 1, editing);
                props.onItemsChange(items);
                setEditing(undefined);
            } }, props.renderEditor(editing, setEditing))) : null,
        props.getReorderableKey ? (react_2.default.createElement(ReorderableListComponent_1.default, { items: props.items, getItemId: props.getReorderableKey, onReorder: props.onItemsChange, renderItem: renderDraggableListItem, element: react_2.default.createElement("ul", { className: "list-group" }) })) : (react_2.default.createElement("ul", { className: "list-group" }, props.items.map(renderListItem))),
        props.createNew ? (react_2.default.createElement("div", { key: "add" },
            react_2.default.createElement("button", { type: "button", className: "btn btn-link", onClick: handleAdd },
                react_2.default.createElement("i", { className: "fa fa-plus" }),
                " ",
                props.addLabel || "Add"))) : null));
}
exports.ListEditorComponent = ListEditorComponent;
