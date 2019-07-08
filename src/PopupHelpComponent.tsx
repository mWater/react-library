import React from 'react'
import ModalPopupComponent from './ModalPopupComponent';

/** Shows a popup when help icon is clicked. Needs bootstrap */
export default class PopoverHelpComponent extends React.Component<{}, { open: boolean }> {
  constructor(props: {}) {
    super(props)

    this.state = { open: false }
  }

  handleOpen = () => { this.setState({ open: true }) }
  handleClose = () => { this.setState({ open: false }) }

  render() {
    return <div style={{ display: "inline-block"}}>
      { this.state.open ?
        <ModalPopupComponent showCloseX={true} onClose={this.handleClose} size="large">
          { this.props.children }
        </ModalPopupComponent>
      : null}
      <i className="text-muted fa fa-question-circle" style={{ cursor: "pointer" }} onClick={this.handleOpen}/>
    </div>
  }
}
