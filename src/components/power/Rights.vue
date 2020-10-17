<template>
    <div>
        <el-card class="box-card">
            <el-table
                    :data="rights"
                    border
                    style="width: 100%;height: 100%"
                    class="right-table"
            >
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="authName"
                        label="权限名称"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="权限等级"
                        width="280">
                    <template v-slot="scope">
                        <el-tag v-if="scope.row.level=='0'">一级</el-tag>
                        <el-tag type="success" v-if="scope.row.level=='1'">二级</el-tag>
                        <el-tag type="danger" v-if="scope.row.level=='2'">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Rights",
        data() {
            return {
                rights: []
            }
        },
        methods: {
            getRights() {
                this.$http.get('rights/list').then(res => {
                    this.rights = res.data.data;
                    console.log(res);
                })
            }
        },
        created() {
            this.getRights();

        }

    }
</script>

<style scoped>
    .right-table {
        margin-top: 20px;
    }
</style>
