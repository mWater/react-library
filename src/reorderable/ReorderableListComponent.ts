// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
import uuid from "uuid"
const R = React.createElement
import ReorderableListItemComponent from "./ReorderableListItemComponent"

interface ReorderableListComponentProps {
  /** items to be reordered */
  items: any
  /** callback function, called when an item is dropped, gets passed the reordered item list */
  onReorder: any
  /** function which renders the item, gets passed the current item and react dnd connectors */
  renderItem: any
  /** a uniqid for the list */
  listId?: string
  /** function which should return the identifier of the current item, gets passed the current item */
  getItemId: any
  element?: any
}

interface ReorderableListComponentState {
  order: any
  listId: any
}

// Reorderable component for nested items
// Currently supports reordering within the same list
class ReorderableListComponent extends React.Component<ReorderableListComponentProps, ReorderableListComponentState> {
  static defaultProps = { element: R("div", null) }

  constructor(props: any) {
    super(props)

    this.state = {
      order: null, // Ordered list of ids. Only present when dragging
      listId: this.props.listId ? this.props.listId : uuid()
    }
  }

  componentWillReceiveProps(nextProps: any) {
    const newOrder = _.map(nextProps.items, (item) => this.props.getItemId(item))
    const oldOrder = _.map(this.props.items, (item) => this.props.getItemId(item))

    // If order changed, reset order
    if (!_.isEqual(newOrder, oldOrder)) {
      this.setState({ order: null })
    }

    return this.setState({ listId: nextProps.listId ? nextProps.listId : uuid() })
  }

  // Put beforeId right before id
  handlePutBefore = (id: any, beforeId: any) => {
    let order = _.map(this.props.items, (item) => this.props.getItemId(item))

    // Remove beforeId and splice in
    order = _.without(order, beforeId)
    const index = order.indexOf(id)
    order.splice(index, 0, beforeId)

    // Set state if different
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({ order })
    }
  }

  // Put afterId right after id
  handlePutAfter = (id: any, afterId: any) => {
    let order = _.map(this.props.items, (item) => this.props.getItemId(item))

    // Remove afterId and splice in
    order = _.without(order, afterId)
    const index = order.indexOf(id)
    order.splice(index + 1, 0, afterId)

    // Set state if different
    if (!_.isEqual(order, this.state.order)) {
      return this.setState({ order })
    }
  }

  handleEndDrag = () => {
    if (!this.state.order) {
      return
    }

    const order = this.state.order.slice()
    this.setState({ order: null })
    return this.props.onReorder(this.fixOrder(this.props.items.slice(), order))
  }

  // Re-arrange items to match the order of order (list of ids)
  // If order is null, return list
  fixOrder = (items: any, order: any) => {
    if (!order) {
      return items
    }

    return items.sort((left: any, right: any) => {
      if (order.indexOf(this.props.getItemId(left)) < order.indexOf(this.props.getItemId(right))) {
        return -1
      }
      if (order.indexOf(this.props.getItemId(left)) > order.indexOf(this.props.getItemId(right))) {
        return 1
      }
      return 0
    })
  }

  render() {
    const items = this.props.items.slice()
    this.fixOrder(items, this.state.order)

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
        })
      })
    )
  }
}

export default ReorderableListComponent
