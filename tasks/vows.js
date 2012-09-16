/*
 * grunt-vows
 * https://github.com/lukaszfiszer/grunt-vows
 *
 * Copyright (c) 2012 Lukasz Fiszer
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('vows', 'Run Vows unit tests', function() {
    var done = this.async();

    grunt.helper('vows', grunt.config('vows'), function(err) {
      if (err) {
        return done(false);
      }
      return done(true);
    });

  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('vows', function(options, callback) {

    var defaults = {
      cmd : 'vows',
      reporter : 'dot-matrix',
      files : "test/*",
      params : ''
    },
    execCmd = '',
    res = '',
    err = false,
    opts = options || {};

    // detect broken test from result string
    function hasBrokenTests (data) {
      var regexp = new RegExp("\\d broken|not ok \\d|vows.event.broken|\"status\":\"broken\"");
      return regexp.test(data);
    }

    function isOK(data){
      var regexp = new RegExp("OK");
      return regexp.test(data);
    }

    // set defaults
    for(var opt in defaults){
      if(!opts[opt] || opts[opt].length === 0){
        opts[opt] = defaults[opt];
      }
    }

    // convert files Array to a string
    if(Array.isArray(opts.files)){
      opts.files = opts.files.join(' ');
    }

    // construct the command to execute
    execCmd = opts.cmd + " " + opts.files + " --"+opts.reporter + " "+opts.params;

    // execute the comma,d
    var vows = require('child_process').exec(execCmd);

    vows.stdout.on('data', function (data) {
      if(isOK(data)){
        grunt.log.ok(data.toString());
      }else{
        grunt.log.write(data.toString());
      }
      res += data;
    });

    vows.stderr.on('data', function (data) {
      grunt.verbose.error(data.toString());
      err = true;
      res += data;
    });

    vows.on('exit', function (code) {

      if (code === 127) {
        grunt.log.error(
          'Command ' + opts.cmd +' not found!\n'+
          'Please install vows globally:\n' +
          'npm install -g vows'
        );
        grunt.fail.fatal('Vows task failed.', code);
      }
      if(hasBrokenTests(res)){
        err = true;
      }
      return callback(err, res);
    });

  });

};
