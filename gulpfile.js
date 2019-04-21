
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "src/css"
    },

    scripts: {
        src: "src/js/*.js"
    }
};

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(browserSync.stream());
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
};

function reload(done) {
    browserSync.reload();
    done();
};

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch("src/*.html", reload);
};

exports.watch = watch;

exports.style = style;
exports.scripts = scripts;

var build = gulp.parallel(style, scripts, watch);

gulp.task('default', build);