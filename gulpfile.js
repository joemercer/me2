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
$.ghPages = require('gulp-gh-pages');

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

var data = {
  firstName: 'Kaanon' // !!!
};
var options = {
  batch: ['./src/partials'],
  helpers : { // !!!
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

gulp.task('css', function() {
  return gulp.src('./src/styles/main.less')
    .pipe($.plumber())
    .pipe($.less({
      paths: ['src/styles']
    }))
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('js', function() {
  return gulp.src('src/scripts/main.js')
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
  .pipe($.rename('main.js'))
  .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('copy', function() {
  return gulp.src(['./src/CNAME', './src/favicon.ico'])
    .pipe(gulp.dest('./dist'))
});

gulp.task('ghPages', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      remoteUrl: 'https://github.com/joemercer/joemercer.github.io.git',
      branch: 'master'
    }));
});

gulp.task('clean', function(cb) {
  del('./dist', cb);
});



gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/styles/**/*.{css,less}',['css', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch(['src/*.hbs','src/partials/**/*.hbs'],['templates', reload]);
});

gulp.task('build', ['templates', 'css', 'js', 'images']);

gulp.task('deploy', function() {
  runSequence('build', 'copy', 'ghPages');
});

gulp.task('default', ['serve']);
