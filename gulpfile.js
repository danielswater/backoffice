var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    es2015 = require('babel-preset-es2015'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    clear = require('rimraf'),
    commonjsWrap = require('gulp-wrap-commonjs');

// Default
gulp.task('default',['clear'],function(callback) {
  runSequence('uglify',
    ['browser-sync','cssmin', 'gulp', 'watch'
	// 'js:compiler', 'babel:es6', 
	],
    'watch',
    callback);
});
gulp.task('clear', function (cb) {
  clear('./dist', cb);


  console.log("Limpando a pasta dist")
});
// Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init({
        port : 8000,
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});


// MINIFY CSS (minificar CSS)
// importa o modulo 'cssmin' e cria uma função com o mesmo, para: minificar, renomear, concatenar tudo em um arquivo, e jogar no dist
//----------------------------------------------------------------------
gulp.task('cssmin' , function () {
  gulp.src('source/assets/css/**/*.css')
        .pipe(cssmin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/assets/css/'));

});

// Uglify
gulp.task('uglify', function (cb){
  pump([
        gulp.src(['source/**/*.js']),
        uglify()
        	.pipe(gulp.dest('./dist'))
    ],
    cb
  );
});

// Move files
gulp.task('gulp', function() {
  console.log("Estou movendo os arquivos para o dist :D ...");
  gulp.src("source/**/*")
  .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', function() {
  function reportChange(event){
    console.log('Event type: ' + event.type);
    console.log('Event path: ' + event.path);
  }
  gulp.watch('source/assets/css/**/*.css' , ['cssmin','gulp']).on('change', reportChange);;
  gulp.watch('index.html' , ['gulp']).on('change', reportChange);;
  gulp.watch('source/**/*' , ['gulp']).on('change',browserSync.reload, reportChange);;
});
