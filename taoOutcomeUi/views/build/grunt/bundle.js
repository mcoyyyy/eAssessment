module.exports = function(grunt) {
    'use strict';

    var requirejs   = grunt.config('requirejs') || {};
    var clean       = grunt.config('clean') || {};
    var copy        = grunt.config('copy') || {};

    var root        = grunt.option('root');
    var libs        = grunt.option('mainlibs');
    var ext         = require(root + '/tao/views/build/tasks/helpers/extensions')(grunt, root);
    var out         = 'output';

    /**
     * Remove bundled and bundling files
     */
    clean.taooutcomeuibundle = [out];

    /**
     * Compile tao files into a bundle
     */
    requirejs.taooutcomeuibundle = {
        options: {
            baseUrl : '../js',
            dir : out,
            mainConfigFile : './config/requirejs.build.js',
            paths : {
                'taoOutcomeUi' : root + '/taoOutcomeUi/views/js',
                'taoItems' : root + '/taoItems/views/js',
                'taoItemsCss' : root + '/taoItems/views/css'
            },
            modules : [{
                name: 'taoOutcomeUi/controller/routes',
                include : ext.getExtensionsControllers(['taoOutcomeUi']),
                exclude : ['mathJax'].concat(libs)
            }]
        }
    };

    /**
     * copy the bundles to the right place
     */
    copy.taooutcomeuibundle = {
        files: [
            { src: [out + '/taoOutcomeUi/controller/routes.js'],  dest: root + '/taoOutcomeUi/views/js/controllers.min.js' },
            { src: [out + '/taoOutcomeUi/controller/routes.js.map'],  dest: root + '/taoOutcomeUi/views/js/controllers.min.js.map' }
        ]
    };

    grunt.config('clean', clean);
    grunt.config('requirejs', requirejs);
    grunt.config('copy', copy);

    // bundle task
    grunt.registerTask('taooutcomeuibundle', ['clean:taooutcomeuibundle', 'requirejs:taooutcomeuibundle', 'copy:taooutcomeuibundle']);
};
