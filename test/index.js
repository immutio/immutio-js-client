var Immutio = require('../index');
var im = new Immutio();
var multilineStr = "my sample string\n" + "with multiple lines.";

im.store(multilineStr, function (err, id) {
  if(err) throw err;

  console.log(multilineStr, "stored as", id);

  im.retrieve(id, function (err, retrievedStr) {
    if(err) throw err;

    console.log(id, "retrieved", retrievedStr);
  });
});

var json = {
  my: "obj"
};

im.store(json, function (err, id) {
  if(err) throw err;

  console.log(json, "stored as", id);

  im.retrieve(id, function (err, retrievedObj) {
    if(err) throw err;

    console.log(id, "retrieved", JSON.parse(retrievedObj));
  });
});

var buf = new Buffer("A simple string");

im.store(buf, function (err, id) {
  if(err) throw err;

  console.log(buf, "stored as", id);

  im.retrieve(id, function (err, retrievedBuf) {
    if(err) throw err;

    console.log(id, "retrieved", new Buffer(retrievedBuf));
  });
});
