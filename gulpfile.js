var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('lint', function () {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compile', ['lint'], function () {
    var files = require('./list.json').map(function (name) {
        return 'src/' + name
    });

    return gulp.src(files).pipe(closureCompiler({
        compilerPath: 'tools/closure-compiler/compiler.jar',
        compilerFlags: {},
        fileName: 'dist/game.tmp.js'
        }));
});

gulp.task('concat', ['compile'], function () {
    return gulp.src([
        'src/lib/pixi/bin/pixi.min.js',
        'src/lib/buzz/dist/buzz.min.js',
        'src/lib/greensock/src/minified/TweenLite.min.js',
        'src/lib/greensock/src/minified/easing/EasePack.min.js',
        'dist/game.tmp.js'
    ])
        .pipe(concat('game.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('cleanup', ['concat'], function () {
    del(['dist/game.tmp.js']);
});

gulp.task('default', function () {
    gulp.start('cleanup');
});