var fs = require('fs');
var path = require('path');

var getFilesInDir = function (dir) {

  var results = [path.resolve(dir)];
  var files = fs.readdirSync(dir, 'utf8');
  files.forEach((item) => {
    var url = path.resolve(dir, item)
    console.log('url===',url)
    fs.stat(url, function (err, stats) {
      console.log('tt====',err)
      if (err) throw err;
      if (stats.isFile()) {
        results.push(url)
      } else if (stats.isDirectory()) {
        console.log('dir====',)
        getFilesInDir(url)
      }
    })
    results.push(url)
  })

  return results;
};
var files = getFilesInDir('./test');
console.log(files);