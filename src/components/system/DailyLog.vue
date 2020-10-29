<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <el-input placeholder="根据用户名搜索日志" v-model="queryInfo.username" class="input-with-select"
                                  clearable @clear="getLogs" @keydown.enter.native="getLogs">
                            <el-button slot="append" icon="el-icon-search" @click="getLogs"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName">
                <el-tab-pane label="当日数据" name="first">

                    <br/>
                    <el-badge :value="today.loginuser" class="item">
                        <el-button style="width: 80px" size="small">登录用户</el-button>
                    </el-badge>
                    <el-divider></el-divider>
                    <el-badge :value="today.newuser" class="item">
                        <el-button type="primary" style="width: 80px" size="small">新用户</el-button>
                    </el-badge>
                    <el-divider></el-divider>
                    <el-badge :value="today.article" class="item">
                        <el-button type="success" style="width: 80px" size="small">发表文章</el-button>
                    </el-badge>
                    <el-divider></el-divider>
                    <el-badge :value="today.articleRead" class="item">
                        <el-button type="info" style="width: 80px" size="small">文章浏览</el-button>
                    </el-badge>
                    <el-divider></el-divider>
                    <el-badge :value="today.round" class="item">
                        <el-button type="warning" style="width: 80px" size="small">回复</el-button>
                    </el-badge>
                </el-tab-pane>
                <el-tab-pane label="历史数据" name="second">
                    <el-table
                            :data="logs"
                            border
                            style="width: 100%;height: 100%"
                            class="user-table"
                    >
                        <el-table-column
                                type="index"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="记录日期"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="loginuser"
                                label="登录用户"
                                align="center"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="newuser"
                                label="新用户"
                                align="center"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="article"
                                label="发表文章"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="articleRead"
                                label="文章阅读"
                                align="center"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="round"
                                label="回复"
                                align="center"
                        >
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="queryInfo.page"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="queryInfo.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "AdminUser",
        data() {
            return {
                logs: [],
                queryInfo: {
                    page: 1,
                    pageSize: 10
                },
                currentUser: {},
                roles: [],
                selectedId: '',
                total: 0,
                activeName: 'first',
                today: {
                    loginuser: 0,
                    newuser: 0,
                    article: 0,
                    articleRead: 0,
                    round: 0
                }
            }
        },
        created() {
            this.getLogs();
            this.getToday();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            getLogs() {
                this.$http.get('/admin/daily/list', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.logs = res.data.data;
                    this.total = res.data.total;
                })
            },

            handleSizeChange(val) {
                this.queryInfo.pageSize = val
                this.getLogs();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getLogs();
            },
            getToday() {
                this.$http.get('/admin/daily/today').then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.today = res.data.data;
                })
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
