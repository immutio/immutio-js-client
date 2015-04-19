var Blob = require('./lib/blob'),
    merge = require('merge'),
    defaults = {
      host: "immut.io",
      protocol: "http",
      namespace: "/blobs"
    };

function Immutio(options) {
  options = merge(defaults, options || {});
  this.host = options.host;
  this.protocol = options.protocol;
  this.namespace = options.namespace;
}

Immutio.prototype.baseUrl = function () {
  return this.protocol + '://' + this.host;
};

Immutio.prototype.storeUrl = function () {
  return this.baseUrl() + this.namespace;
};

Immutio.prototype.retrieveUrl = function (id) {
  return this.baseUrl() + this.namespace + "/" + id;
};

Immutio.prototype.idFromUrl = function (url) {
  var id;
  if(url.indexOf(this.baseUrl()) === 0) {
    id = url.split(this.storeUrl() + "/")[1];
  } else {
    id = url.split(this.namespace + "/")[1];
  }

  return id;
};

Immutio.prototype.store = function (data, callback) {
  var blob = new Blob(null, data, this);
  return blob.store(function (err, blob) {
    if(err) return callback(err);
    callback(null, blob.id);
  });
};

Immutio.prototype.retrieve = function (id, callback) {
  var blob = new Blob(id, null, this);
  return blob.retrieve(function (err, blob) {
    if(err) return callback(err);
    callback(null, blob.data);
  });
};

Immutio.Blob = Blob;

module.exports = Immutio;

