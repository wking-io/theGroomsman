module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			jade: {
				files: ['jadefiles/**/*.jade'],
				tasks: ['jade']
			},
      uglify: {
        files: ['js/main.js'],
        tasks: ['uglify']
      }
		},

		jade: {
  			compile: {
    			options: {
    				pretty: true,
      				data: {
        				debug: false
      				}
    			},
    			files: {
      				"index.html": ["jadefiles/index.jade"],
              "thank-you.html": ["jadefiles/thank-you.jade"],
              "bestman.html": ["jadefiles/bestman.jade"]
    			}
  			}
		},

		sass : {
			dist: {
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},

		uglify: {
			options: {
				manage: false
			},
			my_target: {
				files: {
					'js/main.min.js': ['js/main.js']
				}
			}
		},

		autoprefixer: {
    	options: {
      	browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
    	},
    	my_target: {
      	files: {
					'css/main.css':'css/main.css',
				}
    	}
  	},

		cssmin: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src:['main.css', '!*.min.css'],
					dest: 'css/',
					ext: '.min.css'
				}]
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css',
						'*.html'
					]
				},
				options: {
					watchTask: true,
					server: './'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default', ['browserSync', 'watch']);
};
