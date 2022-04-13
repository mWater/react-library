"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStableCallback = void 0;
const react_1 = require("react");
/** Makes a callback into a stable function that does not change
 * between renders but is always up to date.
 * See https://thoughtspile.github.io/2021/04/07/better-usecallback/
 */
function useStableCallback(callback) {
    const callbackRef = react_1.useRef(callback);
    react_1.useLayoutEffect(() => {
        callbackRef.current = callback;
    });
    const wrappedCallback = function (...args) {
        return callbackRef.current.apply(this, args);
    };
    return react_1.useCallback(wrappedCallback, []);
}
exports.useStableCallback = useStableCallback;
