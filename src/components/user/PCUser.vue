<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <el-input placeholder="根据用户名搜索用户" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getUsers" @keydown.enter.native="getUsers">
                            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-table
                    :data="users"
                    border
                    style="width: 100%;height: 100%"
                    @selection-change="handleSelectionChange"
                    class="user-table"
            >
                <el-table-column
                        type="selection"

                >
                </el-table-column>
                <el-table-column
                        type="index"
                >
                </el-table-column>
                <el-table-column
                        prop="create"
                        label="创建日期"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="文章数"
                        align="center"
                        sortable
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="查看用户文章" placement="top-start">
                            <el-button style="width: 70px" type="primary" size="small"
                                       @click="viewUserArticle(scope.row.username)">{{scope.row.articleCount}}
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="回复数"
                        align="center"
                        sortable
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="查看用户回复" placement="top-start">
                            <el-button style="width: 50px" type="primary" size="small" v-if="scope.row.roundCount"
                                       @click="viewRounds(scope.row.username)">
                                {{scope.row.roundCount}}
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteUser(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
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
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "AdminUser",
        data() {
            return {
                users: [],
                dialogVisible: false,
                roleDialogVisible: false,
                queryInfo: {
                    query: '',
                    page: 1,
                    pageSize: 10
                },
                form: {
                    username: '',
                    password: '',
                    rid: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, max: 13, message: '长度在 5 到 13 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, max: 13, message: '长度在 5 到 13 个字符', trigger: 'blur'}
                    ]
                },
                currentUser: {},
                roles: [],
                selectedId: '',
                total: 0
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            getUsers() {
                this.$http.get('/admin/pcUser/list', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.users = res.data.data;
                    this.total = res.data.total;
                })
            },
            changeState(id, type) {
                this.$http.put('/admin/adminUser/changeStatus/' + id + '/' + type).then(res => {
                    this.$message.success('更新状态成功!');
                    this.getUsers();
                })
            },
            deleteUser(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/admin/adminUser/deleteUser/' + id).then(res => {
                        this.$message.success('删除成功!');
                        this.getUsers();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            dialogClose() {
                this.$refs['form'].resetFields();
            },
            roleDioClose() {

            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val
                this.getUsers();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getUsers();
            },
            viewUserArticle(username) {
                this.$router.push('/article?creator=' + username);
            },
            viewRounds(username) {
                this.$router.push('/rounds?creator=' + username);
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
