var 
gulp = require('gulp'), 
newer = require('gulp-newer'),
imagemin = require('gulp-imagemin'),
cleanhtml = require('gulp-cleanhtml'),
sass = require ('gulp-sass'),
sourcemaps = require ('gulp-sourcemaps'),

// development mode? (devBuild = (process.env.NODE_ENV !== 'production'),)
devBuild = true,

// folders
folder = {
    src: 'src/',
    build: 'build/'
    };

// image processing
gulp.task('images', function() {
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*') //all files, all subdirectories
      .pipe(newer(out)) //compare files to those in out folder
      .pipe(imagemin({ optimizationLevel: 5 })) //new files goes here
      .pipe(gulp.dest(out)); //writes to 
  });


gulp.task('html', ['images'], function() {
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*') //look for source files
    .pipe(newer(out)); //is it newer

// minify production code
if (!devBuild) {
    page = page.pipe(cleanhtml());
}

return page.pipe(gulp.dest(out));
});

gulp.task('build-css', function() {
    var out = folder.build + 'css/';
    return gulp.src(folder.src + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest(out));
});

// watch for changes
gulp.task('watch', function() {
    
      // image changes
      gulp.watch(folder.src + 'images/**/*', ['images']); //run image task
    
      // html changes
      gulp.watch(folder.src + 'html/**/*', ['html']); //run html task
      
      //scss changes
      gulp.watch(folder.src + 'scss/**/*', ['build-css']);
      // gulp.watch(folder.src + 'scss/**/*.scss', ['build-css']);

      // javascript changes
    
    });
