import { nightmare } from './../nm-conf';
let c = require("cheerio")
export class Browser{
    
    async open(url) {
        let html = await nightmare
            .goto(url)
            .evaluate(() => document.querySelector('html').innerHTML)
            .then(a => a);

        let $html = c.load(html)('html');
        return $html;
    }

    async getHtml() {
        let html = await nightmare
            .evaluate(() => document.querySelector('html').innerHTML)
            .then(a => a);
    
        let $html = c.load(html)('html');
        return $html;
    }
}