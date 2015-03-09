var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function () {
    return gulp.src(['src/Init.js', 'src/Main.js'])
        .pipe(closureCompiler({
            compilerPath: 'tools/closure-compiler/compiler.jar',
            fileName: '../release/Game.js'
        }));
});
