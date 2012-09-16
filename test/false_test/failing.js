var   assert = require('assert'),
      vows = require('vows'),
      truth = true;


vows.describe('Test').addBatch({
  'Truth': {
    topic : truth,
    'is false' : function(topic){
      assert.isFalse(topic);
    }
  }
}).export(module);