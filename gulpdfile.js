const { src, dest, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');

function css() {
  return src('src/*.css')
    .pipe(cleanCSS())
    .pipe(dest('public'));
}

exports.build = series(css);
