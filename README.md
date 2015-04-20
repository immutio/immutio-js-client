Javascript Client for immut.io
==============================
Store and retrieve arbitrary blobs from immut.io
from a Node.js, io.js, or browser Javascript application.

See [immut.io](http://immut.io) for more information.

Installation
------------

With npm:

```
npm install immutio-client
```

With bower:

```
bower install immutio-client
````

The library can be included using CommonJS module syntax, or by including the script using the
compiled versions in `/dist`.

CommonJS:

```
var Immutio = require('immutio-client');
var im = new Immutio();
```

Standalone:

```
<script type="text/javascript" src="dist/immutio-client.js"></script>
<script>
  var im = new Immutio();
</script>
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
4. Test and Build (`npm run build`, `npm run build-tests && open test/browser.html`)
5. Make a pull request

TODO
----

1. Add streams support


