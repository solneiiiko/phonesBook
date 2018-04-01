// BOOTSTRAP TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var gulp = require('gulp');
var sass = require('gulp-sass');
var rimraf = require('rimraf');
var router = require('front-router');
var sequence = require('run-sequence');

// Check for --production flag
var isProduction = (argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
    assets: [
        './client/**/*.*',
        '!./client/assets/{scss,js}/**/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass: [
        'client/assets/scss',
        'bower_components/bootstrap-sass/assets/stylesheets'
    ],
    // These files include Bootstrap for Apps and its dependencies
    librariesJS: [
        'bower_components/angular/angular.js',
        'bower_components/bower-angular-route/angular-route.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    // These files are for your app's JavaScript
    appJS: [
        'client/assets/js/app.js',
        'client/modules/main/services/SessionService.js',
        'client/modules/main/services/ApiService.js',
        'client/modules/main/services/LoginService.js',
        'client/modules/*/controllers/*',
        'client/routes/*.js'
    ],
    images: [
        
    ],
    fonts: [
        'bower_components/bootstrap-sass/assets/fonts/bootstrap/*'
    ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function () {
    return gulp.src(paths.assets, {
        base: './client/'
    })
            .pipe(gulp.dest('./build'))
            ;
});

// Compiles Sass
gulp.task('sass', function () {
    var minifyCss = $.if(isProduction, $.minifyCss().on('error', function (e) {
                console.log(e);
            }));

    return gulp.src('client/assets/scss/app.scss')
            .pipe($.sass({
                includePaths: paths.sass,
                outputStyle: (isProduction ? 'compressed' : 'nested'),
                errLogToConsole: true
            }))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions', 'ie 10']
            }))
            .pipe(minifyCss)
            .pipe(gulp.dest('./build/assets/css/'))
            ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:libraries', 'uglify:app'])

gulp.task('uglify:libraries', function (cb) {
    var uglify = $.if(isProduction, $.uglify()
            .on('error', function (e) {
                console.log(e);
            }));

    return gulp.src(paths.librariesJS)
            .pipe(uglify)
            .pipe($.concat('libraries.js'))
            .pipe(gulp.dest('./build/assets/js/'))
            ;
});

gulp.task('uglify:app', function () {
    var uglify = $.if(isProduction, $.uglify()
            .on('error', function (e) {
                console.log(e);
            }));

    return gulp.src(paths.appJS)
            .pipe(uglify)
            .pipe($.concat('app.js'))
            .pipe(gulp.dest('./build/assets/js/'))
            ;
});

gulp.task('images', function () {
    return gulp.src(paths.images, {
        base: './client/modules/'
    })
            .pipe(gulp.dest('./build/assets/images/'))
            ;
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
            .pipe(gulp.dest('./build/assets/fonts/'))
            ;
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function () {
    gulp.src('./build')
            .pipe($.webserver({
                port: 3000,
                host: 'localhost',
                fallback: 'index.html',
                livereload: true,
                open: true
            }))
            ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function (cb) {
    sequence('clean', ['copy', 'uglify:libraries', 'sass', 'images', 'fonts', 'uglify'], cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
    // Watch JavaScript
    gulp.watch([paths.appJS], ['uglify']);
    
    // Watch Sass
    gulp.watch(paths.sass, ['sass']);

    gulp.watch([paths.assets], ['copy']);
});
