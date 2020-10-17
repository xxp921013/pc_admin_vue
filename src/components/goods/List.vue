<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <el-input placeholder="搜索商品" v-model="queryInfo.query" class="input-with-select"
                                  clearable @clear="getList" @keydown.enter.native="getList">
                            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="goods"

                    border
                    style="width: 100%;height: 100%"
                    class="good-table"
            >

                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="goods_name"
                        label="商品名称"
                >
                </el-table-column>
                <el-table-column
                        prop="goods_price"
                        label="商品价格(元)"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="goods_weight"
                        label="商品重量"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="170"
                >
                    <template slot-scope="scope">
                        {{scope.row.add_time | dataFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="120"
                >
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="light" content="修改商品" placement="top-start">
                            <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除商品" placement="top-start">
                            <el-button type="danger" size="small" icon="el-icon-delete"
                                       @click="deleteGood(scope.row.id)"></el-button>
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

    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagesize: 10,
                    pagenum: 1
                },
                goods: [],
                total: 0
            }
        },
        methods: {
            getList() {
                this.$http.get('goods', {params: this.queryInfo}).then(res => {
                    console.log(res);
                    const result = res.data.data;
                    this.goods = result.goods;
                    this.total = result.total;
                })
            },
            handleSizeChange(val) {
                this.queryInfo.pagesize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                this.getList();
            },
            goAddPage() {
                this.$router.push('/goods/add')
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>
    .good-table {
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>
