var request = require('request');

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
  if(this.type) {
    return this.type;
  }

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
  if(this.isBuffer()) {
    return this.data.toString('utf8')
  }
  if(this.isJSON()) {
    return JSON.stringify(this.data);
  }
  return this.data;
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

    this.body(response.body);

    callback(null, this);
  }.bind(this));
};

module.exports = Blob;
