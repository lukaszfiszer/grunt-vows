# grunt-vows

A grunt task to run Vows tests.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-vows-test`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-vows-test');
```

By default, the task will test all  files located in `test/` folder.

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

As any other grunt task, grunt-vows can be configured by adding a `vows`
object to the `grunt.initConfig` method. There are 3 configuration options available here: 

```javascript
vows: {
  files: 'test/file.js', // a string or an array of files to be tested. Default: test/*.js
  reporter: 'dot-matrix|spec|tab', // one of Vows reporter to be used. Default: dot-matrix 
  params: '' // Any other parameter you want pass to Vows. Run 'vows --help' to see the full list.
}
```

Once you're done, you can just run the grunt task:

```javascript
grunt vows
```

It's highly recomended to change the grunt's default task, so it runs vows test every time you type `grunt`:

```javascript
grunt.registerTask('default', 'lint vows');
```

## Contributing
The plugin was created one Sunday afternoon, when I suprisingly couldn't find any grunt taks to let me run Vows test for my personal project.

Any feedback, bug report or, even better, a pull request is highly appreciated. Don't hesitate to contact me on GitHub or just ping me on Twitter [@lukaszfiszer](http://twitter.com/lukaszfiszer).

The plugin is auto testing, using ``grunt vows``. The test files is ``test\vows_test.js`` and use some sample test suites that can be found in sub-folders. When adding some new feature, please write a test for it!  

## Release History

* 2012/09/22 - 0.1.0 - Initial release 

## License
Copyright (c) 2012 Lukasz Fiszer  
Licensed under the MIT license.
