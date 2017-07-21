/**
 * @author synder on 2017/4/19
 * @copyright
 * @desc
 */

import Router from 'vue-router';

class VueRouter {
    
    map(router){
        this.routers = this.routers.concat(router);
    }

    mount(Vue){
        Vue.use(Router);
        let router = new Router({
            routes: this.routers
        });
        return router;
    }

    constructor(){
        this.routers = [];
    }
}

let router = new VueRouter();

import home from './home/index';

router.map(home);

export default router;