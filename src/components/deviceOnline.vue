<template>
    <div id="app">
        <template>
            <el-table
                :data="tableData"
                style="width: 90%;padding-left: 5%;padding-top: 50px">
                <el-table-column
                    prop="deviceId"
                    label="设备号">
                </el-table-column>
                <el-table-column
                    prop="area"
                    label="区县">
                </el-table-column>
                <el-table-column
                    prop="station"
                    label="站点名">
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本">
                </el-table-column>
                <el-table-column
                    prop="repOrder.length"
                    label="响应数">
                </el-table-column>
                <el-table-column
                    prop="getOrder.length"
                    label="呼叫数">
                </el-table-column>
                <el-table-column
                    prop="temp"
                    label="温度">
                </el-table-column>
                <el-table-column
                    prop="hum"
                    label="湿度">
                </el-table-column>
                <el-table-column
                    prop="mbat"
                    label="电压">
                </el-table-column>
            </el-table>
        </template>
        <template>
            <div style="text-align: right;padding-top: 10px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
import { getDevicePageData } from "@/api/getData";
export default {
    name:"deviceOnline",
    data(){
        return{
            isOnline:"online",
            pageNum:1,
            pageSize:10,
            total:0,
            tableData:[],
        }
    },
    mounted(){
        this.getDeviceData();
    },
    methods:{
        handleSizeChange(val) {
            this.getDeviceData();
        },
        handleCurrentChange(val) {
            this.getDeviceData();
        },
        async getDeviceData() {
            const res = await getDevicePageData({
                isOnline:this.isOnline,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            });
            if (res.code == "0000") {
                let results = res.results;
                this.tableData = results.records;
                this.total = results.total;
            }
        },
    },
}
</script>

<style  scoped>

</style>
