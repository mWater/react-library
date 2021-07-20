// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.

import { assert } from 'chai';
import update from '../src/update';

describe("update", function() {
  beforeEach(function() {
    this.newValue = null;

    this.value = { x: 1 };
    return this.onChange = newValue => { return this.newValue = newValue; };
  });

  it("updates using object", function() {
    update(this.value, this.onChange, [{ y: 2 }]);
    return assert.deepEqual(this.newValue, { x: 1, y: 2 });
});

  it("updates using function builder", function() {
    update(this.value, this.onChange, ["y"])(2);
    return assert.deepEqual(this.newValue, { x: 1, y: 2 });
});

  it("updates using path directly", function() {
    update(this.value, this.onChange, ["y", 2]);
    return assert.deepEqual(this.newValue, { x: 1, y: 2 });
});

  return it("updates using path directly", function() {
    update(this.value, this.onChange, ["y.z", 2]);
    return assert.deepEqual(this.newValue, { x: 1, y: { z: 2 } });
});
});
