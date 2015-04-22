var request = require('request'),
    types = require('./types');

function Blob(options, immutio) {
  if(arguments.length < 2) {
    immutio = options;
    options = null;
  }
  options = options || {};
  this.id = options.id;
  this.data = options.data;
  this.type = options.type;
  this.immutio = immutio;
}

Blob.prototype.postOptions = function () {
  var options = {
    url: this.immutio.storeUrl(),
    followRedirect: false,
    body: this.body(),
    // prevents auto-parsing of response, which is never json
    json: false,
    headers: {
      'content-type': this.contentType()
    }
  };

  return options;
};

Blob.prototype.contentType = function () {
  return types.getType(this.data, this.type);
};

Blob.prototype.location = function (location) {
  if(location) {
    this.id = this.immutio.idFromUrl(location);
  }
  return this.immutio.retrieveUrl(this.id);
};

Blob.prototype.body = function (body, contentType) {
  if(arguments.length > 0) {
    this.data = types.deserialize(body, contentType || types.text.contentType);
    return body;
  }

  return types.serialize(this.data, this.type);
};

Blob.prototype.store = function (callback) {
  return request.post(this.postOptions(), function (err, response) {
    if(err) return callback(err);

    if(response.statusCode === 200 || response.statusCode === 304) {
      this.location(response.body);
      return callback(null, this);
    }

    return callback(new Error("Unknown error while storing: " + response.statusCode + " " + response.body));
  }.bind(this));
};

Blob.prototype.retrieve = function (callback) {
  return request.get(this.location(), function (err, response) {
    if(err) return callback(err);

    this.body(response.body, response.getHeader('Content-Type'));

    callback(null, this);
  }.bind(this));
};

module.exports = Blob;
