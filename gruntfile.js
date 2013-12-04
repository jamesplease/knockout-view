module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      src: 'source',
      tmp: 'tmp',
      build: 'build'
    },
    sass: {
      options: {
        style: 'compressed'
      },
      bookmarklet: {
        src: '<%= app.src %>/sass/style.scss',
        dest: '<%= app.tmp %>/style.css'
      }
    },
    compiler: {
      options: {
        data: {
          style: 'tmp/style.css'
        }
      },
      bookmarklet: {
        src: '<%= app.src %>/js/ko-view.js',
        dest: '<%= app.tmp %>/ko-view.compiled.js'
      }
    },
    jshint: {
      options: {
        // Ignore the `javascript` label warning
        undef: true,
        unused: true,
        '-W028': true,
        browser: true,
        globals: {
          console: true
        }
      },
      bookmarklet: {
        src: '<%= app.tmp %>/ko-view.compiled.js'
      }
    },
    uglify: {
      bookmarklet: {
        src: '<%= app.tmp %>/ko-view.compiled.js',
        dest: 'build/ko-view.min.js'
      }
    },
    bookmarkletify: {
      main: {
        src: 'build/ko-view.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('bookmarkletify', 'Appends a javascript label to the start of your compressed file', function() {

    var fileText = grunt.file.read(this.data.src);

    fileText = "javascript:" + fileText;
    grunt.file.write(this.data.src, fileText);

  });

  grunt.registerMultiTask('compiler', 'Builds JS files as Lo Dash templates', function() {

    var
    options = this.options(),
    template    = grunt.file.read(this.data.src),
    style       = grunt.file.read(options.data.style),
    variables   = {
      // Sass adds a newline at the end of its compressed files
      style: style.replace(/\s$/, '')
    };

    template = grunt.template.process(template, { data: variables });
    grunt.file.write(this.data.dest, template);

  });

  grunt.registerTask('default', ['sass', 'compiler', 'jshint', 'uglify', 'bookmarkletify']);

};