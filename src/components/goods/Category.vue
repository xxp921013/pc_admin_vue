<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="addCate">添加分类</el-button>
            <tree-table class="cate-table"
                        :data="categories"
                        :columns="columns"
                        :selection-type="false"
                        :expand-type="false"
                        :show-index="true"
                        border
            >
                <template slot="isok" slot-scope="scope">
                    <i class="el-icon-success" style="color: green" v-if="scope.row.cat_deleted==false"></i>
                    <i class="el-icon-error" style="color: red" v-else></i>
                </template>
                <template slot="level" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level=='0'">一级</el-tag>
                    <el-tag type="success" v-if="scope.row.cat_level=='1'">二级</el-tag>
                    <el-tag type="danger" v-if="scope.row.cat_level=='2'">三级</el-tag>
                </template>
            </tree-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo.pagenum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="queryInfo.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog
                title="添加分类"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分类名称" prop="cate_name">
                    <el-input prefix-icon="el-icon-user" v-model="form.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类" prop="cat_pid">
                    <el-cascader
                            expand-trigger="hover"
                            :options="parentCate"
                            v-model="selectedCat"
                            :props="cascaderProps"
                            @change="parentCatChange"
                            clearable
                            change-on-select
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                categories: [],
                parentCate: [],
                selectedCat: [],
                queryInfo: {
                    pagesize: 10,
                    pagenum: 1,
                },
                total: 0,
                columns: [
                    {
                        label: '分类名称',
                        prop: 'cat_name',
                    },
                    {
                        label: '分类名称',
                        prop: 'cat_deleted',
                        type: 'template',
                        template: 'isok'
                    },
                    {
                        label: '排序',
                        prop: 'cat_level',
                        type: 'template',
                        template: 'level'
                    }
                ],
                dialogVisible: false,
                form: {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0
                },
                cascaderProps: {
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                }
            }
        },
        methods: {
            deleteCate(id) {
            },
            handleSizeChange(val) {
                this.queryInfo.pagesize = val
                this.getCate();
            },
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                this.getCate();
            },
            getCate() {
                this.$http.get('/categories', {params: this.queryInfo}).then(res => {
                    this.categories = res.data.data.result;
                    this.total = res.data.data.total;
                })
            },
            addCate() {
                this.getParentCateList();
                this.dialogVisible = true;
            },
            pushCate() {
                console.log(this.form);
                this.$http.post('categories', this.form).then(res => {
                    this.$message({
                        type: "success",
                        message: '添加成功!'
                    })
                })
                this.getCate();
                this.dialogVisible = false;
            },
            handleClose() {
                this.form.cat_name = '';
                this.form.cat_pid = 0;
                this.form.cat_level = 0
                this.selectedCat = []
            },
            getParentCateList() {
                this.$http.get('/categories', {
                    params: {
                        type: 2
                    }
                }).then(res => {
                    console.log(res);
                    this.parentCate = res.data.data;
                    console.log(this.parentCate);
                })
            },
            parentCatChange() {
                if (this.selectedCat.length > 0) {
                    this.form.cat_pid = this.selectedCat[this.selectedCat.length - 1];
                    this.form.cat_level = this.selectedCat.length;
                } else {
                    this.form.cat_pid = 0;
                    this.form.cat_level = 0;
                }
            }
        },
        created() {
            this.getCate();
        }
    }
</script>

<style scoped>
    .cate-table {
        margin-top: 20px;
    }

    .el-cascader-menu {
        height: 450px;
    }
</style>
