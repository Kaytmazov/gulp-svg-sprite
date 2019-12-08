'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');


// SVG sprite
function svgSprite(project) {
  return src(`assets/${project}/svg-sprite/*.svg`)
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(dest(`../react-apps/${project}/src`));
}


// SVG min
function svgMin(project) {
  return src(`assets/${project}/svg-min/*.svg`)
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(dest(`./svg-min${project}`));
}

exports.opendag = () => svgSprite('open-dagestan');
exports.billboard = () => svgSprite('billboard');
exports.opendagMin = () => svgMin('open-dagestan');
exports.billboardMin = () => svgMin('billboard');
