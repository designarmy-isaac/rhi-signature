'use strict';

import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import data from 'gulp-data';
import open from 'gulp-open';
import rename from 'gulp-rename';
import fse from 'fs-extra';
import clean from 'gulp-clean';

const paths = {
  templates: 'src/templates/*.html',
  data: 'data/data.json',
  dest: 'dist',
  index: 'src/index.html'
}

export const cl = () => {
  return gulp.src(paths.dest, {read: false, allowEmpty: true})
    .pipe(clean());
};



gulp.task('build', () => {
  var people = JSON.parse( fse.readFileSync( paths.data ) );
  
  people.forEach(function (p) {
    var email = p.email,
        regex = /.+?(?=@)/g,
        un = email.match(regex);
    
    return gulp.src(paths.templates)
    .pipe(data(p))
    .pipe(nunjucks.compile())
    .pipe(rename(function (path) {
      path.basename = un + '-' + path.basename;
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(open())
  });
});


// WIP

//  var people = JSON.parse( fse.readFileSync( paths.data ) ),
//      signatures = () => {
//        var a = [];
//        people.forEach(function (p) {
//          var email = p.email,
//              regex = /.+?(?=@)/g,
//              un = email.match(regex),
//              short = un + '-short.html',
//              long = un + '-long.html';
//
//          a.push(short); 
//          a.push(long);
//          });
//        return a;
//      };
//

//gulp.task('index', () => {
//  console.log(signatures);
//  return gulp.src(paths.index)
//    .pipe(data(() => (signatures)))
//    .pipe(nunjucks.compile())
//    .pipe(gulp.dest(paths.dest))
//    .pipe(open());
//  
//  console.log(signatures);
//  
//});



gulp.task('default', (cb) => {
  gulp.series('cl', 'build');
  cb();
});
