'use strict';
require('should');
const wd = require('macaca-wd');
var moment =require('moment');
moment.locale('zh-cn');
var today={};
var _today=moment();
today.dasd=_today.format('YYYY-MM-DD-hh-mm-ss');

var br = process.env.browser || 'electron';
br = br.toLowerCase();
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
                browserName: br,
                userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent',
                deviceScaleFactor: 2
            })
            .maximize()
});

    // afterEach(function () {
    //     return dr
    //         .customSaveScreenshot(this)
    //         .sleep(1000)
    // });

    // after(function () {
    //     opn('http://www.kjt.com');
    // });
    after(function () {
        return  dr
            .saveScreenshot(today.dasd)
        //     .then(img=>{
        //         const newimg = new Buffer(img,'base64');
        //         const folder=path.resolve(__dirname,'../screenshot');
        //         const imgpath=path.join(folder,'as.jpg');
        //         fs.exist(imgpath,function (exist) {
        //             exist.should.be.ok('as image exist.');
        //         })
        // })
        .quit()
    });


    describe('macaca', function () {
        it('should be ok', function () {
            const url = 'http://www.kjt.com';
            return dr
                .get(url)
                .sleep(2000)
                .saveScreenshot(today.dasd)
                .elementByLinkText('请登录').click()
                .elementByIdIfExists('input_login_name').sendKeys('18708151438')
                .elementByIdIfExists('input_login_pwd').sendKeys('zang1020330')
                .elementByIdIfExists('PageLoginBtn').click()
                .sleep(2000)
                .get('http://www.kjt.com/product/detail/260419')
                  .waitForElementByXPath('//*[@id="main"]/div/div[1]/div[2]/div[1]/div[2]/div[4]/ul/li/div/a[1]').click()
                // .execute(
                //     ' var a = document.getElementsByClassName(\'cartBar-layout br2\')\n' +
                //     'for (var i =0;i<a.length;i++) {\n' +
                //     '  a[i].style.display="block";\n' +
                //     '}\n' +
                //     '"block"  '
                // )
                .waitForElementById('CartCTNRUrl').click()
                .elementById('CanSubmitBtn').click()
                .elementById('btnSubmit').click()
                .sleep(2000)
                .elementByLinkText('[查看订单]').click()
                .execute(
                    'window.scrollTo(0,document.body.scrollHeight)'
                )
                .elementById('btnVoidedOrder').click()
                .sleep(1000)
                .execute('document.getElementsByName(\'corder\')[6].checked=true')
                .elementById('btnInvalidOrder').click()
                .catch(e=>{
                    console.log(e);
                    saveScreenshot('pic1')
            })
        })
 })
});