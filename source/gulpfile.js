var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    del = require('del');

process.chdir('..');

gulp.task('lint', function () {
    return gulp.src(['source/src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compile', ['lint'], function () {
    var files = require('./list.json').map(function (name) {
        return 'source/src/' + name
    });

    return gulp.src(files).pipe(closureCompiler({
        compilerPath: 'source/tools/closure-compiler/compiler.jar',
        compilerFlags: {},
        fileName: 'release/game.tmp.js'
        }));
});

gulp.task('concat', ['compile'], function () {
    return gulp.src([
        'source/src/lib/pixi/bin/pixi.min.js',
        'source/src/lib/buzz/dist/buzz.min.js',
        'release/game.tmp.js'
    ])
        .pipe(concat('game.js'))
        .pipe(gulp.dest('release/'));
});

gulp.task('cleanup', ['concat'], function () {
    del(['release/game.tmp.js']);
});

gulp.task('default', function () {
    gulp.start('cleanup');
});