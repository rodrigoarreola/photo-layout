import gulp from 'gulp';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import gulpConcat from 'gulp-concat';


const server = browserSync.create();

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch("./dev/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("./dev/js/**/*.js", gulp.series('scripts'));
    gulp.watch("./dev/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./dev/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

// Compile pug into html
gulp.task('pug', () =>
  gulp.src('./dev/pug/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
);

gulp.task('scripts', function() {
  gulp.src('./dev/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});

gulp.task('default', gulp.series('serve'));
// gulp.task('es6', () =>
//   gulp.src('./dev/js/*.js')
//   // .pipe(babel())
//   .pipe(gulp.dest('./public/js'))
// );


// const postCSSPlugins = [
//   cssnano({
//     core: false,
//     autoprefixer: {
//       add: true
//     }
//   })
// ];


// gulp.task('es6', () =>
//   gulp.src('./dev/js/*.js')
//   .pipe(babel())
//   .pipe(gulp.dest('./public/js'))
// );

// gulp.task('sass', () =>
//   gulp.src('./dev/scss/styles.scss')
//     .pipe(sass())
//     .pipe(postcss(postCSSPlugins))
//     .pipe(gulp.dest('./public/css'))
//     .pipe(server.stream({match: '**/*.css'}))
// );

// gulp.task('pug', () =>
//   gulp.src('./dev/pug/pages/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('./public/'))
// );

// gulp.task('default', () => {
//   server.init({
//     server: {
//       baseDir: './public'
//     }
//   });
//   gulp.watch('./dev/js/*.js', gulp.series('es6',[server.reload]));
//   gulp.watch('./dev/pug/**/*.pug', gulp.series('pug', [server.reload]));
//   gulp.watch('./dev/scss/**/*.scss', gulp.series('sass'));
// });
