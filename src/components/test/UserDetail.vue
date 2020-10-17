<template>
    <div>
        用户详情{{userId}}
    </div>
</template>

<script>
    export default {
        name: "UserDetail",
        data() {
            return {
                userId: ''
            }
        },
        created() {
            this.userId = this.$route.params.id;
        }
    }
</script>

<style scoped>

</style>
