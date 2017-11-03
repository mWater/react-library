var _, immutable;

_ = require('lodash');

immutable = require('object-path-immutable');

module.exports = function(value, onChange, args) {
  var newValue;
  if (_.isObject(args[0]) && !_.isArray(args[0])) {
    newValue = _.extend({}, value, args[0]);
    return onChange(newValue);
  }
  if (args.length === 1) {
    return function(v) {
      newValue = immutable.set(value, args[0], v);
      return onChange(newValue);
    };
  } else if (args.length === 2) {
    newValue = immutable.set(value, args[0], args[1]);
    return onChange(newValue);
  }
};
