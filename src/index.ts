import { config } from './config';
let Nightmare = require('nightmare');
const c = require('cheerio');

let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 400,
    openDevTools: { mode: '' }
};

let nightmare = Nightmare(defaultOptions);

nightmare.useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0");



run();

async function run() {
    if (! await openFacebook()) _exit("ERROR: failed to open facebook.");
    await nightmare.type('#m_login_email', config.id);
    await nightmare.type('input[name="pass"]', config.password);
    await nightmare.click("input[name='login']");
    await nightmare.wait(3000);
    let $html = await getHtml();
    if ($html.find("input[name='login']").length) _exit("Login failed. You are still on login page.");

    /// @warning you have to verify you are properly logged in.
    if ($html.find('.profpic').length) {
        console.log("You have properly logged");
    }
    else {
        console.log("Warning. You may have failed to login.");
    }
    $html = await open('https://m.facebook.com/groups/1235034669910175');
}




async function openFacebook() {
    let $html = await open('https://m.facebook.com/');
    return $html.find('title').length;
}

async function open(url) {
    let html = await nightmare
        .goto(url)
        .evaluate(() => document.querySelector('html').innerHTML)
        .then(a => a);

    let $html = c.load(html)('html');
    return $html;
}


async function getHtml() {
    let html = await nightmare
        .evaluate(() => document.querySelector('html').innerHTML)
        .then(a => a);

    let $html = c.load(html)('html');
    return $html;
}


async function _exit(msg) {
    console.log(msg);

    // await nightmare.then();
    // await nightmare.end();

    process.exit(1);
}