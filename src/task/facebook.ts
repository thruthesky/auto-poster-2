import { MyNightmare as Nightmare } from './../nightmare';

let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 400,
    openDevTools: { mode: 'detach' },
};

let nightmare = new Nightmare(defaultOptions);
nightmare.firefox();

const fbUrl = 'https://m.facebook.com/'
const loginButton = 'input[name="login"]';
const usernameField = 'input[name="email"]';
const passwordField = 'input[name="pass"]';
const fbWallTextArea = 'textarea[name="xc_message"]';
const fbPostButton = 'input[name="view_post"]'

const article = `Reading articles may help you.`

run();

async function run() {
    await login( nightmare.argv.id, nightmare.argv.password );
    // await postad( article );
    await goTo(fbUrl + 'gem.sonub')
}


async function login( id: string, password: string ){

    let $html = await goTo(fbUrl);

    await nightmare.waitTest(loginButton,'Login page load.');
    await nightmare.nextAction('Typing email and password.');
    await nightmare.type(usernameField, id);
    await nightmare.typeEnter(passwordField, password);
    await nightmare.nextAction('Press enter to login.');
    await nightmare.enter(passwordField);
    await nightmare.wait(5000)
    await goTo(fbUrl)
    await nightmare.nextAction('Test login');
    await nightmare.waitTest(fbWallTextArea,'Looking for text area for posting.');
}

async function postAd( article ) {
    await nightmare.waitTest(fbWallTextArea,'Looking for posting text area to write to.');
    await nightmare.nextAction('Typing the post.');
    await nightmare.type( fbWallTextArea, article )
                    .click(fbPostButton);
    await nightmare.nextAction('Looking for the article');
    await findPost( article );
    
}
/**
 *     findPost(article)
 *               .then(a=>console.log(a));
 * @param postString 
 */
async function findPost( postString: string ){
    let $html = await nightmare.getHtml();
    let re = await $html.find(`span:contains(${postString})`).length;
    return (re > 0)? true : false;
}

async function goTo(url: string){
    return await nightmare.get(url);
}




async function testing(){
    nightmare.firefox();
    let $html = await nightmare.get('https://philgo.com/etc/phpinfo.php');
    let agent = $html.find('td.e:contains(USER_AGENT)').next().text();
    nightmare.test( agent == nightmare.ua.firefox, 'Firefox user agent test' );


    nightmare.chrome();
    $html = await nightmare.get('https://philgo.com/etc/phpinfo.php?dummay=1');
    agent = $html.find('td.e:contains(USER_AGENT)').next().text();
    nightmare.test( agent == nightmare.ua.chrome, 'Chrome user agent test' );

    nightmare.firefox();
    $html = await nightmare.get('https://philgo.com/etc/phpinfo.php?dummay=2');
    agent = $html.find('td.e:contains(USER_AGENT)').next().text();
    nightmare.test( agent == nightmare.ua.firefox, 'Firefox user agent test again' );
}