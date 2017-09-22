import { Browser } from './task/browser';
import { FbBot } from './task/fb';
import { nightmare } from './nm-conf';
import { fb } from './config';
const c = require('cheerio');
let fbBot = new FbBot()
let browserTask = new Browser()

run();

async function run() {
    if (await fbBot.openFb()) _exit("ERROR: failed to open facebook.");
    await fbBot.login();
    await nightmare.wait(3000);
    let $html = await browserTask.getHtml();
   if ($html.find("input[name='login']").length) _exit("Login failed. Exited on login page.");

    /// @warning you have to verify you are properly logged in.
    if ($html.find('.profpic').length) {
        console.log("You have properly logged");
    }
    else {
        console.log("Warning. You may have failed to login.");
    }
    
    $html = await fbBot.goToGroup('https://m.facebook.com/groups/1235034669910175');

}


async function _exit(msg) {
    console.log(msg);
    // await nightmare.then();
    // await nightmare.end();
    process.exit(1);
}