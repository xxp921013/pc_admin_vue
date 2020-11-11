<template>

    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/img/QQ图片20201012144710.jpg" width="60px" height="60px" alt="">
            </div>
            <span style=" align-items: center">开发社区后台管理</span>
            <div>
                <el-select v-model="selected" placeholder="请选择要发送给谁" clearable>
                    <el-option
                            v-for="item in users"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-button type="success" @click="dialogVisible = true">发送消息</el-button>
            </div>
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
        <el-dialog
                title="发送消息"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <div v-if="selected != ''">
                <el-input prefix-icon="el-icon-document" v-model="message" placeholder="输入要发送的消息...."></el-input>

            </div>
            <div v-else>
                <span>请选择发送对象!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="selected != ''" type="primary" @click="sendMessage()">发 送</el-button>
                <el-button v-if="selected == ''" type="primary" disabled @click="sendMessage()">发 送</el-button>
            </span>
        </el-dialog>
    </el-container>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menus: [],
                isCollapsed: false,
                selected: '',
                users: [],
                message: '',
                dialogVisible: false
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
            initWebSocket() { //初始化weosocket
                let token = window.sessionStorage.getItem("token");
                // const wsuri = "ws://153g21o285.51mypc.cn:16795/webSocket/" + token;
                const wsuri = "ws://localhost:8082/webSocket/" + token;
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() { //连接建立之后执行send方法发送数据

            },
            websocketonerror() {//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e) { //数据接收
                if ("发送成功!" == e.data) {
                    this.$message({
                        message: e.data,
                        type: 'success',
                        showClose: true,
                        duration: 1000
                    })
                } else if ("flash" == e.data) {
                    this.getOnlineUsers();
                } else {
                    this.$message({
                        message: e.data,
                        type: 'info',
                        showClose: true,
                        duration: 0
                    })
                }

            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data);
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e);
            },
            getOnlineUsers() {
                this.$http.get('onlineUser').then(res => {
                    console.log(res);
                    this.users = res.data.data;
                    console.log(this.users);
                });
            },
            sendMessage() {
                let msg = this.message + "##" + this.selected + "##" + window.sessionStorage.getItem("token");
                this.websocketsend(msg);
                this.message = '';
                this.dialogVisible = false;
            }

        },
        created() {
            this.$http.get('menus').then(res => {
                this.menus = res.data.data;
            });
            this.initWebSocket();
            this.getOnlineUsers();
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
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
