/*export async function test()
{
    console.log('it is working!!!');
}
export async function test2()
{
    console.log('it is working Repeat!!!');
}
*/

import { src, dest, parallel, series} from 'gulp';
import terser from 'gulp-terser';
import pug from 'gulp-pug';
import clean from 'gulp-clean';
import nop from 'gulp-nop';
import gulpSass from 'gulp-sass';
import { create } from 'browser-sync';
import * as dartSass from 'sass';

const 
    SRC = './SRC/',
    SRCNEW ='./SRCNEW/',
    DEST = './_DEST/',
    ALL_JS = SRCNEW + '**/*.js',
    ALL_PUG = SRCNEW + '**/*.pug',
    ALL_SASS = SRCNEW + 'style.sass',
    INCLUDES = SRCNEW + '_includes/**/*.*',
    browserSync = create(),
    sass = gulpSass(dartSass);

let
    minimization = false;

async function  switchProdMod()
{
    minimization = true;
}
export function js(){
    return src(ALL_JS)
    .pipe(minimization ? terser() : nop())
    .pipe(dest(DEST));
}
export function html() {
    return src([ALL_PUG, '!' + INCLUDES])
      //.pipe(pug({ pretty: !minimization, filters: pugFilters }))
      .pipe(pug({ pretty: !minimization }))
      .pipe(dest(DEST));
}
// export function html()
// {
//     return src(ALL_PUG)
//     .pipe(pug({pretty: !minimization}))
//     .pipe(dest(DEST));
// }

export async function css() {
    
        return src(ALL_SASS, { sourcemaps: !minimization })
          .pipe(sass({ outputStyle: minimization ? 'compressed' : 'expanded' }))
          .pipe(dest(DEST, { sourcemaps: '.' }));
      
}

export async function serv() {
    browserSync.init({ server: { baseDir: DEST } });
}

async function upload() { console.log('Загружаем файлы на сервер....') }

export function clearDir() {
    return src(DEST + '**/*.*', { read: false })
      // .pipe(debug())
      .pipe(clean());
  }

export const make = parallel(html,css,js);
export const dev = series(make, serv);
export const prod = series(clearDir, switchProdMod, make, upload);