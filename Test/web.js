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
            // .maximize()
});
    after(function () {
        return  dr
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
        it('test for web', function () {
            const url = 'http://www.kjt.com';
            return dr
                .get(url)
                .sleep(2000)
                .waitForElementByXPath('//*[@id="headerCtner"]/div[1]/div/div[2]/a[2]')
                .text()
                .then(value=>{
                    value.should.containEql('跨境通首页');
            })
            .sleep(1000)
                .elementByLinkText('请登录').click()
                .waitForElementByClassName('reg_title').text()
                .then(value=>{
                    value.should.containEql("用户登录");
            })
            .sleep(1000)
                .elementByIdIfExists('input_login_name').sendKeys('18708151438')
                .elementByIdIfExists('input_login_pwd').sendKeys('zang1020330')
                .elementByIdIfExists('PageLoginBtn').click()
                .sleep(2000)
                .waitForElementByClassName('username').text()
                .then(value=>{
                    value.should.containEql("娃半仙");
            })
            .sleep(1000)
                .get(url+produrl)
                .waitForElementByXPath('//*[@id="main"]/div/div[1]/div[2]/div[1]/div[1]/h1').text()
                .then(value=>{
                    value.should.containEql("测试商品，请勿下单，下单无效(粉紫色)");
            })
                  .waitForElementByXPath('//*[@id="main"]/div/div[1]/div[2]/div[1]/div[2]/div[4]/ul/li/div/a[1]').click()
                // .execute(
                //     ' var a = document.getElementsByClassName(\'cartBar-layout br2\')\n' +
                //     'for (var i =0;i<a.length;i++) {\n' +
                //     '  a[i].style.display="block";\n' +
                //     '}\n' +
                //     '"block"  '
                // )
                .sleep(1000)
                .waitForElementById('CartCTNRUrl').click()

                .waitForElementByXPath('//*[@id="main"]/div/h1').text()
                .then(value=>{
                    value.should.containEql("我的购物车")
            })
            .sleep(1000)
                .elementById('CanSubmitBtn').click()

                //选择支付方式
                .execute('window.scrollTo(0,700)')
                .waitForElementByXPath('//*[@id="PayTypeListPanel"]/div/ul/li[2]/a/img').click()

                .elementById('btnSubmit').click()
                .sleep(2000)
                .elementByLinkText('立即支付').click()
                .sleep(1000)
                .elementByLinkText('完成支付').click()

                // .execute(
                //     'window.scrollTo(0,document.body.scrollHeight)'
                // )
                // .elementById('btnVoidedOrder').click()
                .sleep(1000)
                .elementByLinkText('作废').click()
                .execute('document.getElementsByName(\'corder\')[6].checked=true')
                .elementById('btnInvalidOrder').click()
                .sleep(3000)
                .catch(e=> {
                dr.saveScreenshot(today.dasd+'.jpg');
            i-=1; if (i==0)
            {dr.saveScreenshot('error.png') ;throw e;}
        })
        })
 });
}); }