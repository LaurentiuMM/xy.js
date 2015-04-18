module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.initConfig({

    browserify: {
      xy: {
        files: {
          'dist/xy.js': ['src/xy.js', 'src/transform.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'Xy'
          }
        }
      },
      transform: {
        files: {
          'dist/transform.js': ['src/transform.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'Transform'
          }
        }
      },
    },

    uglify: {
      xy: {
        files: { 'dist/xy.min.js': 'dist/xy.js' },
        options: { banner: '// Xy.js - https://github.com/thunder9/xy.js\n' }
      },
      transform: {
        files: { 'dist/transform.min.js': 'src/transform.js' },
        options: { banner: '// Transform.js - https://github.com/thunder9/xy.js\n' }
      }
    }
  });


  grunt.registerTask('default', ['browserify', 'uglify']);
};