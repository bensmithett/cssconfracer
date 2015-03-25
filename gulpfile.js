var gulp = require("gulp");
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var runSequence = require("run-sequence");

var BUILD_DIR = "build";
var DEPLOY_DIR = "deploy";

gulp.task("revAssets", function() {
  return gulp.src(BUILD_DIR + "/**/*")
    .pipe(rev())
    .pipe(gulp.dest(DEPLOY_DIR))
    .pipe(rev.manifest({
      base: ""
    }))
    .pipe(gulp.dest(DEPLOY_DIR));
});

gulp.task("copyHTML", function () {
  return gulp.src("index.html")
    .pipe(gulp.dest(DEPLOY_DIR));
});

// Rewrites in CSS & JS files to the paths specified in the generated rev-manifest.json
gulp.task("rewriteUrls", ["revAssets"], function(){
  return gulp.src([DEPLOY_DIR + "/rev-manifest.json", DEPLOY_DIR + "/**/*.{js,html}"])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest(DEPLOY_DIR));
});

gulp.task("default", function(cb) {
  runSequence("revAssets", "copyHTML", "rewriteUrls", cb);
});
