import { MyNightmare as Nightmare } from './../nightmare/nightmare';
let defaultOptions = {
    show: true, x: 1024, y: 0, width: 640, height: 400,
    openDevTools: { mode: 'detach' },
};

let nightmare = new Nightmare(defaultOptions);
nightmare.firefox();
class Twitter{
    //argv parameters/options
    id = nightmare.argv.id;
    password = nightmare.argv.password;
    sonubPostId = String( nightmare.argv.sonubPostId )
    adHookMessage = (nightmare.argv.hookMessage)
                        ? nightmare.argv.hookMessage
                        : "Check out this new post!";

    //sonub
    sonubBackLink = "https://www.sonub.com/view"

    //login
    loginUrl = "https://mobile.twitter.com/login"
    usernameField = 'input[name="session[username_or_email]"]';
    passwordField = 'input[name="session[password]"]'
}

class TweetComposer extends Twitter{
        //composing tweet
        composeTweetUrl = "https://mobile.twitter.com/compose/tweet";
        composeTweetArea = 'textArea[placeholder="What\'s happening?"]';
        tweetButton = 'div[data-testid="tweet-button"]';
        findTweet = `span:contains("${ this.sonubPostId }")`
        tweetMessage = this.adHookMessage 
                        + '\r\n' 
                        +" Click link for more: " 
                        + this.sonubBackLink + "/" + this.sonubPostId
                        +'\r\nRef#' + this.sonubPostId;
}

run(new TweetComposer)

async function run( twitter : TweetComposer ){

  await login( twitter );
  await composeTweet( twitter );
  await nightmare._exit("Task ended.")
}


async function login( twitter : Twitter ) {
    await nightmare.nextAction("Logging in..")
    await nightmare.get( twitter.loginUrl );
    await nightmare.type( twitter.usernameField, twitter.id );
    await nightmare.typeEnter( twitter.passwordField, twitter.password );
  
    await nightmare.nextAction("Checking user log in...")
    let isLogin = await nightmare.waitDisappear( twitter.passwordField );
    await (await isLogin) ? await nightmare.success("User log in.")
                          : await nightmare.failure("user log in failed.")
}

async function composeTweet( tweetComposer : TweetComposer ){
    
    await nightmare.nextAction("Go to compose tweet page.");
    await nightmare.get( tweetComposer.composeTweetUrl );
    
    await nightmare.nextAction("Typing Tweet");
    await nightmare.type( tweetComposer.composeTweetArea, tweetComposer.tweetMessage );
    
    await nightmare.nextAction("Click tweet button.");
    await nightmare.click( tweetComposer.tweetButton );

    await nightmare.nextAction("Checking if tweet is posted!");
    let isTweeted = await nightmare.waitAppear( tweetComposer.findTweet );
    await ( await isTweeted) ? await nightmare.success("Tweet found!")
                             : await nightmare.failure("Tweet not found!");

}