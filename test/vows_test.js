var grunt = require('grunt'),
    assert = require('assert'),
    vows = require('vows'),
    hooker = require('hooker'),
    testDir = 'test/';

// load the helper manually
grunt.loadTasks('tasks');

// set the base, so that test files are read from test/test
grunt.file.setBase('test/');

// disables grunt output
hooker.hook(grunt.log, "write", {
  pre: function() {
    return hooker.preempt();
  }
});

vows.describe('Grunt Vows Tak').addBatch({
  
  'When run with no arguments' : {
    topic: function(){
      grunt.helper('vows', null, this.callback);
    },
    'returns no error' : function(err, res){
      assert.isNull(err);
    },
    'returns results of all test inside test/ ' : function(err, res) {
      assert.include(res,"OK » 8 honored");
    }
  },

  'Parse "files" option correctly' : {
    'when it is a string' : {
      topic: function() {
        grunt.helper('vows', {
          files: 'test/index.js'
        }, this.callback);
      },
      'tests one file' : function(err, res) {
        assert.include(res,"OK » 3 honored");
      }
    },
    'when it is an array' : {
      topic: function() {
        grunt.helper('vows', {
          files: ['test/index_another.js', 'test/index.js']
        }, this.callback);
      },
      'tests all files indicated by the array' : function(err, res){
        assert.include(res, "5 honored");
      }
    },
    'when contains an asterix' : {
      topic : function(){
        grunt.helper('vows', {
          files: 'test/i*.js'
        }, this.callback);
      },
      'tests all files matched by asterix' : function(err, res){
        assert.include(res, "5 honored");
      }
    }
  },
  'Running a broken test' : {
    topic : function() {
      grunt.helper('vows', {
        files: 'false_test/failing.js'
      }, this.callback);
    },
    'returns an error' : function(err, res){
      assert.isTrue(err);
    },
    'constains info about broken test' : function(err, res) {
      assert.include(res, 'Broken');
    }
    
  }

}).export(module);
