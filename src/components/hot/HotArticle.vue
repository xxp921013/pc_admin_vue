<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-button type="primary" @click="refresh">手动刷新热门文章列表</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="articles"
                    border
                    style="width: 100%;height: 100%"
                    @selection-change="handleSelectionChange"
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
                >
                </el-table-column>
                <el-table-column
                        prop="weights"
                        label="权重分(权重加使用)"
                        align="center"
                >
                </el-table-column>
            </el-table>

        </el-card>

    </div>
</template>

<script>
    export default {
        name: "AdminUser",
        data() {
            return {
                articles: [],
            }
        },
        created() {
            this.getArticles();
        },
        methods: {
            getArticles() {
                this.$http.get('/admin/hot/articles').then(res => {
                    console.log(res);
                    this.articles = res.data.data;
                })
            },
            refresh() {
                this.$http.get('/admin/hot/refreshArticles').then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "info",
                            message: "正在刷新请稍等...."
                        })
                        setTimeout(() => {
                            this.$message({
                                type: "success",
                                message: "刷新成功!"
                            })
                            this.getArticles();
                        }, 2000);
                    } else {
                        this.$message.error("数据错误!")
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
