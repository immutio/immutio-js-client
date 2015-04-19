Javascript Client for immut.io
==============================
Store and retrieve arbitrary blobs from immut.io
from a Node.js, io.js, or browser Javascript application.

See [immut.io](http://immut.io) for more information.

Installation
------------

Node.js/io.js:

```
npm install immutio-client
```

```
var Immutio = require('immutio-client');
```

Browser (TODO):

```
bower install immutio-client
````

```
<script type="text/javascript" src="/immutio-client.js"></script>
```

Usage
-----

### Store something

```
var im = new Immutio();
im.store("my random string", function (err, id) {
  if(err) throw err;
  console.log(id); // e.g. 43841456-f062-406b-8cdf-70ddbb736415
});
```

### Retrieve something

```
var im = new Immutio();
im.retrieve("43841456-f062-406b-8cdf-70ddbb736415", function (err, str) {
  if(err) throw err;
  console.log(str); // e.g. my random string
});

```

Contributing
------------

1. Fork
2. Make your changes
3. Add tests
4. Make a pull request

TODO
----

1. Package up the module to be used in the browser using Browserify
2. Add a bower.json, and add to the bower registry
3. Add streams support


