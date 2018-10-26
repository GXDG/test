import Vue from 'vue'
import Router from 'vue-router'
import Personal from './personal'
import axios from 'axios'
Vue.use(Router)



let RouteList = [{
        path: '/',
        component: resolve => require(['~/views/Layout/App.vue'], resolve),
        meta: {
            title: '首页',
            keepAlive: false,
        },
        // beforeEnter: (to, from, next) => {
        //   axios.get("/admin/getMenu").then(response => {
        //     if (response.data.code == 200) {
        //       this.setMenu(null, response.data.data);

        //     }
        //     next();
        //   });
        // },
        children: [{
                path: '/',
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Home/Index.vue'], resolve),
            },
            {
                path: '/font_awesome',
                name: 'FontAwesome',
                meta: {
                    title: 'FontAwesome 图标',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Icon/FontAwesome.vue'], resolve),
            },
            {
                path: '/element_icon',
                name: 'ElementIcon',
                meta: {
                    title: 'Element 图标',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Icon/ElementIcon.vue'], resolve),
            },
            {
                path: '/post_manage',
                name: 'PostManage',
                meta: {
                    title: '文章管理',
                    keepAlive: false
                },
                component: resolve => require(['~/views/ContentManage/Index.vue'], resolve),
            },
            {
                path: '/user_manage',
                name: 'UserManage',
                meta: {
                    title: '用户列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/UserManage/Index.vue'], resolve),
            },
            {
                path: '/category_manage',
                name: 'CategoryManage',
                meta: {
                    title: '分类列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/CategoryManage/Index.vue'], resolve),
            },
            {
                path: '/role_manage',
                name: 'RoleManage',
                meta: {
                    title: '角色列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/PermissionManage/Role/Role.vue'], resolve),
            },
            {
                path: '/permission_list',
                name: 'PermissionList',
                meta: {
                    title: '权限列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/PermissionManage/Permission/Index.vue'], resolve),
            },
            {
                path: '/menu_list',
                name: 'MenuList',
                meta: {
                    title: '权限列表',
                    keepAlive: true
                },
                component: resolve => require(['~/views/Menu/Index.vue'], resolve),
            },
            //个人中心，可能有修改密码，头像修改等路由
            Personal.index,
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '后台登录',
            keepAlive: false
        },
        components: {
            blank: resolve => require(['~/views/Login/Login.vue'], resolve),
        }
    },

]


RouteList[0].children.push({
    path: '/build_code',
    name: 'BuildCode',
    meta: {
        title: '构建代码',
        keepAlive: true
    },
    component: resolve => require(['~/views/DevelopmentTool/Build.vue'], resolve),
});

export default new Router({ routes: RouteList })