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
