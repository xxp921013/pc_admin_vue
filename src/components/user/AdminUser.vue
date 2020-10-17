<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
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
                        prop="createTime"
                        label="创建日期"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="角色"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tag v-if="scope.row.rid==1" type="success">超级管理员</el-tag>
                        <el-tag v-if="scope.row.rid==2">普通用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-switch v-model="scope.row.status == 1" @change="changeState(scope.row.id,scope.row.status)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="修改用户" placement="top-start">
                            <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="编辑角色" placement="top-start">
                            <el-button type="success" size="small" icon="el-icon-setting"
                                       @click="editRoles(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteUser(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                width="30%"
                @close="dialogClose"
        >
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="rid" label="角色">
                    <el-select v-model="form.rid" placeholder="请选择">
                        <el-option
                                v-for="item in roles"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="分配角色"
                :visible.sync="roleDialogVisible"
                width="30%"
                :before-close="roleDioClose">
            <div>
                <p>当前用户: {{currentUser.username}}</p>
                <p>当前角色: {{currentUser.rid == 1 ? "超级管理员" : "普通用户"}}</p>
                分配新角色:
                <el-select v-model="selectedId" placeholder="请选择">
                    <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="roleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateRole">确 定</el-button>
  </span>
        </el-dialog>
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
                query: '',
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
                selectedId: ''
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
                this.$http.get('/admin/adminUser/list', {params: this.query}).then(res => {
                    console.log(res);
                    this.users = res.data.data;
                })
            },
            changeState(id, type) {
                this.$http.put('/admin/adminUser/changeStatus/' + id + '/' + type).then(res => {
                    this.$message.success('更新状态成功!');
                    this.getUsers();
                })
            },
            onSubmit() {
                this.$refs['form'].validate((async valid => {
                    if (valid) {
                        this.$http.post('/admin/adminUser/addUser', this.form).then(res => {
                            console.log(res);
                            const data = res.data;

                            if (data.code == 200) {
                                this.dialogVisible = false;
                                this.$message({
                                    message: '添加成功',
                                    type: "success"
                                })
                                this.getUsers();
                            } else {
                                this.$message.error('数据错误');
                            }
                        })
                    }
                }))
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
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
