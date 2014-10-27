//jshint node: true

var chalk = require('chalk');
var matchdep = require('matchdep');
var stagedGithubFiles = require('staged-github-files');

module.exports = function(grunt) {

    var config = grunt.file.readYAML('config/grunt.yml').config;
    var pkg = grunt.file.readJSON('package.json');
    var watchFiles = [];
    var watchJavascriptFiles = [];

    //-- version must match '^(?:^(?!-)[a-z\d\-]{0,62}[a-z\d]$)$'
    function sanitizeVersion(dirtyVersion) {
        return (dirtyVersion || '').replace(/(.)/, 'v$1').replace(/[^a-z0-9]/g, '-');
    }

    grunt.initConfig({
        pkg: pkg,
        sanitizeVersion: sanitizeVersion,
        semver: require('semver'),

        bump: {
            options: {
                commitFiles: [ //-- Files to add to release commit
                    'package.json',
                    'bower.json'
                ],
                files: [ //-- Files to bump
                    'package.json',
                    'bower.json'
                ],
                pushTo: 'origin',
                updateConfigs: ['pkg']
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            changed: {
                src: stagedGithubFiles.filter('js')
            },
            changedForce: {
                options: {
                    force: true
                },
                src: stagedGithubFiles.filter('js')
            }
        },

        jscs: {
            changed: {
                src: stagedGithubFiles.filter('js')
            },
            changedForce: {
                options: {
                    force: true
                },
                src: stagedGithubFiles.filter('js')
            }
        },

        prompt: {
            bump: {
                options: {
                    questions: [
                        {
                            config: 'bump.increment',
                            type: 'list',
                            message: 'Bump version from ' + pkg.version.cyan + ' to:',
                            choices: [
                                {
                                    value: 'patch',
                                    name: 'Patch:  '.yellow +
                                        '<%= semver.inc(pkg.version, "patch") %>'.yellow +
                                        '   Backwards-compatible bug fixes.'
                                },
                                {
                                    value: 'minor',
                                    name: 'Minor:  '.yellow +
                                        '<%= semver.inc(pkg.version, "minor") %>'.yellow +
                                        '   Add functionality in a backwards-compatible manner.'
                                },
                                {
                                    value: 'major',
                                    name: 'Major:  '.yellow +
                                        '<%= semver.inc(pkg.version, "major") %>'.yellow +
                                        '   Incompatible API changes.'
                                }
                            ]
                        }
                    ]
                }
            }
        },

        sass: {
            options: {
                loadPath: config.files.scss.loadPaths,
                quiet: true,
                style: 'compact'
            },
            build: {
                src: config.files.scss.app.src,
                dest: config.files.scss.app.dest
            }
        },

        scsslint: {
            allFiles: config.files.scss.watch,
            options: {
                bundleExec: false,
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },

        symlink: {
            options: {
                overwrite: true
            },
            'pre-commit-hook': {
                src: 'pre-commit-hook.sh',
                dest: '.git/hooks/pre-commit'
            }
        },

        watch: {
            js: {
                files: watchJavascriptFiles,
                tasks: ['jshint:changed', 'jscs:changed', 'groc']
            },

            livereload: {
                options: {
                    livereload: config.liveReloadPort
                },
                files: watchFiles
            },

            scss: {
                options: {
                    interrupt: true
                },
                files: config.files.scss.watch,
                tasks: 'sass'
            }
        }
    });

    // Load all the grunt tasks
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('prepare_livereload', 'Build Locale files.', function() {
        var filename;
        var generateLiveReload;

        filename = config.files.js.livereload;
        generateLiveReload = function(port) {
            return '(function() {\n    \'use strict\';\n        var existing_script_tag = document.getElementsByTagName(\'script\')[0];\n        var host;\n        var new_script_tag = document.createElement(\'script\');\n        var url;\n        host = (location.host || \'localhost\').split(\':\')[0];\n        url = \'http://\' + host + \':' + port + '/livereload.js?snipver=1\';\n        new_script_tag.src = url;\n        existing_script_tag.parentNode.insertBefore(new_script_tag, existing_script_tag);\n})(); ';
        };

        grunt.file.write(filename, generateLiveReload(config.liveReloadPort));
        grunt.log.writeln('File ' + chalk.cyan(filename) + ' created');
    });

    grunt.registerTask('default', [
        'symlink:pre-commit-hook',
        'sass',
        'prepare_livereload',
        'watch'
    ]);

     /**
     * Internal task to use the prompt settings to create a tag
     */
    grunt.registerTask('bump:prompt', function() {
        var increment = grunt.config('bump.increment');
        if (!increment) {
            grunt.fatal('bump.increment config not set!');
        }

        grunt.task.run('bump:' + increment);
    });

    // Register task for validating code.
    grunt.registerTask('validate-code', ['jshint:changedForce', 'jscs:changedForce', 'scsslint']);
    grunt.registerTask('test', ['validate-code']);
};
