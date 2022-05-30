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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const R = react_1.default.createElement;
/** React component that asynchronously loads something into state from the props
 * Handles the common case of wanting to load something but having to deal with the complexities
 * of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
 * To use, override isLoadNeeded to determine if a prop change requires a load
 * and load to perform load and call setState with callback value.
 * Sets state of loading to true/false appropriately (automatically part of state)
 * DO NOT call setState or reference props in load
 */
class AsyncLoadComponent extends react_1.Component {
    constructor(props) {
        super(props);
        /** Check if mid-loading */
        this.isLoading = () => {
            return this.state.loading;
        };
        this.state = {
            loading: false
        };
        // Keep track if mounted
        this._mounted = false;
        // Keep track of load number started and completed to ignore old ones
        this._loadSeqStarted = 0;
        this._loadSeqCompleted = 0;
    }
    /** Call to force load */
    forceLoad() {
        this._performLoad(this.props, this.props);
    }
    _performLoad(newProps, oldProps) {
        this._loadSeqStarted += 1;
        const seq = this._loadSeqStarted;
        // Create callback
        const callback = (state) => {
            // Check if unmounted
            if (!this._mounted) {
                return;
            }
            // Check if out of date
            if (seq < this._loadSeqCompleted) {
                return;
            }
            this._loadSeqCompleted = seq;
            // Apply state
            this.setState(state);
            // Check if latest
            if (seq === this._loadSeqStarted) {
                return this.setState({ loading: false });
            }
        };
        return this.setState({ loading: true }, () => {
            return this.load(newProps, oldProps, callback);
        });
    }
    componentWillMount() {
        this._mounted = true;
        return this._performLoad(this.props, {});
    }
    componentWillReceiveProps(nextProps) {
        if (this.isLoadNeeded(nextProps, this.props)) {
            return this._performLoad(nextProps, this.props);
        }
    }
    componentWillUnmount() {
        return (this._mounted = false);
    }
}
exports.default = AsyncLoadComponent;
