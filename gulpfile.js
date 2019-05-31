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
const minify = require("gulp-minify");
const modernizr = require("gulp-modernizr");
const purgecss = require("gulp-purgecss");
const concat = require("gulp-concat");
const favicons = require("favicons").stream;
const rev = require("gulp-rev");
const revDel = require("rev-del");
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");

function browserSync(done) {

   if (package.env.local === '') {
      browsersync.init({
         server: {
            baseDir: package.paths.public
         }
      });
   }
   else {
      browsersync.init({
         proxy: package.env.local
      });
   }
   done();

}

function browserSyncReload(done) {

   browsersync.reload();
   done();

}

function css() {

   const cssFiles = [
      package.paths.assets.scss + package.files.assets.scss
   ];

   for (var i = 0; i < package.cssDependencies.length; i++) {
      cssFiles.unshift(package.paths.dependencies + package.cssDependencies[i]);
   }

   const plugins = [
      tailwindcss(package.files.tailwind),
      autoprefixer(),
      cssnano()
   ];

   return gulp
      .src(cssFiles)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(concat(package.files.dist.css))
      .pipe(sourcemaps.init())
      .pipe(sassglob())
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("/"))
      .pipe(gulp.dest(package.paths.public + package.paths.dist.css))
      .pipe(notify("Compiled CSS"))
      .pipe(browsersync.stream());

}

function js() {

   const jsDependencies = package.jsDependencies.reverse();

   const jsFiles = [
      package.paths.assets.js + "modernizr.js",
      package.paths.assets.js + "components/**/*.js",
      package.paths.assets.js + package.files.assets.js
   ];

   for (var i = 0; i < jsDependencies.length; i++) {
      jsFiles.unshift(package.paths.dependencies + jsDependencies[i]);
   }

   return gulp
      .src(jsFiles)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(concat(package.files.dist.js))
      .pipe(sourcemaps.init())
      .pipe(
         minify(
            {
               ext:{
                  min:".js"
               },
               noSource: true
            }
         )
      )
      .pipe(sourcemaps.write("/"))
      .pipe(gulp.dest(package.paths.public + package.paths.dist.js))
      .pipe(notify("Compiled JS"))
      .pipe(browsersync.stream());
}

function images() {

   return gulp
      .src(package.paths.assets.images + "**/*")
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
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
      .pipe(gulp.dest(package.paths.public + package.paths.dist.images))
      .pipe(notify("Images Optimised"));

}

function favicon() {

   return gulp
      .src(package.paths.assets.images + "favicon.png")
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(
         favicons({
            appName: package.name,
            appDescription: package.description,
            developerName: package.author,
            developerURL: package.authorUrl,
            background: "#FFF",
            display: "standalone",
            orientation: "any",
            version: 1.0,
            html: "favicons.html",
            pipeHTML: true,
            replace: true,
            icons: {
               android: false,
               appleIcon: true,
               appleStartup: false,
               coast: true,
               favicons: true,
               firefox: true,
               opengraph: false,
               twitter: false,
               windows: true,
               yandex: true
            }
         })
      )
      .pipe(gulp.dest(package.paths.public + package.paths.dist.images))
      .pipe(notify("Favicons Generated"));

}

function purgeCss() {

   class TailwindExtractor {
      static extract(content) {
         return content.match(/[A-z0-9-:\/]+/g);
      }
   }

   return gulp
      .src(package.paths.public + package.paths.dist.css + package.files.dist.css)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
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
      .pipe(gulp.dest(package.paths.public + package.paths.dist.css))
      .pipe(notify("Purged CSS"));

}

function criticalCss(done) {
   // @TODO
   done();
}

function revCssJs(done) {

   return gulp
      .src(
         [
            package.paths.public + package.paths.dist.css + package.files.dist.css,
            package.paths.public + package.paths.dist.js + package.files.dist.js
         ],
         {
            base: package.paths.public + package.paths.dist.base
         }
      )
      .pipe(rev())
      .pipe(gulp.dest(package.paths.public + package.paths.dist.base))
      .pipe(rev.manifest(
         {
            base: "./"
         }
      ))
      .pipe(revDel(
         {
            oldManifest: "./rev-manifest.json",
            dest: package.paths.public + package.paths.dist.base
         }
      ))
      .pipe(gulp.dest("./"))
      .pipe(notify("Revved CSS / JS"));

}

function browserFeatures() {

   return gulp
      .src(package.paths.assets.js + "**/*")
      .pipe(modernizr())
      .pipe(gulp.dest(package.paths.assets.js))
      .pipe(notify("Determined Browser Features"));

}

function watch(done) {

   gulp.watch(
      [
         'package.json',
         package.files.tailwind,
         package.paths.assets.scss + "**/*",
      ],
      css
   );

   gulp.watch(
      [
         'package.json',
         package.paths.assets.js + "**/*"
      ],
      js
   );

   gulp.watch(package.paths.templates + "**/*.{html,twig,vue}", browserSyncReload);

   gulp.watch(package.paths.assets.images + "**/*", images);

   done();

}

exports.browserSync = browserSync;
exports.browserSyncReload = browserSyncReload;
exports.css = css;
exports.js = js;
exports.images = images;
exports.favicon = favicon;
exports.purgeCss = purgeCss;
exports.criticalCss = criticalCss;
exports.revCssJs = revCssJs;
exports.browserFeatures = browserFeatures;
exports.watch = watch;

exports.dev = gulp.series(browserFeatures, css, js, images, watch, browserSync);
exports.production = gulp.series(
   gulp.parallel(browserFeatures, css, js),
   purgeCss,
   criticalCss,
   revCssJs,
   favicon,
   images
);
