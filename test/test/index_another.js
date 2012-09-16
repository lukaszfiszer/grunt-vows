var   assert = require('assert'),
      vows = require('vows'),
      lie = false;

vows.describe('Another test suite').addBatch({
  'A lie': {
    topic : lie,
    'should be false' : function(topic){
      assert.isFalse(topic);
    },
    'but should not be null' : function(topic) {
      assert.isNotNull(topic);
    }
  }
}).export(module);