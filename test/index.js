var Immutio = require('../index');
var im = new Immutio();
var assert = require('assert');

var multilineStr = "my sample string\n" + "with multiple lines.";

im.store(multilineStr, function (err, id) {
  if(err) throw err;

  assert(id);
  console.info("multiline string stored.");

  im.retrieve(id, function (err, retrievedStr) {
    if(err) throw err;

    assert.equal(retrievedStr, multilineStr);
    console.info("multiline string retrieved.");
  });
});

var json = {
  my: "obj"
};

im.store(json, function (err, id) {
  if(err) throw err;

  assert(id);
  console.info("json stored.");

  im.retrieve(id, function (err, retrievedObj) {
    if(err) throw err;

    assert.deepEqual(retrievedObj, json);
    console.info("json retrieved.");
  });
});

var jsonBuf = new Buffer(JSON.stringify(json));

im.store(jsonBuf, "application/json", function (err, id) {
  if(err) throw err;

  assert(id);
  console.info("json buffer stored.");

  im.retrieve(id, function (err, retrievedObj) {
    if(err) throw err;

    assert.deepEqual(retrievedObj, json);
    console.info("json buffer retrieved.");
  });
});

var buf = new Buffer("A simple string");

im.store(buf, function (err, id) {
  if(err) throw err;

  assert(id);
  console.info("buffer stored.");

  im.retrieve(id, function (err, retrievedBuf) {
    if(err) throw err;

    assert.deepEqual(retrievedBuf, buf);
    console.info("buffer retrieved.");
  });
});
