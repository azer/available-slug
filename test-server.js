var api = require("circle")({
  '/:slug': check
});

var results = {
  'foo': false,
  'foo-new': false,
  'foo-2014': true,
  'bar': true,
  'qux': { available: true },
  'quux': { available: false },
  'quux-new': true,
  'corge': { available: false },
  'corge-new': false,
  'corge-2014': false,
  'corge-december': false
};

api.start(8080);

function check (reply, match) {
  reply(undefined, results[match.params.slug] || false);
}
