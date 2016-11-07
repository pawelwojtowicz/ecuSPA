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
			src: ['js/controllers.js','js/app.js','intermediate/template.js'],
			dest: 'intermediate/concatenatedApp.js',
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: 'intermediate/concatenatedApp.js',
			dest: 'output/js/<%= pkg.name %>.min.js'
		}
	},
	htmlmin: {                                     // Task
		app: {                                      // Target
			options: {                                 // Target options
				removeComments: true,
				collapseWhitespace: true
			},
			files: {                                   // Dictionary of files
				'output/index.html': 'index.html',     // 'destination': 'source'
			}
		}
	},
	ngtemplates:  {
		app:	{
			src:      'partials/**.html',
			dest:     'intermediate/template.js',
			options:  {
				module: 'maintenanceApp',
				usemin: 'dist/vendors.js', // <~~ This came from the <!-- build:js --> block
				htmlmin: {
					collapseBooleanAttributes:      true,
					collapseWhitespace:             true,
					removeAttributeQuotes:          true,
					removeComments:                 true, // Only if you don't use comment directives! 
					removeEmptyAttributes:          true,
					removeRedundantAttributes:      true,
					removeScriptTypeAttributes:     true,
					removeStyleLinkTypeAttributes:  true
				}
			}
		}
	},
	cssmin: {
		options: {
			shorthandCompacting: false,
			roundingPrecision: -1
		},
		target: {
			files: {
			'output/css/stylesheet.css': ['css/stylesheet.css']
			}
		}
	},
	clean: {
		app: {
			src: ['output', 'dist']
		}
	}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-angular-templates'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  
  // Default task(s).
  grunt.registerTask('default', ['htmlhint','jshint','ngtemplates','concat','uglify','cssmin','htmlmin']);
  grunt.registerTask('cleanup', ['clean']);
};