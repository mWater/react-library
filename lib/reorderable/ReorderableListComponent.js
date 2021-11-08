"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const uuid_1 = __importDefault(require("uuid"));
const ReorderableListItemComponent_1 = __importDefault(require("./ReorderableListItemComponent"));
const R = react_1.default.createElement;
/** Reorderable component for nested items
 * Currently supports reordering within the same list */
class ReorderableListComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        // Put beforeId right before id
        this.handlePutBefore = (id, beforeId) => {
            let order = lodash_1.default.map(this.props.items, (item) => this.props.getItemId(item));
            // Remove beforeId and splice in
            order = lodash_1.default.without(order, beforeId);
            const index = order.indexOf(id);
            order.splice(index, 0, beforeId);
            // Set state if different
            if (!lodash_1.default.isEqual(order, this.state.order)) {
                return this.setState({ order });
            }
        };
        // Put afterId right after id
        this.handlePutAfter = (id, afterId) => {
            let order = lodash_1.default.map(this.props.items, (item) => this.props.getItemId(item));
            // Remove afterId and splice in
            order = lodash_1.default.without(order, afterId);
            const index = order.indexOf(id);
            order.splice(index + 1, 0, afterId);
            // Set state if different
            if (!lodash_1.default.isEqual(order, this.state.order)) {
                return this.setState({ order });
            }
        };
        this.handleEndDrag = () => {
            if (!this.state.order) {
                return;
            }
            const order = this.state.order.slice();
            this.setState({ order: null });
            return this.props.onReorder(this.fixOrder(this.props.items.slice(), order));
        };
        // Re-arrange items to match the order of order (list of ids)
        // If order is null, return list
        this.fixOrder = (items, order) => {
            if (!order) {
                return items;
            }
            return items.sort((left, right) => {
                if (order.indexOf(this.props.getItemId(left)) < order.indexOf(this.props.getItemId(right))) {
                    return -1;
                }
                if (order.indexOf(this.props.getItemId(left)) > order.indexOf(this.props.getItemId(right))) {
                    return 1;
                }
                return 0;
            });
        };
        this.state = {
            order: null,
            listId: this.props.listId ? this.props.listId : uuid_1.default()
        };
    }
    componentWillReceiveProps(nextProps) {
        const newOrder = lodash_1.default.map(nextProps.items, (item) => this.props.getItemId(item));
        const oldOrder = lodash_1.default.map(this.props.items, (item) => this.props.getItemId(item));
        // If order changed, reset order
        if (!lodash_1.default.isEqual(newOrder, oldOrder)) {
            this.setState({ order: null });
        }
        return this.setState({ listId: nextProps.listId ? nextProps.listId : uuid_1.default() });
    }
    render() {
        const items = this.props.items.slice();
        this.fixOrder(items, this.state.order);
        return react_1.default.cloneElement(this.props.element, {}, lodash_1.default.map(items, (item, index) => {
            return R(ReorderableListItemComponent_1.default, {
                key: this.props.getItemId(item),
                item,
                index,
                renderItem: this.props.renderItem,
                constrainTo: this.state.listId,
                getItemId: this.props.getItemId,
                onPutAfter: this.handlePutAfter,
                onPutBefore: this.handlePutBefore,
                onEndDrag: this.handleEndDrag
            });
        }));
    }
}
exports.default = ReorderableListComponent;
ReorderableListComponent.defaultProps = { element: R("div", null) };
