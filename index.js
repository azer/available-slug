var toSlug = require("to-slug");
var formatDate = require("format-date");
var format = require("format-text");
var loop = require("serial-loop");
var request = require("xhr");

module.exports = init;

function init (api) {
  return function (title, callback) {
    firstAvailable(api, title, callback);
  };
}

function firstAvailable (api, title, callback) {
  var all = generateSlugs(title);

  loop(all.length, each, function (error) {
    if (error) return callback(error);
    callback(undefined, random(title));
  });

  function each (next, index) {
    var slug = all[index];

    check(api, all[index], function (error, ok) {
      if (error) return next(error);
      if (!ok) return next();

      callback(undefined, all[index]);
    });
  }
};

function check (api, slug, callback) {
  request(format(api, { slug: slug }), function (error, response, body) {
    if (error) return callback(error);

    var parsed = JSON.parse(body);

    if (!parsed) return callback(undefined, false);
    if (parsed && parsed.available === false) return callback(undefined, false);
    if (parsed && parsed.result === false) return callback(undefined, false);
    if (parsed && parsed.result && parsed.result.available === false) return callback(undefined, false);

    callback(undefined, true);
  });
}

function generateSlugs (title) {
  return [title,
          title + ' new',
          title + formatDate(' {year}'),
          title + formatDate(' {month-name}')
         ].map(toSlug);
}

function random (title) {
  return toSlug(title + ' ' + Math.floor(Math.random() * 9999));
}
