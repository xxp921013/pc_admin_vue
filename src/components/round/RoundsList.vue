<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <!--                <el-col :span="6">-->
                <div>
                    <el-col :span="6">
                        <el-input placeholder="所属文章id" v-model="queryInfo.articleId" class="input-with-select"
                                  clearable @clear="getRounds" @keydown.enter.native="getRounds">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="回复用户名" v-model="queryInfo.creator" class="input-with-select"
                                  clearable @clear="getRounds" @keydown.enter.native="getRounds">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button icon="el-icon-search" @click="getRounds">搜索</el-button>
                    </el-col>
                </div>
                <!--                </el-col>-->

            </el-row>
            <el-table
                    :data="rounds"
                    border
                    style="width: 100%;height: 100%"
                    @selection-change="handleSelectionChange"
                    class="user-table"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        {{props.row.roundText}}
                    </template>
                </el-table-column>
                <el-table-column
                        type="selection"

                >
                </el-table-column>
                <el-table-column
                        type="index"
                >
                </el-table-column>
                <el-table-column
                        prop="roundCreator"
                        label="回复用户"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="articleTittle"
                        label="所属文章"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="thumbsUp"
                        label="点赞数"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="回复时间"
                        align="center"
                        sortable
                >
                </el-table-column>

                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="dark" content="删除留言" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteRound(scope.row.rid)"></el-button>
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
                rounds: [],
                dialogVisible: false,
                roleDialogVisible: false,
                queryInfo: {
                    creator: '',
                    articleId: '',
                    page: 1,
                    pageSize: 10
                },
                currentUser: {},
                roles: [],
                selectedId: '',
                total: 0,
            }
        },
        created() {
            if (this.$route.query.creator) {
                this.queryInfo.creator = this.$route.query.creator;
            }
            this.getRounds();
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

            getRounds() {
                this.$http.get('/admin/round/list', {params: this.queryInfo}).then(res => {
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    console.log(res);
                    this.rounds = res.data.data;
                    this.total = res.data.total;
                })
            },
            dialogClose() {
            },
            roleDioClose() {

            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val
                this.getRounds();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getRounds();
            },
            deleteRound(id) {
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
