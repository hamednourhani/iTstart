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
	                cwd: 'dist',
	                domainPath: '/languages',
	                mainFile: 'dist/index.php',
	                potFilename: 'itstart.pot',
	                processPot: function( pot, options ) {
	                    pot.headers['report-msgid-bugs-to'] = 'http://itstar.ir/contact-us';
	                    pot.headers['language-team'] = 'iTstar <info@itstar.ir>';
	                    return pot;
	                },
	                type: 'wp-theme'
	            }
	        }
	    },//makepot


		jshint: {
		    files: [
		        'dist/js/**/*.js',
		        'dist/js'
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
		            'dist/js/script.min.js' : [
		                'dist/js/components/*.js'
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
		            'dist/js/script.js' : [
		                'dist/js/components/*.js'
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
		              	
		        }
		        
		    },//dist
		    dev: {
		        options: {
		           //banner: '/*! <%= pkg.name %> <%= pkg.version %> style.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		           config : 'config.rb'
		          
		        }
		    }//dev
		},//compass

		copy: {
		     
	      css: {
	        files: [
	          {
	            expand: true, 
	            cwd: 'dist/css/temp/', 
	            src: ['*.css'], 
	            dest: 'dist/css', 
	            rename: function(dest, src) {
	              return dest +'/'+ src.substring(0, src.indexOf('.')) + '.min.css';
	            }
	          }]
	      },
		   dist: {
		        src: 'dist/readme.txt',
		        dest: 'README.md'
		    }//dist
		},//copy

		
		clean: {
		  build: {
		    src: ["dist/css/temp/**/*.css"]
		  }
		},//clean

		curl: {
		    'google-fonts-source': {
		        src: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBSO5nOEdE6OwYNtLBVDdVO1jsy9Or5wHQ',
		        dest: 'dist/fonts/vendor/google-fonts-source.json'
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
	            src: ['dist/images/**/*.png','images/**/*.jpg'],
	            dest: 'dist/images/opt'
	        }//task1
	 
	    },//img


		watch: {
			options : { livereload : true },
      		scripts :{
      			files: ['dist/js/*.js'],
      			tasks: ['jshint','uglify:dev','uglify:dist']
    		},//scripts
    		html : {
    			files : ['dist/*.html']
    		},//html
    		sass : {
    			files : ['dist/sass/**/*.scss'],
    			tasks : ['compass:dev','compass:dist','copy:css','clean']
    		},
    		php : {
    			files : ['dist/**/*.php'],
    			tasks : ['makepot']
    		}
    	}//watch
  
		
	});
	
	grunt.registerTask('default', 'watch');
}