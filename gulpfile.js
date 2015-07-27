var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    path        = require('path'),
    browserSync = require('browser-sync'),
    through2    = require('through2'),
    reload      = browserSync.reload,
    browserify  = require('browserify'),
    del         = require('del'),
    argv        = require('yargs').argv;

$.handlebars = require('gulp-compile-handlebars');

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('css', function() {
  return gulp.src('./src/styles/**/*.{css,less}')
    .pipe($.plumber())
    .pipe($.less({
      paths: ['src/styles','semantic/dist/*/**.css']
    }))
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path, { debug: true })
        .transform(require('babelify'))
        .transform(require('debowerify'))
        .bundle(function (err, res) {
          if (err) { return next(err); }
          file.contents = res;
            next(null, file);
        });
      }))
      .on('error', function (error) {
        console.log(error.stack);
        this.emit('end')
    })
  .pipe($.rename('app.js'))
  .pipe(gulp.dest('dist/scripts/'));
});


gulp.task('clean', function(cb) {
  del('./dist', cb);
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
});

var data = {
  firstName: 'Kaanon'
};
var options = {
  batch: ['./src/partials'],
  helpers : {
    capitals : function(str){
      return str.toUpperCase();
    }
  }
};
gulp.task('templates', function() {
  return gulp.src('src/*.hbs')
    .pipe($.plumber())
    .pipe($.handlebars(data, options))
    .pipe($.rename('index.html'))
    .pipe(gulp.dest('dist/') )
});



gulp.task('build', ['css', 'js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/css/**/*.{css,less}',['css', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/*.hbs',['templates', reload]);
});

gulp.task('default', ['serve']);
