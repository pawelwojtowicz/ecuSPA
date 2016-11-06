module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	htmlhint: {
	  options: {
		"tag-pair": true
	  },
	  html1: {
		src: ['index.html','partials/*.html']
	  }
	},
	jshint: {
		all: ['js/*.js']
	},
	concat: {
		options: {
			stripBanners: true,
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +  '<%= grunt.template.today("yyyy-mm-dd") %> */'
		},
		dist: {
			src: ['js/controllers.js','js/app.js'],
			dest: 'dist/built.js',
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: 'dist/built.js',
			dest: 'build/<%= pkg.name %>.min.js'
		}
	},
    minifyHtml: {
		options: {
			cdata: true
		},
		dist: {
			files: {
				'dist/index.html': 'index.html'
			}
		}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-minify-html'); 
  
  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('all', ['htmlhint','jshint','concat','uglify']);
  grunt.registerTask('htmlmin', ['minifyHtml']);

};