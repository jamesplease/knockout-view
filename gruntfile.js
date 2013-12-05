module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      src   : 'source',
      tmp   : 'tmp',
      build : 'build',
      js    : '<%= app.src %>/js/ko-view.js',
      sass  : '<%= app.src %>/sass/style.scss'
    },
    sass: {
      options: {
        style: 'compressed'
      },
      bookmarklet: {
        src: '<%= app.sass %>',
        dest: '<%= app.tmp %>/style.css'
      }
    },
    processor: {
      options: {
        data: {
          style: '<%= sass.bookmarklet.dest %>'
        }
      },
      bookmarklet: {
        src: '<%= app.js %>',
        dest: '<%= app.tmp %>/ko-view.compiled.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        undef: true,
        unused: true,
        browser: true,
        globals: {
          console: true
        },
        // Ignore the `javascript` label warning
        '-W028': true
      },
      bookmarklet: {
        src: '<%= processor.bookmarklet.dest %>'
      }
    },
    jsmin: {
      main: {
        src: '<%= processor.bookmarklet.dest %>',
        dest: 'build/ko-view.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('jsmin', 'Minification via jsmin', function() {

    var
    jsmin = require('jsmin'),
    code = grunt.file.read(this.data.src);

    minified = jsmin.jsmin(code, 3);
    grunt.file.write(this.data.dest, minified);

  });

  grunt.registerMultiTask('processor', 'Processes JS files as Lo Dash templates', function() {

    var
    options   = this.options(),
    template  = grunt.file.read(this.data.src),
    style     = grunt.file.read(options.data.style),
    variables = {
      // Sass adds a newline at the end of its compressed files
      style: style.replace(/\s$/, '')
    };

    template = grunt.template.process(template, { data: variables });
    grunt.file.write(this.data.dest, template);

  });

  grunt.registerTask('default', ['sass', 'processor', 'jshint', 'jsmin']);
  grunt.registerTask('testless', ['sass', 'processor', 'jsmin']);

};