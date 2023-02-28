import gulp from 'gulp';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import terser from 'gulp-terser';
import pkg from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import {deleteSync} from 'del';

const { init, write } = pkg;
const sass = gulpSass( dartSass );
const imagemin_options = [
  gifsicle({ interlaced: true }),
  mozjpeg({ quality: 76.5, progressive: true }),
  optipng({ optimizationLevel: 5 }),
  svgo({
    plugins: [
      {
        name: "preset-default",
        params: { overrides: { removeViewBox: false, cleanupIDs: false } }
      }
    ]
  })
];

function html() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
}

function data() {
  return gulp.src('src/data/*.json')
  .pipe(gulp.dest('dist/data'))
}

function clean(done) {
  done();
  return deleteSync([
    'dist'
  ]);
}

function css() {
  return gulp.src([
    'src/scss/style.scss'
  ])
  .pipe(init())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    cascade: false,
    grid: false
  }))
  .pipe(write('.'))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.stream())
}

function js() {
  return gulp.src([
    'src/js/utils.js',
    'src/js/templates.js',
    'src/js/index.js'
  ])
  .pipe(init())
  .pipe(terser())
  .pipe(concat('all.js'))
  .pipe(write('.'))
  .pipe(gulp.dest('dist/assets/js'))
}

function images() {
  return gulp.src([
    'src/images/**'
  ])
  .pipe(imagemin(imagemin_options))
  .pipe(gulp.dest('dist/assets/images'))
}

function reload(done) {
  browserSync.reload();
  done();
}

function host(done) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    ghostMode: false
  });
  done();
}

function watchFiles(done) {
  gulp.watch('src/*.html', gulp.series(html, reload));
  gulp.watch('src/scss/**/*.scss', gulp.series(css));
  gulp.watch('src/js/**/*.js', gulp.series(js, reload));
  gulp.watch('src/images/**', gulp.series(images, reload));
  done();
}

// const _clean = clean;
// export { _clean as clean };
// export const only_css = gulp.series(clean, css);
// const _css = css;
// export { _css as css };
// const _js = js;
// export { _js as js };

const _default = gulp.series(clean, css, gulp.parallel(html, data, js, images), host, watchFiles);
export { _default as default };
