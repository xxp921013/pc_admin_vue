<template>

    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/img/QQ图片20201012144710.jpg" width="60px" height="60px" alt="">
            </div>
            <span style=" align-items: center">开发社区后台管理</span>
            <el-button type="info" @click="logout">登出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapsed ? '64px' : '200px'">

                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <div>
                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#333744"
                            text-color="#fff"
                            :unique-opened="true"
                            :collapse="isCollapsed"
                            :collapse-transition="false"
                            :router="true"
                            :default-active="$route.path"
                    >
                        <el-submenu v-for="(menu,index) in menus" :index="index+''" :key="index">
                            <template slot="title">
                                <i class="el-icon-notebook-1"></i>
                                <span>{{menu.authName}}</span>
                            </template>
                            <el-menu-item v-for="(child,index) in menu.children" :index="'/'+child.path+''">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{child.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/welcome'">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                </el-breadcrumb>

                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menus: [],
                isCollapsed: false
            }
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            toggleCollapse() {
                this.isCollapsed = !this.isCollapsed
            },

        },
        created() {
            this.$http.get('menus').then(res => {
                this.menus = res.data.data;
            })
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #eeeeee;
        font-size: 20px;
    }

    .el-aside {
        background-color: #333744;

    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 15px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .el-menu {
        border-right: none;
    }

    .home-container {
        height: 100%;
    }
</style>
