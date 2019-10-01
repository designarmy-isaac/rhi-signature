import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import data from 'gulp-data';
import open from 'gulp-open';
import rename from 'gulp-rename';
import fse from 'fs-extra';
import del from 'del';

const paths = {
  templates: 'src/*.html',
  data: 'data/data.json',
  dest: 'dist'
}

/* ====================================
   ==================================== Clean Dist Folder
   ================================= */

export const clean = () => del([paths.dest]);


/* ====================================
   ==================================== Compile data and templates
   ================================= */ 


export function compile() {
  var people = JSON.parse(fse.readFileSync(paths.data)); // parses data
  people.forEach(function (p) {
    var email = p.email;
    var regex = /.+?(?=@)/g;
    var un = email.match(regex);
    console.log(un);
    
    return gulp.src(paths.templates)
      .pipe(data(p))
      .pipe(nunjucks.compile())
      .pipe(rename(function (path) {
        path.basename = un + '-' + path.basename;
      }))
      .pipe(gulp.dest(paths.dest))
      .pipe(open())
  })
}

const build = gulp.series(clean, compile);

export function watch() {
  build();
  gulp.watch([paths.templates, paths.data], compile);
}

export default build;