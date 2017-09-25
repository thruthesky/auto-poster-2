import * as Nightmare from 'nightmare';
const c = require('cheerio');
let argv = require('yargs').argv;

export class MyNightmare extends Nightmare {
    ua = {
        firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0",
        chrome: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
    }
    constructor(defaultOptions) {
        super(defaultOptions);
    }
    firefox() {
        this.useragent(this.ua.firefox);
    }
    chrome() {
        this.useragent(this.ua.chrome);
    }

    /**
     * Returns jQuery object of the site's HTML.
     * 
     * @param url url of the site to get jQuery of it.
     * @return - cheerio(jQuery) object
     * 
     * @code
     *      $html = await nightmare.get('https://philgo.com/etc/phpinfo.php?dummay=1');
     * @endcode
     * 
     * 
     * @note since Nightmare does not redirect(reload) the current page,
     *  you can simply do below and it will not load 'url-a' twice.
     * 
     * @code
     *          .goto('url-a')
     *          .get('url-a')
     * @endcode
     * 
     * 
     * 
     */
    async get(url) {
        let html = await this
            .goto(url)
            .evaluate(() => document.querySelector('html').innerHTML)
            .then(a => a);
        // console.log('html: ', html);
        let $html = c.load(html)('html');
        return $html;
    }
    async getHtml() {
        let html = await this
            .evaluate(() => document.querySelector('html').innerHTML)
            .then(a => a);
        let $html = c.load(html)('html');
        return $html;
    }


    /**
     * Waits for selector and test if selector exstis.
     * @param selector selector to wait and check
     * @param message message to display
     */
    async waitTest( selector, message ) {
        await this.wait(selector);
        let $html = await this.getHtml();
        this.test( $html.find(selector).length > 0, message );
    }
    test(re, message) {
        if (re) this.success(message);
        else this.failure(message);
    }
    success(message) {
        console.log("SUCCESS : " + message);
    }
    failure(message) {
        console.log("FAILURE : " + message);
        this._exit('App will close.');
    }
    nextAction(message) {
        console.log("NEXT ACTION : " + message);
    }
    get argv() {
        return argv;
    }

    async enter(selector) {
        return await this.type(selector, "\x0d");
    }
    async typeEnter(selector, str) {
        await this.type(selector, str);
        await this.enter(selector);
    }

    async _exit(msg) {
        console.log(msg);
        // await nightmare.then();
        // await nightmare.end();
        process.exit(1);
    }
}
