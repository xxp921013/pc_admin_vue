import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login')
const Home = () => import('../components/Home')
const Welcome = () => import('../components/Welcome')
const Users = () => import('../components/user/Users')
const Rights = () => import('../components/power/Rights')
const Roles = () => import('../components/power/Roles')
const Categories = () => import('../components/goods/Category')
const Params = () => import('../components/goods/Params')
const List = () => import('../components/goods/List')
const AddGoods = () => import('../components/goods/Add')
const Report = () => import('../components/report/Report')
const UserDetail = () => import('../components/test/UserDetail')
const AdminUser = () => import('../components/user/AdminUser')
const PCUser = () => import('../components/user/PCUser')
const ArticleList = () => import('../components/article/ArticleList')
const RoundsList = () => import('../components/round/RoundsList')
const MenuList = () => import('../components/system/MenuList')
const Log = () => import('../components/system/Log')
const TagList = () => import('../components/article/TagList')
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                component: Welcome,
            },
            {
                path: '/adminUser',
                component: AdminUser,
                name: '后台用户列表'
            },
            {
                path: '/pcUser',
                component: PCUser,
                name: '论坛用户列表'
            },
            {
                path: '/article',
                component: ArticleList,
                name: '文章列表'
            },
            {
                path: '/rounds',
                component: RoundsList,
                name: '回复列表'
            },
            {
                path: '/menuList',
                component: MenuList,
                name: '菜单列表'
            },
            {
                path: '/log',
                component: Log,
                name: '操作日志'
            },
            {
                path: '/tags',
                component: TagList,
                name: '标签列表'
            },
            {
                path: '/rights',
                component: Rights,
                name: '权限列表'
            },
            {
                path: '/roles',
                component: Roles,
                name: '角色列表'
            },
            {
                path: '/categories',
                component: Categories,
                name: '商品分类'
            },
            {
                path: '/params',
                component: Params,
                name: '分类参数'
            },
            {
                path: '/goods',
                component: List,
                name: '商品列表'
            },
            {
                path: '/goods/add',
                component: AddGoods,
                name: '添加商品'
            },
            {
                path: '/reports',
                component: Report,
                name: '数据报表'
            },
            {
                path: '/:id/userDetail',
                component: UserDetail,
                name: '用户详情'
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    //to 要访问的路径
    //from 从哪个路径来
    //next 放行
    if (to.path == '/login') {
        return next()
    }
    const token = window.sessionStorage.getItem('token');
    if (!token) {
        return next('/login');
    } else {
        return next();
    }
})
export default router
