<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="addMenu">添加菜单</el-button>
            <tree-table class="cate-table"
                        :data="menus"
                        :columns="columns"
                        :selection-type="false"
                        :expand-type="false"
                        :show-index="true"
                        border
            >
                <template slot="handle" slot-scope="scope">
                    <el-tooltip class="item" effect="light" content="编辑菜单" placement="top-start">
                        <el-button type="success" size="small" icon="el-icon-setting"
                                   @click="editMenu(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除菜单" placement="top-start">
                        <el-button type="danger" size="small" icon="el-icon-delete"
                                   @click="deleteMenu(scope.row)"></el-button>
                    </el-tooltip>
                </template>
                <template slot="level" slot-scope="scope">
                    <el-tag v-if="scope.row.pid=='0'">一级</el-tag>
                    <el-tag type="success" v-if="scope.row.pid !='0'">二级</el-tag>
                </template>
            </tree-table>
        </el-card>
        <el-dialog
                title="添加菜单"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleAddClose"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分类名称" prop="authName">
                    <el-input prefix-icon="el-icon-user" v-model="form.authName"></el-input>
                </el-form-item>

                <el-form-item label="排序" prop="order">
                    <el-input prefix-icon="el-icon-user" v-model="form.order"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="path">
                    <el-input prefix-icon="el-icon-user" v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="父级分类" prop="pid">
                    <el-select v-model="form.pid" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in menus"
                                :key="item.id"
                                :label="item.authName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddMenu">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="编辑菜单"
                :visible.sync="editDialogVisible"
                width="50%"
                :before-close="handleClose"
        >
            <el-form ref="editForm" :model="editForm" label-width="80px">
                <el-form-item label="菜单名称" prop="authName">
                    <el-input prefix-icon="el-icon-user" v-model="editForm.authName"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="path">
                    <el-input prefix-icon="el-icon-user" v-model="editForm.path"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="ordeer">
                    <el-input prefix-icon="el-icon-user" v-model="editForm.order"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushMenu">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Menus",
        data() {
            return {
                menus: [],
                parentCate: [],
                selectedCat: [],
                columns: [
                    {
                        label: '菜单名称',
                        prop: 'authName',
                    },
                    {
                        label: '地址',
                        prop: 'path',
                    },
                    {
                        label: '排序',
                        prop: 'order',
                    },
                    {
                        label: '级别',
                        prop: 'pid',
                        type: 'template',
                        template: 'level'
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'handle'
                    }
                ],
                dialogVisible: false,
                editDialogVisible: false,
                form: {
                    authName: '',
                    pid: '',
                    order: 0,
                    path: ''
                },
                editForm: {
                    authName: '',
                    path: '',
                    order: '',
                    id: '',
                    pid: ''
                },
                cascaderProps: {
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                }
            }
        },
        methods: {
            getMenu() {
                this.$http.get('/menus').then(res => {
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.menus = res.data.data;
                })
            },
            addMenu() {
                this.dialogVisible = true;
            },
            pushMenu() {
                this.$http.put('/menu/edit', this.editForm).then(res => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: '修改成功!'
                        });
                        this.editDialogVisible = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                this.getMenu();
            },
            doAddMenu() {
                console.log(this.form);
                this.$http.post('/menu/add', this.form).then(res => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: '添加成功!'
                        });
                        this.getMenu();
                        this.dialogVisible = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
            },
            handleClose() {
                this.editForm.authName = '',
                    this.editForm.path = '',
                    this.editForm.order = '',
                    this.editForm.id = '',
                    this.editForm.pid = ''
            },
            handleAddClose() {
                this.form.authName = '',
                    this.form.pid = '',
                    this.form.order = 0,
                    this.form.path = ''
            },

            getParentCateList() {
                this.$http.get('/menus').then(res => {
                    console.log(res);
                    this.menus = res.data.data;
                    console.log(this.parentCate);
                })
            },
            editMenu(menu) {
                this.editForm.path = menu.path;
                this.editForm.authName = menu.authName;
                this.editForm.order = menu.order;
                this.editForm.id = menu.id;
                this.editForm.pid = menu.pid;
                this.editDialogVisible = true;
            },
            deleteMenu(menu) {
                this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (menu.children.length > 0) {
                        this.$message.error("该菜单下还有子菜单请勿删除!");
                        return;
                    }
                    this.$http.delete('/menu/delete/' + menu.id).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success('删除成功!');
                            this.getMenu();
                        } else {
                            this.$message.error(res.data.message);
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
        ,
        created() {
            this.getMenu();
        },

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
