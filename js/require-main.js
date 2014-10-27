/*globals requirejs */

(function(undefined) {

    'use strict';

    define('ga', function() {
        return window.ga;
    });

    requirejs.config({
        paths: {
            backbone: '../vendor/backbone/backbone',
            'backbone-computedfields': '../vendor/backbone-computedfields/lib/amd/backbone.computedfields',
            'backbone-relational': '../vendor/backbone-relational/backbone-relational',
            'backbone-super': '../vendor/backbone-super/backbone-super/backbone-super',
            'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
            'backbone.grouped-collection': '../vendor/Backbone.GroupedCollection/backbone.grouped-collection',
            'backbone.virtual-collection': '../vendor/Backbone.VirtualCollection/backbone.virtual-collection',
            'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
            imagesloaded: '../vendor/imagesloaded/imagesloaded',
            'eventEmitter/EventEmitter': '../vendor/eventEmitter/EventEmitter',
            'eventie/eventie': '../vendor/eventie/eventie',
            facebook: '../vendor/facebook/index',
            fastclick: '../vendor/fastclick/lib/fastclick',
            gsap: '../vendor/gsap/src/uncompressed/easing/EasePack',
            CSSPlugin: '../vendor/gsap/src/uncompressed/plugins/CSSPlugin',
            RoundPropsPlugin: '../vendor/gsap/src/uncompressed/plugins/RoundPropsPlugin',
            ScrollToPlugin: '../vendor/gsap/src/uncompressed/plugins/ScrollToPlugin',
            TimelineLite: '../vendor/gsap/src/uncompressed/TimelineLite',
            TimelineMax: '../vendor/gsap/src/uncompressed/TimelineMax',
            TweenLite: '../vendor/gsap/src/uncompressed/TweenLite',
            TweenMax: '../vendor/gsap/src/uncompressed/TweenMax',
            'jquery.gsap': '../vendor/gsap/src/uncompressed/jquery.gsap',
            hammer: '../vendor/hammerjs/hammer',
            Handlebars: '../vendor/handlebars/handlebars',
            hbars: '../vendor/requirejs-handlebars/hbars',
            jquery: '../vendor/jquery/dist/jquery',
            'jquery-stylesheet': '../vendor/jquery-stylesheet/jquery.stylesheet',
            'jquery-cycle2': '../vendor/jquery-cycle2/build/jquery.cycle2',
            'jquery-cycle2-swipe': '../vendor/jquery-cycle2/src/jquery.cycle2.swipe',
            marionette: '../vendor/backbone.marionette/lib/core/amd/backbone.marionette',
            'marionette.babyBird': '../vendor/marionette.babyBird/lib/marionette.babyBird',
            'marionette.enahancedController': '../vendor/marionette-enhanced-controller/lib/marionette.enhancedController',
            'marionette.googleAnalyticsEvents': '../vendor/marionette.googleAnalyticsEvents/lib/marionette.googleAnalyticsEvents',
            'marionette.regionChildCloseEvent': '../vendor/marionette.regionChildCloseEvent/lib/marionette.regionChildCloseEvent',
            'marionette-transitions': '../vendor/marionette-transitions/marionette-transitions',
            matchHeight: '../vendor/matchHeight/jquery.matchHeight',
            modernizr: '../vendor/modernizr/modernizr',
            modernizriOS: '../vendor/modernizriOS/lib/modernizriOS',
            polyfillLocationOrigin: '../vendor/polyfillLocationOrigin/lib/polyfillLocationOrigin',
            ScrollMagic: '../vendor/ScrollMagic/js/jquery.scrollmagic',
            ScrollMagicDebug: '../vendor/ScrollMagic/js/jquery.scrollmagic.debug',
            text: '../vendor/requirejs-text/text',
            twitter: '../vendor/twitter/index',
            underscore: '../vendor/underscore/underscore',
            'underscore.string': '../vendor/underscore.string/lib/underscore.string',
            'video.js-youtube': '../vendor/videojs-youtube/src/youtube',
            'videojs-markers': '../vendor/videojs-markers/src/videojs.markers',
            videojs: '../vendor/video.js/dist/video-js/video.dev',
            wipe: '../vendor/wipe/jquery.wipe'
        },
        shim: {
            'backbone-computedfields': ['backbone'],
            facebook: {
                exports: 'FB'
            },
            ga: {
                exports: 'ga'
            },

            gsap: [
                'CSSPlugin',
                'RoundPropsPlugin',
                'ScrollToPlugin',
                'TimelineLite',
                'TimelineMax',
                'TweenLite',
                'TweenMax'
            ],
            CSSPlugin: [
                'TimelineLite',
                'TimelineMax',
                'TweenLite',
                'TweenMax'
            ],
            RoundPropsPlugin: [
                'TimelineLite',
                'TimelineMax',
                'TweenLite',
                'TweenMax'
            ],
            ScrollToPlugin: [
                'TimelineLite',
                'TimelineMax',
                'TweenLite',
                'TweenMax'
            ],
            'jquery.gsap': ['jquery', 'gsap'],
            hammer: {
                exports: 'hammer'
            },
            Handlebars: {
                exports: 'Handlebars'
            },
            hbars: ['text', 'Handlebars'],
            'jquery-cycle2': ['jquery'],
            'jquery-stylesheet': ['jquery'],
            'videojs-markers': ['videojs', 'jquery'],
            'video.js-youtube': ['videojs'],
            matchHeight: {
                deps: ['jquery']
            },
            modernizr: {
                exports: 'Modernizr'
            },
            twitter: {
                exports: 'twttr'
            },
            ScrollMagic: {
                deps: ['gsap'],
                exports: 'ScrollMagic'
            },
            ScrollMagicDebug: ['ScrollMagic']
        },

        hbars: {
            extension: '.hbs'
        },

        // Load these dependencies before firing any `require` callbacks.
        deps: ['underscore',
            'underscore.string',
            'videojs',

            // Properties that need to be loaded, but not used in `callback`.
            'video.js-youtube'
        ],

        // Callback to execute after `deps` are loaded.
        callback: function(_, underscorestring, videojs) {
            var SWF_LOCATION = '/vendor/videojs/dist/video-js/video-js.swf';

            // Mixin `underscore.string` values into `underscore`.
            _.mixin(underscorestring.exports());

            // Set the video.js swf path
            videojs.options.flash.swf = SWF_LOCATION;
            videojs.options.techOrder.push('youtube');
        },

        // No timeout on script loading.
        waitSeconds: 0
    });

    require(['app'], function(App) {
        App.start();
    });

}());
