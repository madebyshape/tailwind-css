/* Files */

const package = require("./package.json");
const modernizr = require("./modernizr.json");

/* Dependencies */

const gulp = require("gulp");
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const tailwindcss = require("tailwindcss");
const browserSync = require("browser-sync").create();
const sassGlob = require('gulp-sass-glob');

/* Tasks */

gulp.task("css", () => {
   return gulp
      .src(package.paths.public + package.paths.assets.scss + package.files.assets.scss)
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(
         postcss(
            [
               tailwindcss(package.files.tailwind),
               require("autoprefixer")
            ]
         )
      )
      .pipe(
         gulp.dest(package.paths.public + package.paths.dist)
      );
});
