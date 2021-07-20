"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
const react_dom_1 = __importDefault(require("react-dom"));
const react_dnd_1 = require("react-dnd");
const react_dnd_2 = require("react-dnd");
const itemTarget = {
    // Called when an item hovers over this component
    hover(props, monitor, component) {
        // Hovering over self does nothing
        const hoveringId = monitor.getItem().id;
        const myId = props.getItemId(props.item);
        if (hoveringId === myId) {
            return;
        }
        // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
        if (props.constrainTo !== monitor.getItem().constrainTo) {
            return;
        }
        const hoverBoundingRect = react_dom_1.default.findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        // Get position within hovered item
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // If is in top half, and is within the height of the dragged item
        if (hoverClientY < hoverMiddleY && hoverClientY < monitor.getItem().height) {
            // Put before
            props.onPutBefore(myId, hoveringId);
            return;
        }
        // If is in bottom half, and is within the height of the dragged item
        if (hoverClientY > hoverMiddleY && hoverClientY > hoverBoundingRect.height - monitor.getItem().height) {
            // Put before
            props.onPutAfter(myId, hoveringId);
            return;
        }
    },
    canDrop(props, monitor) {
        // If the list ID of the item being dragged is not the same as the list ID of current component, do nothing
        return props.constrainTo === monitor.getItem().constrainTo;
    }
};
function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver() && monitor.canDrop(),
        canDrop: monitor.canDrop()
    };
}
const itemSource = {
    beginDrag(props, monitor, component) {
        return {
            id: props.getItemId(props.item),
            constrainTo: props.constrainTo,
            // Save height of dragged component
            height: react_dom_1.default.findDOMNode(component).getBoundingClientRect().height
        };
    },
    isDragging(props, monitor) {
        return props.getItemId(props.item) === monitor.getItem().id;
    },
    endDrag(props, monitor, component) {
        return props.onEndDrag();
    }
};
function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}
class ReorderableListItemComponent extends react_1.default.Component {
    render() {
        return this.props.renderItem(this.props.item, this.props.index, this.props.connectDragSource, this.props.connectDragPreview, this.props.connectDropTarget);
    }
}
exports.default = lodash_1.default.flow(react_dnd_1.DragSource("form-item", itemSource, collectSource), react_dnd_2.DropTarget("form-item", itemTarget, collectTarget))(ReorderableListItemComponent);
