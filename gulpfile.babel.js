import gulp from "gulp";
import gpug from "gulp-pug";
// import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

// local routes for files
const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
};

// cleaning previous compiled results
// 주석처리 한 것은 차후 실수해서 지우고 다시 빌드할 필요가 생길때. prepare는 dev에 넣는다.
//const clean = () => del(["build/"]);

// compiling pug.js to html - https://www.npmjs.com/package/gulp-pug
// compiled results at ./build
const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

// running webserver funct options: https://www.npmjs.com/package/gulp-webserver#options
const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

// image optimization
// compiled results are at ./build
const img_opt = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

// watch is web reloader on save at .pug files
// watch compilation of pug_to_html task: https://gulpjs.com/docs/en/api/watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img_opt);
};

// grouping actions: series is sequential and parellel is simultaneous
const prepare = gulp.series([img_opt]);
const assets = gulp.series([pug]);
const postDev = gulp.parallel([webserver, watch]);

// common and all action groups in the series
export const dev = gulp.series([prepare, assets, postDev]);
