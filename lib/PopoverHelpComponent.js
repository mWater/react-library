"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const R = react_1.default.createElement;
const Popover_1 = __importDefault(require("react-bootstrap/lib/Popover"));
const OverlayTrigger_1 = __importDefault(require("react-bootstrap/lib/OverlayTrigger"));
/** Shows a popover when help icon is clicked. Needs bootstrap */
class PopoverHelpComponent extends react_1.default.Component {
    render() {
        return R(OverlayTrigger_1.default, {
            trigger: this.props.trigger === "hover" ? ["hover", "focus"] : ["click"],
            placement: this.props.placement,
            overlay: R(Popover_1.default, null, this.props.children)
        }, this.props.content
            ? this.props.content
            : R("span", { className: "text-muted", style: { cursor: "pointer" } }, R("i", { className: "fa fa-question-circle" })));
    }
}
exports.default = PopoverHelpComponent;
PopoverHelpComponent.defaultProps = {
    placement: "top",
    trigger: "hover"
};
