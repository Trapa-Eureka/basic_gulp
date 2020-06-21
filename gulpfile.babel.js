import gulp from "gulp";
import gpug from "gulp-pug";
// import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

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

//const clean = () => del(["build/"]);
//* 주석처리 한 것은 차후 실수해서 지우고 다시 빌드할 필요가 생길때. prepare는 dev에 넣는다.

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const img_opt = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img_opt);
};

const prepare = gulp.series([img_opt]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);
