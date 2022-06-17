"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePanel = exports.Toggle = exports.NavPills = exports.CollapsibleSection = exports.NumberInput = exports.TextInput = exports.Select = exports.Radio = exports.Checkbox = exports.FormGroup = exports.Icon = exports.Button = exports.Spinner = void 0;
const lodash_1 = __importDefault(require("lodash"));
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const R = react_1.default.createElement;
// Bootstrap components
/** Simple spinner */
function Spinner() {
    return R("i", { className: "fa fa-spinner fa-spin" });
}
exports.Spinner = Spinner;
/** Standard button */
class Button extends react_1.default.Component {
    render() {
        const type = this.props.type == "default" ? "secondary" : this.props.type;
        const size = this.props.size == "xs" ? "sm" : this.props.size;
        return R("button", {
            type: "button",
            className: (0, classnames_1.default)("btn", `btn-${type}`, { active: this.props.active }, { [`btn-${size}`]: this.props.size != null }),
            onClick: this.props.onClick,
            disabled: this.props.disabled
        }, this.props.children);
    }
}
exports.Button = Button;
Button.defaultProps = { type: "secondary" };
/** Icon, font-awesome v4 */
class Icon extends react_1.default.Component {
    render() {
        if (this.props.id.match(/^fa-/)) {
            return R("i", { className: `fa ${this.props.id}` });
        }
        else {
            return null;
        }
    }
}
exports.Icon = Icon;
/** Indented form group with a label, optional help text. Label and indented contents */
class FormGroup extends react_1.default.Component {
    render() {
        return R("div", { className: "mb-3" }, R("label", { key: "label" }, this.props.labelMuted ? R("span", { className: "text-muted" }, this.props.label) : this.props.label, this.props.hint
            ? R("span", { className: "text-muted", style: { fontWeight: this.props.label ? "normal" : undefined } }, this.props.label ? " - " : undefined, this.props.hint)
            : undefined), R("div", { key: "contents", style: { marginLeft: 5 } }, this.props.children), this.props.help
            ? R("p", { key: "help", className: "form-text text-muted", style: { marginLeft: 5 } }, this.props.help)
            : undefined);
    }
}
exports.FormGroup = FormGroup;
/** Unique id sequence for making ids of elements in checkbox + radio */
let uniqueId = 0;
class Checkbox extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleChange = (ev) => {
            if (this.props.nullForFalse) {
                return this.props.onChange(ev.target.checked || null);
            }
            else {
                return this.props.onChange(ev.target.checked);
            }
        };
        this.id = `id_${uniqueId}`;
        uniqueId += 1;
    }
    render() {
        if (this.props.inline) {
            return R("div", { className: "form-check form-check-inline" }, R("input", {
                type: "checkbox",
                id: this.id,
                disabled: this.props.disabled,
                className: "form-check-input",
                checked: this.props.value || false,
                onChange: this.props.onChange ? this.handleChange : undefined
            }), R("label", { className: "form-check-label", htmlFor: this.id }, this.props.children));
        }
        else {
            return R("div", { className: "form-check" }, R("input", {
                type: "checkbox",
                id: this.id,
                disabled: this.props.disabled,
                className: "form-check-input",
                checked: this.props.value || false,
                onChange: this.props.onChange ? this.handleChange : undefined
            }), R("label", { className: "form-check-label", htmlFor: this.id }, this.props.children));
        }
    }
}
exports.Checkbox = Checkbox;
class Radio extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.id = `id_${uniqueId}`;
        uniqueId += 1;
    }
    render() {
        if (this.props.inline) {
            return R("div", { className: "form-check form-check-inline" }, R("input", {
                type: "radio",
                className: "form-check-input",
                id: this.id,
                disabled: this.props.disabled,
                checked: this.props.value === this.props.radioValue,
                onChange() { },
                onClick: this.props.onChange ? (ev) => this.props.onChange(this.props.radioValue) : undefined
            }), R("label", { className: "form-check-label", htmlFor: this.id }, this.props.children));
        }
        else {
            return R("div", { className: "form-check" }, R("input", {
                type: "radio",
                className: "form-check-input",
                id: this.id,
                disabled: this.props.disabled,
                checked: this.props.value === this.props.radioValue,
                onChange() { },
                onClick: this.props.onChange ? (ev) => this.props.onChange(this.props.radioValue) : undefined
            }), R("label", { className: "form-check-label", htmlFor: this.id }, this.props.children));
        }
    }
}
exports.Radio = Radio;
/** Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
 * all work as possible options.*/
class Select extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (ev) => {
            const value = JSON.parse(ev.target.value);
            return this.props.onChange(value);
        };
    }
    render() {
        const options = this.props.options.slice();
        if (this.props.nullLabel != null) {
            options.unshift({ value: null, label: this.props.nullLabel });
        }
        let style = {};
        if (this.props.inline) {
            style = { width: "auto", display: "inline-block" };
        }
        lodash_1.default.extend(style, this.props.style || {});
        return R("select", {
            style,
            disabled: this.props.onChange == null,
            className: (0, classnames_1.default)("form-select", { "form-select-sm": this.props.size === "sm" }, { "form-select-lg": this.props.size === "lg" }),
            value: JSON.stringify(this.props.value != null ? this.props.value : null),
            onChange: this.props.onChange ? this.handleChange : function () { }
        }, lodash_1.default.map(options, (option) => R("option", { key: JSON.stringify(option.value), value: JSON.stringify(option.value) }, option.label)));
    }
}
exports.Select = Select;
class TextInput extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (ev) => {
            let { value } = ev.target;
            if (this.props.emptyNull) {
                value = value || null;
            }
            return this.props.onChange(value);
        };
    }
    focus() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.focus();
    }
    render() {
        return R("input", {
            ref: (c) => {
                return (this.input = c);
            },
            type: "text",
            className: (0, classnames_1.default)("form-control", { "form-control-sm": this.props.size === "sm" }, { "form-control-lg": this.props.size === "lg" }),
            value: this.props.value || "",
            style: this.props.style,
            onChange: this.props.onChange ? this.handleChange : undefined,
            placeholder: this.props.placeholder,
            disabled: this.props.onChange == null
        });
    }
}
exports.TextInput = TextInput;
// Number input component that handles parsing and maintains state when number is invalid
class NumberInput extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = (ev) => {
            // When pressing ENTER or TAB
            if (ev.keyCode === 13) {
                // First parse value as if blur will be done
                this.handleBlur();
                if (this.props.onEnter) {
                    this.props.onEnter(ev);
                    ev.preventDefault();
                }
            }
            if (ev.keyCode === 9) {
                // First parse value as if blur will be done
                this.handleBlur();
                if (this.props.onTab) {
                    this.props.onTab(ev);
                    // It's important to prevent the default behavior when handling tabs (or else the tab is applied after the focus change)
                    return ev.preventDefault();
                }
            }
        };
        this.handleBlur = () => {
            var _a, _b;
            // Parse and set value if valid
            if (this.isValid()) {
                const val = this.getNumericValue();
                if (val !== this.props.value) {
                    return (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, val);
                }
            }
        };
        this.getNumericValue = () => {
            let val = this.props.decimal ? parseFloat(this.state.inputText) : parseInt(this.state.inputText);
            if (isNaN(val)) {
                return null;
            }
            else {
                // Round if necessary
                if (this.props.decimalPlaces != null) {
                    val = parseFloat(val.toFixed(this.props.decimalPlaces));
                }
            }
            return val;
        };
        // Parsing happens on blur
        this.state = {
            inputText: this.formatInput(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        // If different, override text
        if (nextProps.value !== this.props.value) {
            return this.setState({ inputText: this.formatInput(nextProps) });
        }
    }
    // Format the input based on props
    formatInput(props) {
        // Blank
        if (props.value == null) {
            return "";
        }
        // Integer
        if (!props.decimal) {
            return "" + Math.floor(props.value);
        }
        // Decimal
        if (props.decimalPlaces != null) {
            return props.value.toFixed(props.decimalPlaces);
        }
        return "" + props.value;
    }
    focus() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.focus();
    }
    // Check regex matching of numbers
    isValid() {
        let valid;
        if (this.state.inputText.length === 0) {
            return true;
        }
        if (this.props.decimal) {
            valid = this.state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) && !isNaN(parseFloat(this.state.inputText));
            if (!valid) {
                return false;
            }
        }
        else {
            valid = this.state.inputText.match(/^-?\d+$/);
            if (!valid) {
                return false;
            }
        }
        const val = this.getNumericValue();
        if (val && this.props.max != null && val > this.props.max) {
            return false;
        }
        if (val && this.props.min != null && val < this.props.min) {
            return false;
        }
        return true;
    }
    render() {
        // Display red border if not valid
        const style = lodash_1.default.clone(this.props.style || {});
        style.width = style.width || "8em";
        if (!this.isValid()) {
            style.borderColor = "#a94442";
            style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
            style.backgroundColor = "rgba(132, 53, 52, 0.12)"; // Faded red
        }
        let inputType = this.props.decimal ? "number" : "tel";
        // Special problem with Galaxy Tab 3V (SM-T116NU) missing decimal place
        if (this.props.decimal && navigator.userAgent.match(/SM-/)) {
            inputType = "text";
        }
        return R("input", {
            ref: (c) => {
                return (this.input = c);
            },
            type: inputType,
            className: `form-control ${this.props.size ? `form-control-${this.props.size}` : ""}`,
            lang: "en",
            style,
            value: this.state.inputText,
            onChange: this.props.onChange ? (ev) => this.setState({ inputText: ev.target.value }) : function () { },
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
            placeholder: this.props.placeholder,
            disabled: this.props.onChange == null
        });
    }
}
exports.NumberInput = NumberInput;
/** Indented section than can be opened and closed. Defaults closed */
class CollapsibleSection extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleToggle = () => {
            return this.setState({ open: !this.state.open });
        };
        this.state = {
            open: props.initiallyOpen || false
        };
    }
    render() {
        return R("div", { className: "mb-3" }, R("label", { key: "label", onClick: this.handleToggle, style: { cursor: "pointer" } }, this.state.open
            ? R("i", { className: `fa fa-fw fa-caret-down ${this.props.labelMuted ? "text-muted" : undefined}` })
            : R("i", { className: `fa fa-fw fa-caret-right ${this.props.labelMuted ? "text-muted" : undefined}` }), this.props.labelMuted ? R("span", { className: "text-muted" }, this.props.label) : this.props.label, this.props.hint
            ? R("span", { className: "text-muted", style: { fontWeight: this.props.label ? "normal" : undefined } }, this.props.label ? " - " : undefined, this.props.hint)
            : undefined), this.state.open ? R("div", { key: "contents", style: { marginLeft: 5 } }, this.props.children) : undefined);
    }
}
exports.CollapsibleSection = CollapsibleSection;
// Displays bootstrap pills with one active
class NavPills extends react_1.default.Component {
    render() {
        return R("ul", { className: "nav nav-pills" }, lodash_1.default.map(this.props.pills, (pill) => {
            return R("li", { key: pill.id, className: "nav-item" }, R("a", {
                href: pill.href,
                onClick: () => { var _a, _b; return (_b = (_a = this.props).onPillClick) === null || _b === void 0 ? void 0 : _b.call(_a, pill.id); },
                className: pill.id === this.props.activePill ? "nav-link active" : "nav-link"
            }, pill.label));
        }));
    }
}
exports.NavPills = NavPills;
/** Button toggle component */
class Toggle extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.renderOption = (option, index) => {
            const value = this.props.value === option.value && this.props.allowReset ? null : option.value;
            const btnClasses = (0, classnames_1.default)("btn", {
                "btn-outline-primary": !(this.props.value === option.value),
                "btn-primary": this.props.value === option.value,
                active: this.props.value === option.value
            });
            const props = {
                key: index,
                type: "button",
                className: btnClasses,
                // Wrapping creates awkward looking toggles
                style: { whiteSpace: "nowrap" }
            };
            if (!(this.props.value === option.value) || this.props.allowReset) {
                props["onClick"] = this.props.onChange ? this.props.onChange.bind(null, value) : null;
            }
            return R("button", props, option.label);
        };
    }
    render() {
        const size = this.props.size == "xs" ? "sm" : this.props.size;
        return R("div", { className: `btn-group ${size ? `btn-group-${size}` : ""}` }, lodash_1.default.map(this.props.options, this.renderOption));
    }
}
exports.Toggle = Toggle;
/** Panel that can be opened and closed */
function CollapsiblePanel(props) {
    const [open, setOpen] = (0, react_1.useState)(props.initiallyClosed ? false : true);
    return react_1.default.createElement("div", { className: "card mb-3" },
        react_1.default.createElement("div", { className: "card-header" },
            react_1.default.createElement("div", { style: { display: "inline-block", paddingRight: 5, color: "var(--bs-primary)", cursor: "pointer" }, onClick: () => setOpen((o) => !o) }, open ? react_1.default.createElement("i", { className: "fas fa-caret-down fa-fw" }) : react_1.default.createElement("i", { className: "fas fa-caret-right fa-fw" })),
            props.title,
            props.hint ? react_1.default.createElement("span", { className: "text-muted" },
                " - ",
                props.hint) : null),
        open ? react_1.default.createElement("div", { className: "card-body" }, props.children) : null);
}
exports.CollapsiblePanel = CollapsiblePanel;
