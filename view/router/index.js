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

import transform from './transform/index';
import home from './home/index';
import components from './components/index';

router.map(transform);
router.map(home);
router.map(components);


export default router;