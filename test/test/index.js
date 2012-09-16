var   assert = require('assert'),
      vows = require('vows'),
      truth = true;

vows.describe('A test suite').addBatch({
  'Some Test Suite': {
    topic : truth,
    'should be true' : function(topic){
      assert.isTrue(topic);
    },
    'should not be null' : function(topic) {
      assert.isNotNull(topic);
    },
    'should be boolean': function(topic) {
      assert.isBoolean(topic);
    }
  }
}).export(module);