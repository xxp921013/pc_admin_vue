<template>
    <div>
        <el-card class="box-card">
            <el-alert
                    title="添加商品信息"
                    type="info"
                    show-icon
                    :closable="false"
                    center>
            </el-alert>
            <el-steps :space="400" align-center :active="activeStep - 0" finish-status="success" class="add-step">
                <el-step title="进本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="top">
                <el-tabs v-model="activeStep" :tab-position="'left'" :before-leave="beforeTabLeave">
                    <el-tab-pane label="进本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="form.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="form.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="form.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="form.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-alert style="margin-bottom: 20px;width: 270px"
                                      title="注意:只允许为第三级分类设置参数"
                                      type="warning"
                                      show-icon
                                      :closable="false">
                            </el-alert>
                            <el-cascader
                                    expand-trigger="hover"
                                    :options="catList"
                                    v-model="form.goods_cat"
                                    :props="cascaderProps"
                                    @change="catChange"
                                    style="width: 270px"

                            >
                            </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Add",
        data() {
            return {
                activeStep: '0',
                form: {
                    goods_name: '',
                    goods_price: 0,
                    goods_number: 0,
                    goods_weight: 0,
                    goods_cat: []
                },
                rules: {
                    goods_name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    goods_price: [
                        {required: true, message: '请输入商品价格', trigger: 'blur'}
                    ],
                    goods_number: [
                        {required: true, message: '请输入商品数量', trigger: 'blur'}
                    ],
                    goods_weight: [
                        {required: true, message: '请输入商品重量', trigger: 'blur'}
                    ],
                    goods_cat: [
                        {required: true, message: '请选择商品分类', trigger: 'blur'}
                    ]

                },
                cascaderProps: {
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                catList: [],


            }
        },
        methods: {
            getCatList() {
                this.$http.get('categories').then(res => {
                    this.catList = res.data.data;
                })
            },
            catChange() {
                console.log(this.form.goods_cat);
                if (this.form.goods_cat.length == 3) {

                } else {
                    this.form.goods_cat = [];
                }
            },
            beforeTabLeave(activeName, oldActiveName) {
                if (oldActiveName == '0' && this.form.goods_cat.length < 3) {
                    this.$message({
                        showClose: true,
                        message: '请选择商品分类',
                        type: 'error'
                    });
                    return false;
                }


            }
        },
        created() {
            this.getCatList();
        }
    }
</script>

<style scoped>
    .add-step {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
