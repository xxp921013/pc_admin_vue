<template>
    <div>
        <h3>欢迎访问管理后台</h3>
        <el-button slot="append" icon="el-icon-search" @click="goDetail"></el-button>
    </div>
</template>

<script>
    export default {
        name: "Welcome",
        methods: {
            goDetail() {
                this.$router.push('/12123123/userDetail')
            }
        }
    }
</script>

<style scoped>

</style>
