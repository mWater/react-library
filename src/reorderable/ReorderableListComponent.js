import PropTypes from 'prop-types';
import _ from 'lodash';
import React from 'react';
import uuid from 'uuid';
const R = React.createElement;
import ReorderableListItemComponent from "./ReorderableListItemComponent";

// Reorderable component for nested items
// Currently supports reordering within the same list
class ReorderableListComponent extends React.Component {
  static initClass() {
    this.propTypes = {
      items: PropTypes.array.isRequired, // items to be reordered
      onReorder: PropTypes.func.isRequired, // callback function, called when an item is dropped, gets passed the reordered item list
      // function which renders the item, gets passed the current item and react dnd connectors
      // signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget)
      renderItem: PropTypes.func.isRequired,
      listId: PropTypes.string, // a uniqid for the list
      getItemId: PropTypes.func.isRequired, // function which should return the identifier of the current item, gets passed the current item
      element: PropTypes.object
    };
  
    this.defaultProps =
      {element: R('div', null)};
     // the element to render this component as
  }

  constructor(props) {
    this.handlePutBefore = this.handlePutBefore.bind(this);
    this.handlePutAfter = this.handlePutAfter.bind(this);
    this.handleEndDrag = this.handleEndDrag.bind(this);
    this.fixOrder = this.fixOrder.bind(this);
    super(props);

    this.state = {
      order: null,   // Ordered list of ids. Only present when dragging
      listId: this.props.listId ? this.props.listId : uuid()
    };
  }

  componentWillReceiveProps(nextProps) {
    const newOrder = _.map(nextProps.items, item => this.props.getItemId(item));
    const oldOrder = _.map(this.props.items, item => this.props.getItemId(item));

    // If order changed, reset order
    if (!_.isEqual(newOrder, oldOrder)) {
      this.setState({order: null});
    }
      
    return this.setState({listId: nextProps.listId ? nextProps.listId : uuid()});
  }

  // Put beforeId right before id
  handlePutBefore(id, beforeId) {
    let order = _.map(this.props.items, item => this.props.getItemId(item));

    // Remove beforeId and splice in
    order = _.without(order, beforeId);
    const index = order.indexOf(id);
    order.splice(index, 0, beforeId);

    // Set state if different
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({order});
    }
  }

  // Put afterId right after id
  handlePutAfter(id, afterId) {
    let order = _.map(this.props.items, item => this.props.getItemId(item));

    // Remove afterId and splice in
    order = _.without(order, afterId);
    const index = order.indexOf(id);
    order.splice(index + 1, 0, afterId);

    // Set state if different
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({order});
    }
  }

  handleEndDrag() {
    if (!this.state.order) {
      return;
    }

    const order = this.state.order.slice();
    this.setState({order: null});
    return this.props.onReorder(this.fixOrder(this.props.items.slice(), order));
  }

  // Re-arrange items to match the order of order (list of ids)
  // If order is null, return list
  fixOrder(items, order) {
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
  }

  render() {
    const items = this.props.items.slice();
    this.fixOrder(items, this.state.order);

    return React.cloneElement(
      this.props.element,
      null,
      _.map(items, (item, index) => {
        return R(ReorderableListItemComponent, { 
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
    })
    );
  }
}
ReorderableListComponent.initClass();

export default ReorderableListComponent;