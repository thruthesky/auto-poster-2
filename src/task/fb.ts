import { Browser } from './browser';
import { nightmare } from './../nm-conf';
import { fb } from './../config';
let b = new Browser

export class FbBot{

    constructor(
        public id : string = fb.id,
        public password : string = fb.password,
        public url : string = fb.url
    ){}

    async openFb(){
        let $html = await b.open(this.url);
        return $html.find('.title').length;
    }

    async goToGroup(url){
        await b.open(url)
        let $html = await b.getHtml();
        return $html;
    }

    async postInGroup(){
        
    }

    async logout(){
    }
    async login(){
        await nightmare.type('#m_login_email', this.id);
        await nightmare.type('input[name="pass"]', this.password);
        await nightmare.click("input[name='login']");
    }
}