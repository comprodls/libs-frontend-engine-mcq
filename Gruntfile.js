'use strict';

var engine_src = "src/js";
var bower_components = "../../bower_components/"
var dist = "dist/";

module.exports = function(grunt) {

    // Grunt configuration.
    grunt.initConfig({
        // Clean dist and bower folders
        clean: {            
            dist: {
                options: {
                    force: true
                },
                src: [
                    dist
                ]
            },
            bower: {
               src: "bower_components"
            },
        },

        //Install bower components
        bower: {
            install: {
              options: { 
                verbose: true,
                copy:false
              }             
            }
        },
        
       /* concat: {
            vendorLibs: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/handlebars/handlebars.js'
                ],
                dest: dist + 'vendor.js'
            }
        },*/

        //RequireJS optimizer
        // Create two files - mcqtest.js and mcqtest-editor.js
        requirejs: {
            mcqtest: {
                options: {
                    baseUrl: engine_src,
                    name: "mcqtest",
                    out: dist + "mcqtest.js",
                    paths: {
                        'text': bower_components + 'text/text',
                        'css': bower_components + 'require-css/css',
                        'css-builder': bower_components + 'require-css/css-builder',
                        'normalize': bower_components + 'require-css/normalize'
                    },
                    optimize: 'uglify2',
                    uglify2: {
                        mangle: false
                    },
                    exclude: ['normalize'],
                    done: function (done, output) {
                        console.log('done requirejs for mcq module');
                        done();
                    }
                }
            },
            mcqtestEdit: {
                options: {
                    baseUrl: engine_src,
                    name: "mcqtest-editor",
                    out: dist + "mcqtest-editor.js",
                    paths: {
                        'jquery':'empty:',
                        'text': bower_components + 'text/text',
                        'css': bower_components + 'require-css/css',
                        'css-builder': bower_components + 'require-css/css-builder',
                        'normalize': bower_components + 'require-css/normalize',
                        'uuid': 'uuid-generator',
                        'rivets': bower_components+ 'rivets/dist/rivets',
                        'sightglass': bower_components + 'sightglass/index',
                        'data': bower_components + 'jquery-ui/ui/data',
                        'ie': bower_components + 'jquery-ui/ui/ie',
                        'scroll-parent': bower_components + 'jquery-ui/ui/scroll-parent',
                        'version': bower_components + 'jquery-ui/ui/version',
                        'widget': bower_components + 'jquery-ui/ui/widget',
                        'mouse': bower_components + 'jquery-ui/ui/widgets/mouse',
                        'sortable' :  bower_components + 'jquery-ui/ui/widgets/sortable'
                    },
                    optimize: 'uglify2',
                    uglify2: {
                        mangle: false
                    },
                    exclude: ['normalize'],
                    done: function (done, output) {
                        console.log('done requirejs for mcq-editor module');
                        done();
                    }
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    base: '..'
                }
            }
        }

    });
    
    //Load grunt Tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-text-replace');
    
    // Default task
    grunt.registerTask('default', [ 
        'clean:dist',
        //'clean:bower',
        //'bower:install',
        //'concat',
        'requirejs'        
    ]);  

    grunt.registerTask('connectServer', [ 
        'connect'
    ]);
};
