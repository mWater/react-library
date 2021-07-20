"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ModalPopupComponent_1 = __importDefault(require("./ModalPopupComponent"));
/** Shows a popup when help icon is clicked. Needs bootstrap */
class PopoverHelpComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleOpen = () => {
            this.setState({ open: true });
        };
        this.handleClose = () => {
            this.setState({ open: false });
        };
        this.state = { open: false };
    }
    render() {
        return (react_1.default.createElement("div", { style: { display: "inline-block" } },
            this.state.open ? (react_1.default.createElement(ModalPopupComponent_1.default, { showCloseX: true, onClose: this.handleClose, size: "large" }, this.props.children)) : null,
            react_1.default.createElement("i", { className: "text-muted fa fa-question-circle", style: { cursor: "pointer" }, onClick: this.handleOpen })));
    }
}
exports.default = PopoverHelpComponent;
