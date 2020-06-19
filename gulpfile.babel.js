import gulp from "gulp";
import gpug from "gulp-pug";
// import del from "del";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

//const clean = () => del(["build"]);

//const prepare = gulp.series([clean]);
//* 주석처리 한 것은 차후 실수해서 지우고 다시 빌드할 필요가 생길때. prepare는 dev에 넣는다.

const assets = gulp.series([pug]);

export const dev = gulp.series([assets]);
