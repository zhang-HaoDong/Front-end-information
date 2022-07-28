const { src, dest, watch, series } = require('gulp');
// var smushit = require('gulp-smushit');
// const imagemin = require("gulp-imagemin");
const less = require('gulp-less');
const htmlClean = require('gulp-htmlclean');
const cssClean = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

const connect = require('gulp-connect');
const folder = {
    src: "src/",
    dist: "dist/"
}
function html() {
    return src(folder.src + "html/*")
        .pipe(htmlClean())
        .pipe(dest(folder.dist + "html/"))
        .pipe(connect.reload());
    ;
}
function css() {
    return src(folder.src + "css/*")
        .pipe(less())
        .pipe(cssClean())
        .pipe(dest(folder.dist + "css/"))
        .pipe(connect.reload());
    ;
}
function js() {
    return src(folder.src + "js/*")
        // .pipe(stripDebug()) 
        .pipe(uglify())
        .pipe(dest(folder.dist + "js/"))
        .pipe(connect.reload());;
}
// async function img() {
//     // console.log(imagemin);
//     return src(folder.src + "image/*")
//         .pipe(imagemin())
//         .pipe(dest(folder.dist + "image/"));
// }
async function img() {
    // console.log(imagemin);
  import("gulp-imagemin").then(r => {
    return src(folder.src + "image/*")
    .pipe(r.default())
    .pipe(dest(folder.dist + "image/"));
   })
}
function server() {
    connect.server({
        port: '1573',
        livereload: true,
    });
}
watch(folder.src + "html/*", function (cb) {
    html();
    cb();
});
watch(folder.src + "css/*", function (cb) {
    css();
    cb();
});
watch(folder.src + "js/*", function (cb) {
    js();
    cb();
});

exports.default = series(html, css, js, img, server);