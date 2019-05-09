// ===============================
//
// Dependencies
//
// ===============================

var gulp = require('gulp'),
   sequence = require('run-sequence'),
   watch = require('gulp-watch'),
   sass = require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps'),
   critical = require('critical'),
   autoprefixer = require('gulp-autoprefixer'),
   concat = require('gulp-concat'),
   imagemin = require('gulp-imagemin'),
   uncss = require('gulp-uncss'),
   cleanCSS = require('gulp-clean-css'),
   uglify = require('gulp-uglify'),
   notify = require("gulp-notify"),
   browserSync = require('browser-sync').create(),
   plumber = require('gulp-plumber'),
   modernizr = require("gulp-modernizr"),
   rev = require('gulp-rev'),
   revDel = require('rev-del'),
   favicons = require("favicons").stream,
   sassGlob = require('gulp-sass-glob'),
   purgecss = require('gulp-purgecss');

// ===============================
//
// JSON Files
//
// ===============================

const package = require('./package.json');
const modernizr_settings = require('./modernizr.json');

// ===============================
//
// Tasks - Individual
//
// ===============================


/* SASS */

gulp.task(
   'sass',
   function() {

      var cssFiles = [];

      cssFiles.push(package.paths.assets.sass + package.files.main.sass);

      for (var i = 0; i < package.cssDependencies.length; i++) {
         cssFiles.push(package.paths.assets.dependencies + package.cssDependencies[i]);
      }

      return gulp
         .src(
            cssFiles
         )
         .pipe(
            plumber({
               errorHandler: notify.onError({
                  title: 'Error',
                  message: 'Error Compiling SASS'
               })
            })
         )
         .pipe(
            sourcemaps.init()
         )
         .pipe(
            sassGlob()
         )
         .pipe(
            sass().on('error', sass.logError)
         )
         .pipe(
            autoprefixer({
               browsers: ['last 3 versions'],
               cascade: false
            })
         )
         .pipe(
            concat(package.files.main.css)
         )
         .pipe(
            sourcemaps.write('/')
         )
         .pipe(
            gulp.dest(package.paths.dist)
         )
         .pipe(
            browserSync.stream()
         )
         .pipe(
            notify({
               message: 'Compiled Sass'
            })
         );

   }
);

/* Javascript */

gulp.task(
   'javascript',
   function() {

      var javascriptFiles = [];

      for (var i = 0; i < package.javascriptDependencies.length; i++) {
         javascriptFiles.push(package.paths.assets.dependencies + package.javascriptDependencies[i]);
      }

      for (var i = 0; i < package.javascript.length; i++) {
         javascriptFiles.push(package.paths.assets.javascript + package.javascript[i]);
      }

      javascriptFiles.push(package.paths.assets.javascript + package.files.main.javascript);

      return gulp
         .src(
            javascriptFiles
         )
         .pipe(
            plumber({
               errorHandler: notify.onError({
                  title: 'Error',
                  message: 'Error Compiling Javascript'
               })
            })
         )
         .pipe(
            sourcemaps.init()
         )
         .pipe(
            concat(package.files.main.javascript)
         )
         .pipe(
            sourcemaps.write('/')
         )
         .pipe(
            gulp.dest(package.paths.dist)
         )
         .pipe(
            notify({
               message: 'Compiled Javascript'
            })
         );

   }
);

/* Modernizr */

gulp.task(
   'modernizr',
   function() {

      return gulp
         .src(
            package.files.javascript
         )
         .pipe(
            plumber({
               errorHandler: notify.onError({
                  title: 'Error',
                  message: 'Error Compiling Modernizr'
               })
            })
         )
         .pipe(
            modernizr(modernizr_settings)
         )
         .pipe(
            gulp.dest(package.paths.assets.javascript)
         )
         .pipe(
            notify({
               message: 'Compiled Modernizr'
            })
         );

   }
);

/* Font Awesome */

gulp.task(
   'font_awesome',
   function() {
      return gulp
         .src(
            package.paths.assets.dependencies + '@fortawesome/fontawesome-free-webfonts/webfonts/*'
         )
         .pipe(
            gulp.dest(package.paths.assets.fonts)
         )
   }
);

/* Images */

gulp.task(
   'images',
   function() {

      return gulp
         .src(
            [
               package.files.images,
               package.files.favicons
            ],
            {
               base: package.base
            }
         )
         .pipe(
            imagemin(
               [
                  imagemin.gifsicle(),
                  imagemin.jpegtran(),
                  imagemin.optipng(),
                  imagemin.svgo()
               ], {
                  verbose: true
               }
            )
         )
         .pipe(
            gulp.dest(package.base) // Put in same as source folder
         );

   }
);

/* Minify */

gulp.task(
   'minify_css',
   function() {

      return gulp
         .src(
            package.files.dist + '.css'
         )
         .pipe(
            plumber({
               errorHandler: notify.onError({
                  title: 'Error',
                  message: 'Error Minifying CSS'
               })
            })
         )
         .pipe(
            cleanCSS({
               compatibility: 'ie9'
            })
         )
         .pipe(
            gulp.dest(package.paths.dist)
         )
         .pipe(
            notify({
               message: 'Minified CSS'
            })
         );

   }
);

gulp.task(
   'minify_javascript',
   function() {

      return gulp
         .src(
            package.files.dist + '.js'
         )
         .pipe(
            plumber({
               errorHandler: notify.onError({
                  title: 'Error',
                  message: 'Error Minifying Javascript'
               })
            })
         )
         .pipe(
            uglify()
         )
         .pipe(
            gulp.dest(package.paths.dist)
         )
         .pipe(
            notify({
               message: 'Minified Javascript'
            })
         );

   }
);

/* Asset Rev */

gulp.task(
   'rev',
   function() {

      gulp
         .src(
            [
               package.output.css,
               package.output.javascript
            ], {
               base: package.paths.dist
            }
         )
         .pipe(
            rev()
         )
         .pipe(
            gulp.dest(package.paths.dist)
         )
         .pipe(
            rev.manifest('../../rev-manifest.json') // Put file outside of webroot
         )
         .pipe(
            revDel({
               dest: package.paths.dist
            })
         )
         .pipe(
            gulp.dest(package.paths.dist)
         );

   }
);

/* Favicon */

gulp.task(
   'favicons',
   function() {

      return gulp.src(package.paths.assets.images + 'favicon.jpg').pipe(favicons({
            appName: "Website",
            appDescription: null,
            developerName: package.author,
            developerURL: package.authorUrl,
            background: "#FFF",
            url: package.urls.production,
            display: "standalone",
            orientation: "portrait",
            version: 1.0,
            path: package.paths.assets.favicons.public,
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
         }))
         .pipe(gulp.dest(package.paths.assets.favicons.source));

   }
);

gulp.task(
   'favicons_html',
   function() {

      return gulp
         .src(
            package.paths.assets.favicons.source + 'favicons.html', {
               base: ''
            }
         )
         .pipe(
            gulp.dest(package.paths.templates + '_partials')
         );

   }
);

/* Critical */

function doSynchronousLoop(data, processData, done) {
   if (data.length > 0) {
      const loop = (data, i, processData, done) => {
         processData(data[i], i, () => {
            if (++i < data.length) {
               loop(data, i, processData, done);
            } else {
               done();
            }
         });
      };
      loop(data, 0, processData, done);
   } else {
      done();
   }
}

function processCriticalCSS(element, i, callback) {

   const criticalSrc = package.urls.critical + element.url;
   const criticalDest = package.paths.templates + element.template + '_critical.min.css';

   critical
      .generate({
            src: package.critical.target + element.url,
            dest: package.critical.output + element.template + '-critical.css',
            inline: false,
            ignore: [],
            base: package.base,
            pathPrefix: '/',
            css: [package.output.css],
            width: 1400,
            height: 900,
            minify: true,
            timeout: 60000
         },
         (err, output) => {
            if (err) {
               notify({
                  message: 'Error Critical CSS'
               })
            }
            callback();
         }
      );

}

gulp.task(
   'critical_css',
   (callback) => {

      doSynchronousLoop(
         package.critical.urls,
         processCriticalCSS,
         () => {
            callback();
            notify({
               message: 'Generated Critical CSS'
            })
         }
      );
   }
);

/* Purge CSS */

gulp.task(
   'purge_css',
   () => {

      return gulp
         .src(
            package.output.css
         )
         .pipe(
            purgecss(
               {
                  content: [package.files.templates + '.{html,twig}']
               }
            )
         )
         .pipe(
            gulp.dest(package.paths.dist)
         );

   }
);

/* Watch */

gulp.task(
   'watch',
   function() {

      browserSync.init({
         proxy: package.urls.local
      });

      gulp.watch(package.files.sass, ['sass']);
      gulp.watch(package.files.javascript, ['javascript-watch']);

   }
);

gulp.task(
   'javascript-watch', ['javascript'],
   function(done) {
      browserSync.reload();
      done();
   }
);

// ===============================
//
// Tasks - Environment
//
// ===============================

/* Development */

gulp.task(
   'development',
   function() {
      sequence('sass', 'javascript', 'font_awesome', 'modernizr');
   }
);

/* Production */

gulp.task(
   'production',
   function() {
      sequence(
         ['development'],
         ['favicons', 'favicons_html'],
         'images',
         ['minify_css', 'minify_javascript'],
         'critical_css',
         'rev'
      );
   }
);

/* Default */

gulp.task(
   'default',
   function() {
      sequence('watch', 'development');
   }
);

/* ******************************************************************************************************** */
