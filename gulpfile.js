var gulp = require('gulp'),
  concat = require('gulp-concat'),
  htmllint = require('gulp-htmllint'),
  uglify = require('gulp-uglify'),
  util = require('gulp-util'),
  eslint = require('gulp-eslint'),
  replace = require('gulp-replace'),
  insert = require('gulp-insert'),
  inquirer = require('inquirer'),
  semver = require('semver'),
  exec = require('child_process').exec,
  fs = require('fs'),
  package = require('./package.json'),
  browserify = require('browserify'),
  streamify = require('gulp-streamify'),
  source = require('vinyl-source-stream'),
  merge = require('merge-stream'),
  watch = require('gulp-watch');

var srcDir = './src/';
var outDir = './';

var header = "/*!\n\
 * chartjs-plugin-annotation.js\n\
 * http://chartjs.org/\n\
 * Version: {{ version }}\n\
 *\n\
 * Copyright 2016 Evert Timberg\n\
 * Released under the MIT license\n\
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md\n\
 */\n";

gulp.task('build', buildTask);
gulp.task('bump', bumpTask);
gulp.task('lint-html', lintHtmlTask);
gulp.task('lint-js', lintJsTask);
gulp.task('lint', gulp.parallel('lint-html', 'lint-js'));
gulp.task('watch', watchTask);

function buildTask() {
  var nonBundled = browserify('./src/index.js')
    .ignore('chart.js')
    .ignore('hammerjs')
    .bundle()
    .pipe(source('chartjs-plugin-annotation.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir))
    .pipe(streamify(uglify({
      output: {
          comments: 'some'
      }
    })))
    .pipe(streamify(concat('chartjs-plugin-annotation.min.js')))
    .pipe(gulp.dest(outDir));

  return nonBundled;

}

/*
 *  Usage : gulp bump
 *  Prompts: Version increment to bump
 *  Output: - New version number written into package.json
 */
function bumpTask(complete) {
  util.log('Current version:', util.colors.cyan(package.version));
  var choices = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'].map(function(versionType) {
    return versionType + ' (v' + semver.inc(package.version, versionType) + ')';
  });
  inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'What version update would you like?',
    choices: choices
  }).then(function(res) {
    var increment = res.version.split(' ')[0],
      newVersion = semver.inc(package.version, increment);

    // Set the new versions into the package object
    package.version = newVersion;

    // Write these to their own files, then build the output
    fs.writeFileSync('package.json', JSON.stringify(package, null, 2));

    complete();
  });
}

function lintJsTask() {
  var files = [
//    'samples/**/*.html',
//    'samples/**/*.js',
    'src/**/*.js',
    'test/**/*.js'
  ];

  // NOTE(SB) codeclimate has 'complexity' and 'max-statements' eslint rules way too strict
  // compare to what the current codebase can support, and since it's not straightforward
  // to fix, let's turn them as warnings and rewrite code later progressively.
  var options = {
    rules: {
      'complexity': [1, 10],
      'max-statements': [1, 30]
    }
  };

  return gulp.src(files)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintHtmlTask() {
  return gulp.src('samples/**/*.html')
    .pipe(htmllint({
      failOnError: true,
    }));
}

function watchTask() {
  buildTask();
  gulp.watch('src/**/*.js', gulp.parallel('lint', 'build'));
}
