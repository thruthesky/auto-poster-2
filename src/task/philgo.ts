import { MyNightmare as Nightmare } from './../nightmare';

let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 800,
    openDevTools: { mode: '' }
};

const url = "https://www.philgo.com";
let nightmare = new Nightmare(defaultOptions);
run();

async function run() {
    
    let $html = await nightmare.get(url);
    nightmare.type('input.id', nightmare.argv.id).type('input.password', nightmare.argv.pw);
    await nightmare.enter('input.password');
    await nightmare.waitTest('.myinfo', 'Login test');
    // console.log("title: ", nightmare.title());
    $html = await nightmare.getHtml();
    nightmare.test($html.find('.myinfo').length > 0, "Philgo login");

    /// get a post to upload to philgo.
    ///
    ///
    let subject = "Hello";
    let content = "How are you? I am fine.";



    /// upload to philgo.
    $html = await nightmare.get( url + '/?module=post&action=write&post_id=' + nightmare.argv.forum);
    await nightmare.type('input.subject[name="subject"]', subject );
    await nightmare.type('#content', content);
    // await nightmare.click('input.post_write_submit');
    // await nightmare.waitTest('.post_view_subject', 'Post success.');





}

