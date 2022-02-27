<template>
    <div id="app">
        <template>
            <el-row :gutter="5" style="width: 100%;padding-top: 50px">
                <el-col v-for="item in data" :span="3"  :key="item.id" :value="item.id" style="padding-top: 10px">
                    <div class="grid-content bg-purple" style="text-align: center;margin: 10px;padding-top: 10px;padding-bottom:10px;border: 1px dashed #000;">
                        <el-image
                            style="width: 200px; height: 100px"
                            :src="'http://47.100.200.255:18880/test' + item.path"
                            :fit="fill"></el-image>
                        <div>
                            {{item.createdAtSdf}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </template>
        <template>
            <div style="text-align: right;padding-top: 10px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[24, 32, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
import { getOrderPageData } from "@/api/getData";
export default {
    name:"orderRep",
    data(){
        return{
            isShow:1,
            pageNum:1,
            pageSize:32,
            total:0,
            data:[],
        }
    },
    mounted(){
        this.getOrderData();
    },
    methods:{
        handleSizeChange(val) {
            this.getOrderData();
        },
        handleCurrentChange(val) {
            this.getOrderData();
        },
        async getOrderData() {
            const res = await getOrderPageData({
                isShow:this.isShow,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            });
            if (res.code == "0000") {
                let results = res.results;
                this.data = results.records;
                this.total = results.total;
            }
        },
    },
}
</script>

<style  scoped>

</style>
