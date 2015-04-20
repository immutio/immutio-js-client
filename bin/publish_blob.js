var Immutio = require('../'),
    im = new Immutio(),
    fs = require('fs'),
    path = require('path'),
    readmeName = path.resolve(__dirname, '../README.md'),
    readme = fs.readFileSync(readmeName, { encoding: 'utf8' }),
    dist = fs.readFileSync(path.resolve(__dirname, '../dist/immutio.min.js'), { encoding: 'utf8' });

im.store(dist, function (err, id) {
  if(err) throw err;
  readme = readme.replace(/http:\/\/immut\.io\/blobs\/(.+)"/, "http://immut.io/blobs/" + id + "\"");
  fs.writeFileSync(readmeName, readme, { encoding: 'utf8' });
});
