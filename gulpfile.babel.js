import gulp from "gulp";
import gpug from "gulp-pug";
import we from "gulp-webserver";
// import del from "del";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

//const clean = () => del(["build"]);

//const prepare = gulp.series([clean]);
//* 주석처리 한 것은 차후 실수해서 지우고 다시 빌드할 필요가 생길때. prepare는 dev에 넣는다.

const webserver = () =>
  gulp.src("build").pipe(we({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
};

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([assets, postDev]);
