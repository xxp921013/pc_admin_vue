<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div>
                        <el-input placeholder="根据标签名搜索文章" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getWeights" @keydown.enter.native="getWeights">
                            <el-button slot="append" icon="el-icon-search" @click="getWeights"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-table
                    :data="weights"
                    border
                    style="width: 100%;height: 100%"
                    class="user-table"
            >

                <el-table-column
                        type="index"
                >
                </el-table-column>
                <el-table-column
                        prop="tittle"
                        label="文章标题"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="weights"
                        label="权重(影响热门文章排名)"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="dark" content="修改权重" placement="top-start">
                            <el-button type="success" size="small" icon="el-icon-setting"
                                       @click="editWeight(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除文章权重" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteWeight(scope.row.articleId)"></el-button>
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
                title="修改权重"
                :visible.sync="editDialogVisible"
                width="20%"
        >
            <el-form ref="editForm" :model="currentWeight" label-width="80px">
                <el-form-item label="标签名称" prop="name">
                    <el-input prefix-icon="el-icon-user" v-model="currentWeight.tittle" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input prefix-icon="el-icon-user" v-model="currentWeight.weights"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "TagList",
        data() {
            return {
                weights: [],
                editDialogVisible: false,
                queryInfo: {
                    query: '',
                    page: 1,
                    pageSize: 10
                },
                currentWeight: {
                    id: 0,
                    tittle: '',
                    weights: 0
                },
                roles: [],
                selectedId: '',
                total: 0
            }
        },
        created() {
            this.getWeights();
        },
        methods: {
            getWeights() {
                this.$http.get('/admin/hot/articleWeight', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.weights = res.data.data;
                    this.total = res.data.total;
                })
            },
            deleteWeight(id) {
                this.$confirm('此操作将永久删除该权重信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/admin/hot/deleteWeight/' + id).then(res => {
                        this.$message.success('删除成功!');
                        this.getWeights();
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
                this.getWeights();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getWeights();
            },

            editWeight(weight) {
                this.currentWeight = weight;
                this.editDialogVisible = true;
            },
            pushEdit() {
                console.log(this.currentWeight);
                this.$http.put('/admin/hot/editArticleWeight', this.currentWeight).then(res => {
                    console.log(this.currentWeight);
                    console.log(res);
                    const data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            message: '修改成功!',
                            type: "success"
                        })
                        this.getWeights();
                        this.editDialogVisible = false;
                    } else {
                        this.$message.error('数据错误');
                    }
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
