var   assert = require('assert'),
      vows = require('vows'),
      truth = true;
      
vows.describe('Test').addBatch({
  'Truth': {
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