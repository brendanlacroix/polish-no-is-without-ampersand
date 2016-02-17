define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-is-without-ampersand',

    message: function () {
      assert.strictEqual(plugin.message, 'State-modifying classes (ones that begin with .is-) should always be preceded by an ampersand.');
    }
  });

  registerSuite({
    name: 'polish-no-is-without-ampersand SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 3);
        assert.equal(errors[0].node.toString().trim(), '.is-because-of-a-missing-ampersand');
        assert.equal(errors[1].node.toString().trim(), '.is-this-one');
        assert.equal(errors[2].node.toString().trim(), '#is-this-rule-will-fail');
      }));
    }
  });
});