## available-slug

[Slugifies your string](http://github.com/azer/to-slug) and makes sure it's returning a result that is available to register.

## Install

```bash
$ npm install available-slug
```

## Usage

```js
var slug = require('available-slug')('/my-api/check-availability?check={slug}')

slug('yo wassup', function (error, result) {

  error
  // => undefined

  result
  // => yo-wassup

});
```

If your server returns false value for `yo-wassup`, then the first available from following options will be returned;

* yo-wassup-new
* yo-wassup-2014
* yo-wassup-december
* yo-wassup-{random 4 digits number here}

Your server needs to return parseable JSON, either;

```js
false
```

or:

```
{ available: false }
```
