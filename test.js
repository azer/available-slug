var slug = require("./")('/my-api/{slug}');
var test = require("prova");

test('getting first available slug', function (t) {
  t.plan(10);

  slug('foo', function (error, result) {
    t.error(error);
    t.equal(result, 'foo-2014');
  });

  slug('bar', function (error, result) {
    t.error(error);
    t.equal(result, 'bar');
  });

  slug('qux', function (error, result) {
    t.error(error);
    t.equal(result, 'qux');
  });

  slug('quux', function (error, result) {
    t.error(error);
    t.equal(result, 'quux-new');
  });

  slug('corge', function (error, result) {
    t.error(error);
    t.ok(/^corge-\d+$/.test(result));
  });
});
