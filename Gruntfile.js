module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.initConfig({

    concat: {
      dist: {
        src: ['src/xy.js', 'src/transform.js'],
        dest: 'dist/xy.js',
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


  grunt.registerTask('default', ['concat', 'uglify']);
};