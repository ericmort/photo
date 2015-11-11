
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

// Delete the public directory
gulp.task('clean', function() {
 return gulp.src('public')
 .pipe(clean());
});

//Concat and copy all local JavaScript to the public dir
gulp.task('js', function(){
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'));
});


gulp.task('html', function(){
    gulp.src([
            'app/html/*.html',
            'app/**/*.html'
        ])
        .pipe(gulp.dest('public'));
});

gulp.task('css', function(){
    gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'app/css/*.css',
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['js']);
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/**/*.html', ['html']);
});



gulp.task('livereload', function() {
  gulp.src(['public/css/*.css', 'public/js/*.js', 'public/html/*.html', 'public/index.html'])
    .pipe(watch())
    .pipe(connect.reload());
});


//Starts the web server and watch for changes
gulp.task('server', function() {
  connect.server({
  	port:9000,
  	
  	livereload: true,
  	root: ['public']
  });
});


gulp.task('default', ['js', 'html',  'css']);

gulp.task('serve', ['default', 'server', 'livereload', 'watch']);