'use strict';

require('should');
const opn = require('opn');
const path = require('path');
const KEY_MAP = require('webdriver-keycode');
const wd = require('macaca-wd');

var platform = process.env.platform || 'Android';
platform = platform.toLowerCase();

const pkg = require('../package');


var androidOpts = {
    platformName: 'Android',
    autoAcceptAlerts: false,
    isWaitActivity: true,
    //reuse: 3,
    //udid: '',
    //package: 'com.github.android_app_bootstrap',
    //activity: 'com.github.android_app_bootstrap.activity.WelcomeActivity',
    app: 'https://npmcdn.com/android-app-bootstrap@latest/android_app_bootstrap/build/outputs/apk/android_app_bootstrap-debug.apk'
};

// override custom wd

describe('macaca-test/mobile-app-sample.test.js', function() {
    this.timeout(10 * 60 * 1000);

    const driver = wd.promiseChainRemote({
        host: 'localhost',
        port: 3456
    });

    driver.configureHttp({
        timeout: 600 * 1000
    });

    before(function() {
        return driver
            .init(isIOS ? iOSOpts : androidOpts)
            .sleep(10 * 1000);
    });

    after(function() {

        return driver
            .sleep(1000)
            .quit()
            .sleep(1000)
            .then(() => {
            opn(path.join(__dirname, '..', 'reports', 'index.html'));
    });
    });

    afterEach(function() {
        return driver
            .customSaveScreenshot(this)
            .sleep(1000)
    });

    describe('login page test', function() {

        it('#0 should login success', function() {
            return driver
            /*
            .title()
            .then(data => {
              console.log(`current focus ${isIOS ? 'viewController' : 'activity'}: ${data}`);
            })
            */
                .getWindowSize()
                .then(size => {
                console.log(`current window size ${JSON.stringify(size)}`);
        })
        .appLogin('中文+Test+12345678', '111111');
        });

    });

    describe('home page test', function() {

        it('#0 should display home', function() {
            return driver
                .source()
                .then(res => {
                console.log(res);
        });
        });

    });

    describe('list page test', function() {

        it('#0 should scroll tableview', function() {
            return driver
                .testGetProperty()
                .waitForElementByName('HOME')
                .click()
                .waitForElementByName('list')
                .click()
                .sleep(2000);
        });

    });
});
