var helpers = require('../helpers');

helpers.startCasper('/mozpay/', function(){
  helpers.fakePinData({pin: true, pin_was_locked_out: true});
});

casper.test.begin('Login then was-locked', {
  test: function(test) {

    helpers.doLogin();

    casper.waitForUrl(helpers.url('was-locked'), function() {
      test.assertSelectorHasText('h1', 'Your Pin was locked');
    });

    casper.run(function() {
      test.done();
    });

  },
});
