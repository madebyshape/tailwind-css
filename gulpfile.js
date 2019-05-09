gulp.task(
   'default',
   ['watch', 'browser-sync']
);

gulp.task(
   'build',
   ['css', 'js', 'replace', 'imagemin']
);


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
