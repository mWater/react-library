"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const object_path_immutable_1 = __importDefault(require("object-path-immutable"));
// Versatile update function for updating react props that are immutable
// Creates an update function for a React component
// The resulting function can be called three ways:
//  1) updt({ a: 5, b: 6 }) <- merges into value
//  2) updt("propname") <- creates a function that updates the property with the value when called
//  3) updt("propname", value) <- Updates propname with value
function default_1(value, onChange, args) {
    // If key is object, merge into value
    let newValue;
    if (lodash_1.default.isObject(args[0]) && !lodash_1.default.isArray(args[0])) {
        newValue = lodash_1.default.extend({}, value, args[0]);
        return onChange(newValue);
    }
    // If only key, create update function that uses object-path-immutable
    if (args.length === 1) {
        return function (v) {
            newValue = object_path_immutable_1.default.set(value, args[0], v);
            return onChange(newValue);
        };
    }
    else if (args.length === 2) {
        newValue = object_path_immutable_1.default.set(value, args[0], args[1]);
        return onChange(newValue);
    }
}
exports.default = default_1;
