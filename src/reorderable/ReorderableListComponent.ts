import _ from "lodash"
import React, { ReactElement, ReactNode } from "react"
import uuid from "uuid"
import ReorderableListItemComponent from "./ReorderableListItemComponent"
const R = React.createElement

export interface ReorderableListComponentProps<T> {
  /** items to be reordered */
  items: T[]

  /** callback function, called when an item is dropped, gets passed the reordered item list */
  onReorder: (items: T[]) => void

  /** function which renders the item, gets passed the current item and react dnd connectors
   * signature: function(item, index, connectDragSource, connectDragPreview, connectDropTarget) */
  renderItem: (
    item: T,
    index: number,
    connectDragSource: (node: ReactNode) => ReactNode,
    connectDragPreview: (node: ReactNode) => ReactNode,
    connectDropTarget: (node: ReactNode) => ReactNode
  ) => ReactNode

  /** function which should return the identifier of the current item, gets passed the current item. Used for key. Optional */
  getItemId?: (item: T, index: number) => any

  /** a unique id for the list */
  listId?: string

  /** the element to render this component as. Default is div */
  element?: ReactElement
}

interface ReorderableListComponentState {
  order: number[] | null
  listId: string
}

/** Reorderable component for nested items
 * Currently supports reordering within the same list */
export default class ReorderableListComponent<T> extends React.Component<ReorderableListComponentProps<T>, ReorderableListComponentState> {
  static defaultProps = { element: R("div", null) }

  constructor(props: any) {
    super(props)

    this.state = {
      order: null, // Ordered list of ids. Only present when dragging
      listId: this.props.listId ? this.props.listId : uuid()
    }
  }

  componentDidUpdate(prevProps: Readonly<ReorderableListComponentProps<T>>, prevState: Readonly<ReorderableListComponentState>): void {
    // Reset if props changed
    if (this.props.items != prevProps.items) {
      this.setState({ order: null })
    }
  }

  // Put beforeId right before id
  handlePutBefore = (id: number, beforeId: number) => {
    let order = _.map(this.props.items, (item, index) => index)

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
  handlePutAfter = (id: number, afterId: number) => {
    let order = _.map(this.props.items, (item, index) => index)
    // let order = _.map(this.props.items, (item) => this.props.getItemId(item))

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
  fixOrder = (items: T[], order: number[] | null) => {
    if (!order) {
      return items
    }

    return order.map(o => items[o])
  }

  render() {
    let items = this.props.items.slice()
    items = this.fixOrder(items, this.state.order)

    return React.cloneElement(
      this.props.element!,
      {},
      _.map(items, (item, index) => {
        return R(ReorderableListItemComponent, {
          key: this.props.getItemId ? this.props.getItemId(item, index) : index,
          item,
          index,
          renderItem: this.props.renderItem,
          constrainTo: this.state.listId,
          getItemId: () => index,
          onPutAfter: this.handlePutAfter,
          onPutBefore: this.handlePutBefore,
          onEndDrag: this.handleEndDrag
        })
      })
    )
  }
}
