import { src, dest, watch, series, parallel } from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import newer from 'gulp-newer';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import cleanCSS from 'gulp-clean-css';

let paths = {
    style: {
        src: 'app/scss/',
        output: 'dist/',
    },
    script: {
        src: 'app/js/**/*.js',
        output: 'dist/',
    },
    img: {
        src: 'app/img/**/*',
        output: 'dist/img/',
    }
};

const style = () => (
    src(paths.style.src + 'style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.style.output))
        // .pipe(browserSync.stream());
)

const script = () => (
    src(paths.script.src)
        .pipe(newer(paths.script.output))
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.script.output))
        .on('error', error => { console.error('' + error)})
        // .pipe(browserSync.stream());
)

const images = () => (
    src(paths.img.src)
        .pipe(newer(paths.img.output))
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(dest(paths.img.output))
);

// export const reload = () => browserSync.reload();
// export const clean = () => del(['dist']);

const watchForChanges = () => {
    // browserSync.init({ server: { baseDir: "./app"}});
    watch(paths.style.src + '**/*.scss', style);
    watch(paths.script.src, script);
}

export const dev = series(parallel(style, script, images), watchForChanges);
export const build = series(parallel(style, script, images));
export default dev;
