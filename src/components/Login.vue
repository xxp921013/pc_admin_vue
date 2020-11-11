<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/img/QQ图片20201012144710.jpg" alt="" style="border-radius: 50%">
            </div>
            <div class="form_box">
                <el-form :model="form" :rules="rules" ref="loginBox">
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="onSubmit('loginBox')">登录</el-button>
                        <el-button @click="resetForm('loginBox')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
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
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((async valid => {
                    if (valid) {
                        console.log(this.form.username);
                        this.postRequest('doLogin', this.form
                            // ,
                            // {
                            // headers: {
                            //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                            // }
                            // }
                        ).then(res => {
                            let result = res.data;


                            if (result.code == 200) {
                                this.$message({
                                    message: '登陆成功',
                                    type: "success"
                                })
                                window.sessionStorage.setItem('token', result.data);
                                this.$router.push('/home');
                            } else {
                                this.$message.error('账号密码错误');
                            }
                        })
                    }
                }))
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        background-color: white;
        height: 300px;
        width: 450px;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 100px;
        width: 100px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    img {
        height: 100px;
        width: 100px;
        background-color: #eee;
    }

    .form_box {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
