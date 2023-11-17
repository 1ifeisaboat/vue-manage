import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由重复 NavigationDuplicated: Avoided redundant navigation to current location: “/”
// 获取原型对象的push函数
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        redirect:'home',
        children: [
            //#region 
            /* {
                path: '/home',
                name: 'home',
                component: () => import('../views/home')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../views/mall')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/other/page1')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/other/page2')
            }, */
            //#endregion
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router