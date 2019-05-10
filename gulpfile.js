const package = require("./package.json");

const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const browsersync = require("browser-sync").create();
const sassglob = require("gulp-sass-glob");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const minify = require('gulp-minify');
const modernizr = require('gulp-modernizr');
const purgecss = require('gulp-purgecss');

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
      autoprefixer(),
      cssnano()
   ];

   return gulp
      .src(package.paths.assets.scss + package.files.assets.scss)
      .pipe(sourcemaps.init())
      .pipe(sassglob())
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("/"))
      .pipe(gulp.dest(package.paths.public + package.paths.dist.css))
      .pipe(browsersync.stream());

}

function js() {

   return gulp
      .src(package.paths.assets.js + package.files.assets.js)
      .pipe(sourcemaps.init())
      .pipe(
         minify(
            {
               ext:{
                  min:'.js'
               },
               noSource: true
            }
         )
      )
      .pipe(sourcemaps.write("/"))
      .pipe(gulp.dest(package.paths.public + package.paths.dist.js))
      .pipe(browsersync.stream());
}

function images() {

   return gulp
      .src(package.paths.assets.images + "**/*")
      .pipe(newer(package.paths.public + package.paths.dist.images))
      .pipe(
         imagemin(
            [
            	imagemin.gifsicle({ interlaced: true }),
            	imagemin.jpegtran({ progressive: true }),
            	imagemin.optipng({ optimizationLevel: 5 }),
            	imagemin.svgo({
            		plugins: [
            			{ removeViewBox: true },
            			{ cleanupIDs: false }
            		]
            	})
            ],
            { verbose: true }
         )
      )
      .pipe(gulp.dest(package.paths.public + package.paths.dist.images));

}

function favicons() {
   // @TODO
}

function rev() {
   // @TODO
}

function purgeCss() {

   class TailwindExtractor {
      static extract(content) {
         return content.match(/[A-z0-9-:\/]+/g);
      }
   }

   return gulp
      .src(package.paths.public + package.paths.dist.css + package.files.dist.css)
      .pipe(
         purgecss({
            content: [package.paths.templates + "**/*.{html,twig,vue}"],
            whitelist: [],
            extractors: [
               {
                  extractor: TailwindExtractor,
                  extensions: ["html", "twig", "vue"]
               }
            ]
         })
      )
      .pipe(gulp.dest(package.paths.public + package.paths.dist.css));

}

function criticalCss() {
   // @TODO
}

function browserFeatures() {

   return gulp
      .src(package.paths.assets.js + '**/*')
      .pipe(modernizr())
      .pipe(gulp.dest(package.paths.assets.js))

}

function watch(done) {

   gulp.watch(
      [
         package.paths.assets.scss + "**/*",
         package.files.tailwind
      ],
      css
   );

   gulp.watch(package.paths.assets.js + "**/*", js);
   gulp.watch(package.paths.assets.images + "**/*", images);

   done();

}

exports.browserSync = browserSync;
exports.browserSyncReload = browserSyncReload;
exports.css = css;
exports.js = js;
exports.images = images;
exports.favicons = favicons;
exports.rev = rev;
exports.purgeCss = purgeCss;
exports.criticalCss = criticalCss;
exports.browserFeatures = browserFeatures;
exports.watch = watch;

exports.dev = gulp.series(browserFeatures, css, js, images, watch, browserSync);
exports.production = gulp.parallel(browserFeatures, css, js, purgeCss, criticalCss, rev, favicons, images);
