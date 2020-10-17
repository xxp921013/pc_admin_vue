    <template>
    <div>

        <el-card class="box-card">
            <el-table
                    :data="roles"
                    style="width: 100%;height: 100%"
                    class="role-table"
                    border>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-row v-for="(item1,index1) in props.row.children" :key="item1.id"
                                :class="['bdbottom', index1==0? 'bdtop':'','vcenter']">
                            <el-col :span="5">
                                <el-tag class="el-tag">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row v-for="(item2,index2) in item1.children" :key="item2.id"
                                        :class="['bdbottom','vcenter']">
                                    <el-col :span="6">
                                        <el-tag class="el-tag" type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag v-for="(item3,index3) in item2.children" :key="item3.id" type="warning"
                                                closable @close="removeRightById(props.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                        type="index"
                        width="44">
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        label="角色名称"
                        width="460">
                </el-table-column>
                <el-table-column
                        prop="roleDesc"
                        label="角色描述"
                        width="460">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="410">
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="编辑" placement="top-start">
                            <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="分配权限" placement="top-start">
                            <el-button type="success" size="small" icon="el-icon-setting"
                                       @click="showSetRightDialog(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteUser(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="分配权限"
                :visible.sync="dialogVisible"
                width="30%"
                @close="dialogClose"
        >
            <el-tree :data="rightList" :props="defaultProps" show-checkbox default-expanded-keys default-expand-all
                     :default-checked-keys="defkeys" node-key="id" ref="treeref"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="subRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                roles: [],
                dialogVisible: false,
                rightList: [],
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
                //默认选中id值
                defkeys: [],
                currentRole: {}
            }
        },
        methods: {
            getRoles() {
                this.$http.get('roles').then(res => {
                    this.roles = res.data.data;
                    console.log(res);
                })
            },
            removeRightById(role, ritghtid) {
                this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/roles/' + role.id + '/rights/' + ritghtid).then(res => {
                        this.$message.success('删除成功!');
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showSetRightDialog(role) {
                //获取所有权限接口
                this.$http.get('/rights/tree').then(res => {
                    let data = res.data;
                    this.rightList = data.data;
                    console.log(this.rightList);

                })
                this.getLeafKeys(role, this.defkeys);
                this.currentRole = role;
                this.dialogVisible = true;
            },
            getLeafKeys(node, arr) {
                if (node) {
                    if (!node.children) {
                        arr.push(node.id);
                        return;
                    } else {
                        node.children.forEach(
                            item => {
                                this.getLeafKeys(item, arr);
                            }
                        )
                    }
                }
            },
            dialogClose() {
                this.defkeys = []
            },
            subRights() {
                const keys = [
                    ...this.$refs.treeref.getCheckedKeys(),
                    ...this.$refs.treeref.getHalfCheckedKeys()
                ]
                const idStr = keys.join(',');
                this.$http.post('/roles/' +
                    this.currentRole.id + '/rights', {rids: idStr}
                ).then(res => {
                    this.$message({
                        message: '修改权限成功!',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    location.reload();
                })
            }
        },
        created() {
            this.getRoles();
        }
    }
</script>

<style scoped>
    .role-table {
        margin-top: 20px;
    }

    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>
