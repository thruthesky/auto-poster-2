import { MyNightmare as Nightmare } from './../nightmare';

let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 400,
    openDevTools: { mode: '' }
};

let nightmare = new Nightmare(defaultOptions);
run();

async function run() {
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

