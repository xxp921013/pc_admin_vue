<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <!--                <el-col :span="6">-->
                <div>
                    <el-col :span="6">
                        <el-input placeholder="文章标题" v-model="queryInfo.tittle" class="input-with-select"
                                  clearable @clear="getArticles" @keydown.enter.native="getArticles">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="文章内容" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getArticles" @keydown.enter.native="getArticles">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="文章作者" v-model="queryInfo.creator" class="input-with-select"
                                  clearable @clear="getArticles" @keydown.enter.native="getArticles">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button icon="el-icon-search" @click="getArticles">搜索</el-button>
                    </el-col>
                </div>
                <!--                </el-col>-->

            </el-row>
            <el-table
                    :data="articles"
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
                        prop="creator"
                        label="文章作者"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="tittle"
                        label="文章标题"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="tags"
                        label="文章标签"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="commentCount"
                        label="回复数"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="likeCount"
                        label="喜欢数"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="viewCount"
                        label="查看数"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="查看文章内容" placement="top-start">
                            <el-button type="primary" size="small" icon="el-icon-s-order"
                                       @click="viewArticle(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="添加权重" placement="top-start">
                            <el-button type="success" size="small" icon="el-icon-s-data"
                                       @click="weightArticle(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除文章" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteArticle(scope.row.id)"></el-button>
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
        <el-dialog
                title="查看文章内容"
                :visible.sync="dialogVisible"
                width="60%"
                @close="dialogClose"
        >
            <mavon-editor
                    class="md"
                    :value="currentArticle"
                    :subfield="prop.subfield"
                    :defaultOpen="prop.defaultOpen"
                    :toolbarsFlag="prop.toolbarsFlag"
                    :editable="prop.editable"
                    :scrollStyle="prop.scrollStyle"
            >
            </mavon-editor>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdminUser",
        data() {
            return {
                articles: [],
                dialogVisible: false,
                roleDialogVisible: false,
                queryInfo: {
                    query: '',
                    creator: '',
                    tittle: '',
                    page: 1,
                    pageSize: 10
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
                total: 0,
                currentArticle: ''
            }
        },
        created() {
            if (this.$route.query.creator) {
                this.queryInfo.creator = this.$route.query.creator;
            }
            this.getArticles();
        },
        computed: {
            prop() {
                let data = {
                    subfield: false,// 单双栏模式
                    defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
                    editable: false,
                    toolbarsFlag: false,
                    scrollStyle: true
                }
                return data
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            getArticles() {
                this.$http.get('/admin/article/list', {params: this.queryInfo}).then(res => {
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    console.log(res);
                    this.articles = res.data.data;
                    this.total = res.data.total;
                })
            },
            dialogClose() {
            },
            editRoles(user) {
                this.roleDialogVisible = true;
                this.currentUser = user;
                this.$http.get('/admin/adminUser/roles').then(res => {
                    console.log(res);
                    this.roles = res.data.data;
                    console.log(this.roles);
                })
            },
            roleDioClose() {

            },
            updateRole() {
                if (!this.selectedId) {
                    this.$message({
                        message: '请选择角色!',
                        type: 'warning'
                    })
                    return;
                }
                this.$http.put('/admin/adminUser/changeRole/' + this.currentUser.id + '/' + this.selectedId).then(res => {
                    this.$message({
                        message: '修改角色成功!',
                        type: 'success'
                    })
                });
                this.roleDialogVisible = false;
                location.reload();
            },
            addUser() {
                this.dialogVisible = true;
                this.$http.get('/admin/adminUser/roles').then(res => {
                    this.roles = res.data.data;
                    console.log(this.roles);
                })
            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val
                this.getArticles();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getArticles();
            },
            viewArticle(article) {
                this.currentArticle = article.description;
                this.dialogVisible = true;
            },
            deleteArticle(id) {
                this.$confirm('是否永久删除文章?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$http.delete('/admin/article/deleteArticle/' + id).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success('删除成功!');
                            this.getArticles();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            weightArticle(id) {
                this.$confirm('是否添加文章权重信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$http.post('/admin/hot/addWeight/' + id).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success('添加成功,请到权重菜单做相关操作');
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
