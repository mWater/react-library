// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import _ from "lodash"
import immutable from "object-path-immutable"

// Versatile update function for updating react props that are immutable
// Creates an update function for a React component
// The resulting function can be called three ways:
//  1) updt({ a: 5, b: 6 }) <- merges into value
//  2) updt("propname") <- creates a function that updates the property with the value when called
//  3) updt("propname", value) <- Updates propname with value
export default function (value: any, onChange: any, args: any) {
  // If key is object, merge into value
  let newValue
  if (_.isObject(args[0]) && !_.isArray(args[0])) {
    newValue = _.extend({}, value, args[0])
    return onChange(newValue)
  }

  // If only key, create update function that uses object-path-immutable
  if (args.length === 1) {
    return function (v: any) {
      newValue = immutable.set(value, args[0], v)
      return onChange(newValue)
    };
  } else if (args.length === 2) {
    newValue = immutable.set(value, args[0], args[1])
    return onChange(newValue)
  }
}
