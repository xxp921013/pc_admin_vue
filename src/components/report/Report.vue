<template>
    <div>
        <el-card class="box-card">
            <div id="main" style="width: 600px;height: 400px"></div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import _ from 'lodash'

    export default {
        name: "Report",
        data() {
            return {}
        },
        methods: {},
        created() {
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('main'));
            this.$http.get('/reports/type/1').then(res => {
                const data = res.data.data;
                myChart.setOption(data);
            })
            var option = {}

        }
    }
</script>

<style scoped>

</style>
