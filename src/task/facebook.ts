import { MyNightmare as Nightmare } from './../nightmare';

let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 400,
    openDevTools: { mode: 'detach' },
};

let nightmare = new Nightmare(defaultOptions);
nightmare.firefox();
const facebookUrl = 'https://m.facebook.com/'

const loginButton = 'input[name="login"]';
const usernameField = 'input[name="email"]';
const passwordField = 'input[name="pass"]';
const facebookWallTextArea = 'textarea[name="xc_message"]';
const facebookPostButton = 'input[name="view_post"]'

const stringToPost = `Testing post`

run();

async function run() {
    await login( nightmare.argv.id, nightmare.argv.password );
    await nightmare.get( facebookUrl + nightmare.argv.where );
    await postAd( stringToPost );
    
}
/**
 * 
 * @param id 
 * @param password 
 */
async function login( id: string, password: string ){

    let $html = await nightmare.get(facebookUrl);
    
    await nightmare.nextAction('Typing email and password.');
    await nightmare.type(usernameField, id);
    await nightmare.type(passwordField, password);
    await nightmare.nextAction('Press enter to login.');
    await nightmare.enter(passwordField);

    await nightmare.wait(100);

    let re = await nightmare.waitDisappear( passwordField );
    if ( re ) {
        nightmare.success("You are NOT in login page");
    }
    else {
        nightmare.failure("You are STILL in login page");
    }
    await nightmare.wait( 'body' );
}
/**
 * Function that will do posting, works on facebook profile wall.
 * @param textAreaToWriteTo - optional for now. Will use it to make function reusable to other wall or even other websites.
 * @param stringToPost 
 *  - String that will be posted. 
 */
async function postAd( stringToPost: string, textAreatoWriteTo?: string ) {
    let id = nightmare.generatePostId;
    await nightmare.waitTest(facebookWallTextArea,'Looking for posting text area to write to.');
    await nightmare.nextAction('Typing the post.');
    await nightmare.type( facebookWallTextArea, stringToPost + id )
                    .click( facebookPostButton );
    let re = await findPostInSpan( id )
    await ( re ) ? await nightmare.success("Post found") 
                 : await nightmare.failure("Post not found");
}
/**
 * Checks if a post exists in a span.
 * @param query - string to find 
 */
async function findPostInSpan( query: string ){
    let selector = await `span:contains('${query}')`; //cannot use for wait()
    let $html = await nightmare.getHtml();
     let re = await nightmare.waitAppear(selector);
    return await re;
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