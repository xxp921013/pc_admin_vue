<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div>
                        <el-input placeholder="根据标签名搜素标签" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getTags" @keydown.enter.native="getTags">
                            <el-button slot="append" icon="el-icon-search" @click="getTags"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addDialogVisible = true">添加标签</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="tags"
                    border
                    style="width: 100%;height: 100%"
                    class="user-table"
            >

                <el-table-column
                        type="index"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="标签名"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="weight"
                        label="权重(影响热门标签排名)"
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
                        <el-tooltip class="item" effect="dark" content="删除标签" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteTag(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="修改权重"
                :visible.sync="editDialogVisible"
                width="20%"
                :before-close="handleClose"
        >
            <el-form ref="editForm" :model="currentTag" label-width="80px">
                <el-form-item label="标签名称" prop="name">
                    <el-input prefix-icon="el-icon-user" v-model="currentTag.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input prefix-icon="el-icon-user" v-model="currentTag.weight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="添加标签"
                :visible.sync="addDialogVisible"
                width="30%"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标签名称" prop="name">
                    <el-input prefix-icon="el-icon-user" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input prefix-icon="el-icon-user" v-model="form.weight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTag">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "TagList",
        data() {
            return {
                tags: [],
                editDialogVisible: false,
                addDialogVisible: false,
                queryInfo: {
                    query: '',
                    page: 1,
                    pageSize: 10
                },
                form: {
                    name: '',
                    weight: 0,
                },
                currentTag: {
                    id: 0,
                    name: '',
                    weight: 0
                },
                roles: [],
                selectedId: '',
                total: 0
            }
        },
        created() {
            this.getTags();
        },
        methods: {
            getTags() {
                this.$http.get('/admin/article/tagList', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.tags = res.data.data;
                    this.total = res.data.total;
                })
            },
            deleteTag(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/admin/adminUser/deleteTag/' + id).then(res => {
                        this.$message.success('删除成功!');
                        this.getTags();
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
                this.getTags();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getTags();
            },

            editWeight(tag) {
                this.currentTag = tag;
                this.editDialogVisible = true;
            },
            addTag() {

                this.$http.post('/admin/article/addTag', this.form).then(res => {
                    console.log(res);
                    const data = res.data;
                    if (data.code == 200) {
                        this.addDialogVisible = false;
                        this.$message({
                            message: '添加成功',
                            type: "success"
                        })
                        this.getTags();
                    } else {
                        this.$message.error('数据错误');
                    }
                })

            },
            pushEdit() {
                console.log(this.currentTag);
                this.$http.put('/admin/article/editTag', this.currentTag).then(res => {
                    console.log(res);
                    const data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            message: '修改成功!',
                            type: "success"
                        })
                        this.getTags();
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
