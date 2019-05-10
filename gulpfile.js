const package = require("./package.json");

const gulp = require("gulp");
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const tailwindcss = require("tailwindcss");
const browsersync = require("browser-sync").create();
const sassglob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// const gulphub = require("gulp-hub");
//
// var hub = new gulphub(["gulp-tasks/*.js"]);
// gulp.registry(hub);

function browserSync(done) {

   browsersync.init({
      server: {
         baseDir: package.paths.public
      }
   });

   done();

}

function browserSyncReload() {

   browsersync.reload();
   done();

}

function css() {

   const plugins = [
      tailwindcss(package.files.tailwind),
      autoprefixer()
   ];

   return gulp
         .src(package.paths.public + package.paths.assets.scss + package.files.assets.scss)
         .pipe(sourcemaps.init())
         .pipe(sassglob())
         .pipe(sass())
         .pipe(postcss(plugins))
         .pipe(sourcemaps.write('/'))
         .pipe(gulp.dest(package.paths.public + package.paths.dist))
         .pipe(browsersync.stream());

}

function js() {

}

function images() {

}

function favicons() {

}

function minify() {

   const plugins = [
      cssnano()
   ];

   return gulp
         .src(package.paths.dist + package.files.dist.css)
         .pipe(postcss(plugins))
         .pipe(gulp.dest(package.paths.public + package.paths.dist));

}

function rev() {

}

function critical() {

}

function modernizr() {

}

function watch(done) {

   gulp.watch(package.paths.public + package.paths.assets.scss + "**/*", css);
   gulp.watch(package.files.tailwind, css);

   gulp.watch(package.paths.public + package.paths.assets.js + "**/*", js);

   done();

}

// const js = gulp.series(scriptsLint, scripts);
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
// const watch = gulp.parallel(watchFiles, browserSync);

exports.browserSync = browserSync;
exports.css = css;
exports.js = js;

exports.watch = gulp.series(watch, browserSync);
exports.build = gulp.series(css, js);
exports.production = gulp.series(css, js, minify);
