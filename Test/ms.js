'use strict';
require('should');
const wd = require('macaca-wd');
const key_map = require('webdriver-keycode');
var fs =require('fs');
var moment =require('moment');
moment.locale('zh-cn');
var today={};
var _today=moment();
today.dasd=_today.format('YYYY-MM-DD-hh-mm-ss');
var produrl="/product/detail/260419";




for (var i=1;i>0;i--)
{
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
            .maximize()
    });
    after(function () {
        return  dr
            .quit()
    });
    describe('macaca', function (){
        it('test for ms', function () {
            const url = 'http://m.kjt.com';
            return dr
                .get(url)
                .sleep(2000)
                //     .elementsByTagName('title').text()
                //     .then(value=>{
                //         value.should.containEql("跨境通商城");
                // })
                .get(url+produrl)
                .waitForElementById('goCheckout').click()

                .waitForElementByXPath('/html/body/header/h2').text()
                .then(value=>{
                    value.should.containEql("登录");
            })
        .waitForElementById('phoneNumId').sendKeys('18708151438')
        .waitForElementById('pwdId').sendKeys('zang1020330')
                .waitForElementById('loginBtn').click()
                .sleep(2000)
                .waitForElementByXPath('/html/body/header/h2').text()
                .then(value=>{
                value.should.containEql("核对订单");
        })
        .waitForElementByClassName('btn_booklist_sub').click()
                .sleep(2000)
                .elementByLinkText('立即支付').click()
                .sleep(2000)
                .elementByLinkText('我的').click()
                .execute('window.scrollTo(0,350)')
                .waitForElementByXPath('/html/body/div[3]/div[2]/ul/li[1]/a').click()
                .sleep(1000)
                .waitForElementByXPath('//*[@id="hdOrder"]/li[2]').click()
                .waitForElementByXPath('//*[@id="ulorder"]/li[1]/div[3]/div[2]/a[1]').click()
                .elementById('cancleOrder').click()
                .elementByLinkText('丢掉').click()
                .sleep(2000)
                .catch(e=> {
                dr.saveScreenshot(today.dasd+'.jpg');
                i-=1; if (i==0)
                {dr.saveScreenshot(today.dasd+'e'+'png') ;throw e;}
            })
        })
    })
});
}