module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-phpdocumentor');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		makepot: {
		    target: {
		        options: {
		            include: [
		                '*.php'
		            ],
		            type: 'wp-theme' // or `wp-plugin`
		        }//options
		    }//target
		},//makepot

		jshint: {
		    files: [
		        'js/**/*.js',
		        'js'
		    ],//files
		    options: {
		        expr: true,
		        globals: {
		            jQuery: true,
		            console: true,
		            module: true,
		            document: true
		        }
		    }//options
		},//jshint

		uglify: {
		    dist: {
		        options: {
		            banner: '/*! <%= pkg.name %> <%= pkg.version %> script.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		            report: 'gzip'
		        },//options
		        files: {
		            'js/script.min.js' : [
		                'components/js/*.js'
		             ]
		        }//files
		    },//dist
		    dev: {
		        options: {
		            banner: '/*! <%= pkg.name %> <%= pkg.version %> script.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		            beautify: true,
		            compress: false,
		            mangle: false
		        },//options
		        files: {
		            'js/script.js' : [
		                'components/js/*.js'
		            ]
		        }//files
		    }//dev
		},//uglify
		
		compass: {
		   dist: {
		        options: {
		            //banner: '/*! <%= pkg.name %> <%= pkg.version %> style.min.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		          	environment: 'production',
		           config : 'config.rb'
		          
			        

		           	
		        },
		        files: {
		            expand: true,
		            cwd: ['sass','sass/layout','sass/modules','sass/theme','sass/utilities','sass/base'],
		            src: [
		                '*.scss'
		            ],
		            dest: 'css',
		            ext: '.min.css'
		        }
		    },//dist
		    dev: {
		        options: {
		           //banner: '/*! <%= pkg.name %> <%= pkg.version %> style.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		           config : 'config.rb'
		          
		        },
		        files: {
		            expand: true,
		            cwd: ['sass','sass/layout','sass/modules','sass/theme','sass/utilities','sass/base'],
		            src: [
		                '*.scss'
		            ],
		            dest: 'css',
		            ext: '.css'
		        }
		    }//dev
		},//compass

		copy: {
		     
	      css: {
	        files: [
	          {
	            expand: true, 
	            cwd: 'css/dist/', 
	            src: ['*.css'], 
	            dest: 'css', 
	            rename: function(dest, src) {
	              return dest +'/'+ src.substring(0, src.indexOf('.')) + '.min.css';
	            }
	          }]
	      },
		   dist: {
		        src: 'readme.txt',
		        dest: 'README.md'
		    }//dist
		},//copy

		
		clean: {
		  build: {
		    src: ["css/dist/*.css"]
		  }
		},//clean

		curl: {
		    'google-fonts-source': {
		        src: 'https://www.googleapis.com/webfonts/v1/webfonts?key=*******',
		        dest: 'fonts/vendor/google-fonts-source.json'
		    }
		},//cUrl
		
		phpdocumentor: {
		    dist: {
		        options: {
		            ignore: 'node_modules'
		        }
		    }
		},//phpdocumentor

		img: {
         
	        // recursive extension filter with output path 
	        task1: {
	            src: ['images/**/*.png','images/**/*.jpg'],
	            dest: 'images/opt'
	        }//task1
	 
	    },//img


		watch: {
			options : { livereload : true },
      		scripts :{
      			files: ['js/*.js'],
      			tasks: ['jshint','uglify:dev','uglify:dist']
    		},//scripts
    		html : {
    			files : ['*.html']
    		},//html
    		sass : {
    			files : ['sass/*.scss','sass/base/*.scss','sass/layout/*.scss','sass/modules/*.scss','sass/utilities/*.scss','theme/*.scss'],
    			tasks : ['compass:dev','compass:dist','copy:css','clean']
    		},
    		php : {
    			files : ['*.php'],
    			tasks : ['makepot','phpdocumentor']
    		}
    	}//watch
  
		
	});
	
	grunt.registerTask('default', 'watch');
}