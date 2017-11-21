'use strict';
require('should');
const wd = require('macaca-wd');
const key_map = require('webdriver-keycode');
var moment =require('moment');
moment.locale('zh-cn');
var today={};
var _today=moment();
today.dasd=_today.format('YYYY-MM-DD-hh-mm-ss');
var produrl="/product/detail/260419";
// var br = process.env.browser || 'electron';
// br = br.toLowerCase();
describe('macaca-test', function () {

    this.timeout(5 * 60 * 1000);

    var dr = wd.promiseChainRemote({
        host: 'localhost',
        port: process.env.MACACA_SERVER_PORT || 3456
    });

    before( () => {
        return dr
            .init({
                platformName: 'desktop',
                browserName: 'electron',
                userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent',
                deviceScaleFactor: 2
            })
            // .maximize()
    });
    after(function () {
        return  dr
            .quit()
    });


    describe('macaca', function () {
        it('t', function () {
            const url = 'http://www.kjt.com';
            return dr
                .get(url)
                .sleep(2000)
                .elementByLinkText('请登录').click()
                 .sleep(1000)
                .elementByIdIfExists('input_login_name').sendKeys('18708151438')
                .elementByIdIfExists('input_login_pwd').sendKeys('zang1020330')
                .elementByIdIfExists('PageLoginBtn').click()
                .sleep(2000)
                .get(url+produrl)
                .waitForElementByXPath('//*[@id="main"]/div/div[1]/div[2]/div[1]/div[2]/div[4]/ul/li/div/a[1]').click()
                .quit()
        })
    });
});