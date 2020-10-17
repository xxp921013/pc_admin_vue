<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <el-input placeholder="搜索用户" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getUsers" @keydown.enter.native="getUsers">
                            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
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
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="180">
                    <template v-slot="scope">
                        <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row.id,scope.row.mg_state)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180">
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
                <el-form-item prop="mobile" label="手机号">
                    <el-input prefix-icon="el-icon-phone" v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input prefix-icon="el-icon-message" v-model="form.email"></el-input>
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
                <p>当前角色: {{currentUser.role_name}}</p>
                分配新角色:
                <el-select v-model="selectedId" placeholder="请选择">
                    <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.roleDesc"
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
        name: "Users",
        data() {
            return {
                users: [],
                total: 0,
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                dialogVisible: false,
                roleDialogVisible: false,
                form: {
                    username: '',
                    password: '',
                    mobile: '',
                    email: ''
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
            deleteUser(id) {
                console.log(id);
            },
            handleSizeChange(val) {
                this.queryInfo.pagesize = val
                this.getUsers();
            },
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                this.getUsers();
            },
            getUsers() {
                this.$http.get('/users', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    this.users = res.data.data.users;
                    this.total = res.data.data.total;
                })
            },
            changeState(id, type) {
                this.$http.put('/users/' + id + '/state/' + type).then(res => {
                    this.$message.success('更新状态成功!');
                    this.getUsers();
                })
            },
            onSubmit() {
                this.$refs['form'].validate((async valid => {
                    if (valid) {
                        this.$http.post('users', this.form).then(res => {
                            const data = res.data;

                            if (data.meta.status == 201) {
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
                    this.$http.delete('/users/' + id).then(res => {
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
                this.$http.get('/roles').then(res => {
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
                this.$http.put('/users/' + this.currentUser.id + '/role', {rid: this.selectedId}).then(res => {
                    this.$message({
                        message: '修改角色成功!',
                        type: 'success'
                    })
                });
                this.roleDialogVisible = false;
                location.reload();
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
