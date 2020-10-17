<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <el-input placeholder="根据用户名搜索日志" v-model="queryInfo.username" class="input-with-select"
                                  clearable @clear="getLogs" @keydown.enter.native="getLogs">
                            <el-button slot="append" icon="el-icon-search" @click="getLogs"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-table
                    :data="logs"
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
                        label="用户"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="调取方法"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="ip"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="开始时间"
                        align="center"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="spendTime"
                        label="耗费时间(毫秒)"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="uri"
                        label="uri"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="url"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="code"
                        label="返回状态码"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="message"
                        label="返回信息"
                        align="center"
                >
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
                logs: [],
                queryInfo: {
                    username: '',
                    page: 1,
                    pageSize: 10
                },
                currentUser: {},
                roles: [],
                selectedId: '',
                total: 0
            }
        },
        created() {
            this.getLogs();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            getLogs() {
                this.$http.get('/log/list', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    if (res.data.code == 500) {
                        this.$message({
                            message: '登录超时,请重新登录!',
                            type: 'warning'
                        })
                    }
                    this.logs = res.data.data;
                    this.total = res.data.total;
                })
            },

            handleSizeChange(val) {
                this.queryInfo.pageSize = val
                this.getLogs();
            },
            handleCurrentChange(val) {
                this.queryInfo.page = val;
                this.getLogs();
            },
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
