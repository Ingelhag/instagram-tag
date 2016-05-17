// Gruntfile.js
module.exports = function(grunt) {

   // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    injector: 'grunt-asset-injector'
  });


  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      options: {
        jshintrc: 'public/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['public/js/**/*.js',
            'app/**/*.js'] 
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      injectJS: {
        files: [
          'public/js/*.js',
          'public/js/**/*.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          'public/css/*.css',
          'public/css/**/*.css'
        ],
        tasks: ['injector:css']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
          files: [
            'public/**/*.css',
            'public/**/*.html',
            'public/**/*.js'
          ],
          options: {
            livereload: true
          }
      },
      express: {
        files: [
          'app/**/*.{js,json}'
        ],
        tasks: ['wait'],
        options: {
        livereload: true,
        nospawn: true //Without this option specified express won't be reloaded
        }
      },
    },
    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/public/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'public/index.html': [
              ['public/js/**/*.js']
            ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/public/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'public/index.html': [
            ['public/css/**/*.css']
          ]
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      task: {
        src: ['public/index.html']
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: 5858
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }  
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  

  grunt.registerTask('default', [
    'concurrent',
    'wiredep',
    'jshint', 
    'injector', 
    'wait', 
    'express-keepalive']);

};