const { src, dest, series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

function moveHTMLFiles() {
  return src("src/*.html").pipe(dest("dist"));
}

function moveCSSFiles() {
  return src("src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/styles"));
  a;
}

function moveJsFiles() {
  return src("src/script/*.js")
    .pipe(sourcemaps.init())
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/script"));
}

exports.default = series(moveHTMLFiles, moveCSSFiles, moveJsFiles);
exports.moveHTML = moveHTMLFiles;
exports.moveCSS = moveCSSFiles;
exports.moveJS = moveJsFiles;
