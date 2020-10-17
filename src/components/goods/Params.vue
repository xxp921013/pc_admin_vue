<template>
    <div>
        <el-card class="box-card">
            <el-alert style="margin-bottom: 20px"
                      title="注意:只允许为第三级分类设置参数"
                      type="warning"
                      show-icon
                      :closable="false">
            </el-alert>
            请选择商品分类:
            <el-cascader
                    expand-trigger="hover"
                    :options="catList"
                    v-model="selectedCat"
                    :props="cascaderProps"
                    @change="catChange"
            >
            </el-cascader>
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="first">请选择商品分类
                    <el-button type="primary" round :disabled="!isBTNDisable">添加参数</el-button>
                    <el-table
                            :data="many"
                            border
                            style="width: 100%;height: 100%"
                            class="user-table"
                    >
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div v-if="props.row.attr_vals.length>0">
                                    <el-tag
                                            v-for="(item,index) in props.row.attr_vals"
                                            closable @close="deleteAttr(props.row.id,index)"
                                            style="margin: 10px">{{item}}
                                    </el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                type="index"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="attr_name"
                                label="属性名"
                        >
                        </el-table-column>

                        <el-table-column
                                label="操作"
                        >
                            <template v-slot="scope">
                                <el-tooltip class="item" effect="light" content="修改属性" placement="top-start">
                                    <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
                                </el-tooltip>

                                <el-tooltip class="item" effect="dark" content="删除属性" placement="top-start">
                                    <el-button type="danger" size="small" icon="el-icon-delete"
                                               @click="deleteUser(scope.row.id)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="second">
                    <el-button type="primary" round :disabled="!isBTNDisable">添加属性</el-button>
                    <el-table
                            :data="only"
                            border
                            style="width: 100%;height: 100%"
                            class="user-table"
                    >
                        <el-table-column
                                type="index"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="attr_name"
                                label="参数名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="attr_vals"
                                label="参数值"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                        >
                            <template v-slot="scope">
                                <el-tooltip class="item" effect="light" content="修改属性" placement="top-start">
                                    <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
                                </el-tooltip>

                                <el-tooltip class="item" effect="dark" content="删除属性" placement="top-start">
                                    <el-button type="danger" size="small" icon="el-icon-delete"
                                               @click="deleteUser(scope.row.id)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Params",
        data() {
            return {
                cascaderProps: {
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                catList: [],
                selectedCat: [],
                activeName: 'first',
                many: [],
                only: []
            }
        },
        methods: {
            catChange() {
                console.log(this.selectedCat);
                if (this.selectedCat.length = 3) {
                    const cid = this.selectedCat[2];
                    let sel = '';
                    if (this.activeName == 'first') {
                        sel = 'many';
                    } else {
                        sel = 'only';
                    }
                    this.getParams(cid, sel);
                }
            },
            getCat() {
                this.$http.get('categories').then(res => {
                    this.catList = res.data.data;
                })
            },
            handleTabClick() {
                if (this.selectedCat.length = 3) {
                    const cid = this.selectedCat[2];
                    let sel = '';
                    if (this.activeName == 'first') {
                        sel = 'many';
                    } else {
                        sel = 'only';
                    }
                    this.getParams(cid, sel);

                }
            },
            getParams(id, type) {
                this.$http.get('/categories/' + id + '/attributes', {
                    params: {
                        sel: type
                    }
                }).then(res => {
                    console.log(res);
                    if (type == 'many') {
                        this.many = res.data.data;
                        this.many.forEach(item => {
                            item.attr_vals = item.attr_vals.split(' ');
                        })
                        console.log(this.many);
                    } else {
                        this.only = res.data.data;
                        this.only.forEach(item => {
                            item.attr_vals = item.attr_vals.split(' ');
                        })
                        console.log(this.only);
                    }
                })
            },
            deleteAttr(id, index) {

            }
        },
        created() {
            this.getCat();
        },
        computed: {
            isBTNDisable() {
                console.log(this.selectedCat.length);
                if (this.selectedCat.length == 3) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    .user-table {
        margin-top: 20px;
    }
</style>
