module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      options: {
        outputStyle: 'expanded',
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/sass/',
          src: '**/*.scss',
          dest: 'public/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: 'public/sass/**/*.scss',
      tasks: 'sass'
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass','watch']);

};
