var request = require('request');

function Blob(id, data, immutio) {
  this.id = id;
  this.data = data;
  this.immutio = immutio;
}

Blob.prototype.postOptions = function () {
  var options = {
    url: this.immutio.storeUrl(),
    followRedirect: false,
    body: this.body()
  };

  if(this.isJSON()) {
    options.json = true;
  }

  options.headers = {
    'content-type': this.contentType()
  };

  return options;
};

Blob.prototype.isJSON = function () {
  return !this.isBuffer() && !this.isString();
};

Blob.prototype.isBuffer = function () {
  return Buffer.isBuffer(this.data);
};

Blob.prototype.isString = function () {
  return typeof this.data === 'string';
};

Blob.prototype.contentType = function () {
  if(this.isJSON()) {
   return 'application/json';
  }
  if(this.isBuffer()) {
    return 'application/octet-stream';
  }
  return 'text/plain';
};

Blob.prototype.location = function (location) {
  if(location) {
    this.id = this.immutio.idFromUrl(location);
  }
  return this.immutio.retrieveUrl(this.id);
};

Blob.prototype.body = function (body) {
  if(body) {
    this.data = body;
  }
  return this.data;
};

Blob.prototype.store = function (callback) {
  return request.post(this.postOptions(), function (err, response) {
    if(err) return callback(err);
    if(response.statusCode !== 303) {
      return callback(new Error("Unknown error while storing: " + response.statusCode + " " + response.body));
    }

    this.location(response.headers.location);

    callback(null, this);
  }.bind(this));
};

Blob.prototype.retrieve = function (callback) {
  return request.get(this.location(), function (err, response) {
    if(err) return callback(err);

    this.body(response.body);

    callback(null, this);
  }.bind(this));
};

module.exports = Blob;
