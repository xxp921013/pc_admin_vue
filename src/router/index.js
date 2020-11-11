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
const HotTag = () => import('../components/hot/HotTag')
const ArticleWeight = () => import('../components/article/ArticleWeight')
const HotArticle = () => import('../components/hot/HotArticle')
const DailyLog = () => import('../components/system/DailyLog')
const Map = () => import('../components/other/Map')
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
                path: '/hotTags',
                component: HotTag,
                name: '热门标签'
            },
            {
                path: '/articleWeight',
                component: ArticleWeight,
                name: '文章权重'
            },
            {
                path: '/roles',
                component: Roles,
                name: '角色列表'
            },
            {
                path: '/dailyLog',
                component: DailyLog,
                name: '日常数据'
            },
            {
                path: '/hotArticle',
                component: HotArticle,
                name: '热门文章'
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
                path: '/map',
                component: Map,
                name: '地图'
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
