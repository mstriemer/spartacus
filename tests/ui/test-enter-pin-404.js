var helpers = require('../helpers');

helpers.startCasper('/mozpay/', function(){
  // Make pinStateCheck return false for pin.
  helpers.fakePinData({pin: true});
  // Make create-pin API call return 204
  helpers.fakePinData({pin: true}, 'POST', 404, '/mozpay/v1/api/pin/check/');
});

casper.test.begin('Login Enter Pin API call returns 404', {
  test: function(test) {

    helpers.doLogin();

    casper.waitForUrl(helpers.url('enter-pin'), function() {
      test.assertVisible('.pinbox', 'Pin entry widget should be displayed');
      this.sendKeys('.pinbox', '1234');
      test.assertExists('.cta:enabled', 'Submit button is enabled');
      this.click('.cta');
    });

    casper.waitUntilVisible('.full-error', function() {
      test.assertVisible('.full-error', 'Error page should be shown');
      helpers.assertErrorCode('PIN_ENTER_USER_DOES_NOT_EXIST');
    });

    casper.run(function() {
      test.done();
    });
  },
});
