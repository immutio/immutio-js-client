var types = exports;

types.text = {
  test: function (type) {
    return (/^text\/.+/).test(type);
  },
  testContent: function (content) {
    return typeof content === 'string';
  },
  contentType: "text/plain",
  deserialize: function (str) {
    return str.toString();
  },
  serialize: function (str) {
    return str.toString();
  }
};

types.json = {
  test: function (type) {
    return type === this.contentType;
  },
  testContent: function (content) {
    return !types.buffer.testContent(content) && !types.text.testContent(content) && typeof content === 'object';
  },
  contentType: "application/json",
  deserialize: function (str) {
    return JSON.parse(str.replace(/\\/g, ""));
  },
  serialize: function (json) {
    if(Buffer.isBuffer(json)) {
      json = json.toString('utf8');
    }
    if(typeof json === 'object') {
      return JSON.stringify(json);
    }
    return json;
  }
};

types.buffer = {
  test: function (type) {
    return type === this.contentType;
  },
  testContent: function (content) {
    return Buffer.isBuffer(content);
  },
  contentType: "application/octet-stream",
  deserialize: function (str) {
    return new Buffer(str);
  },
  serialize: function (buf) {
    return buf.toString('utf8');
  }
};

types.deserialize = function (data, contentType) {
  var allTypes = [types.text, types.json, types.buffer];

  for(var i=0; i<allTypes.length; i++) {
    var type = allTypes[i];
    if(type.test(contentType)) {
      return type.deserialize(data);
    }
  }

  return data;
};

types.serialize = function (data, contentType) {
  var allTypes = [types.text, types.json, types.buffer];
  contentType = types.getType(data, contentType);

  for(var i=0; i<allTypes.length; i++) {
    var type = allTypes[i];
    if(type.test(contentType)) {
      return type.serialize(data);
    }
  }

  return data;
};

types.getType = function (data, contentType) {
  if(contentType) return contentType;

  var allTypes = [types.text, types.json, types.buffer];

  for(var i=0; i<allTypes.length; i++) {
    var type = allTypes[i];
    if(type.testContent(data)) {
      return type.contentType;
    }
  }

  return types.text.contentType;
};
