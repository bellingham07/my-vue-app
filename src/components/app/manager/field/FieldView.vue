<script setup>
import {onMounted, reactive, ref} from "vue";
import {Request} from "../../../../request/request.js";
import {ErrorInfo, SuccessInfo} from "../../../../utils/util.js";

let tableData = reactive({
  arr: []
})

let centerDialogVisible = ref(false)

let tableTmpInfo = reactive({
  temperature_threshold_low:0.0,
  temperature_threshold_up:0.0,
  humidity_threshold_low:0.0,
  humidity_threshold_up:0.0,
  co2_threshold_low:0.0,
  co2_threshold_up:0.0,
  water_threshold_low:0.0,
  water_threshold_up:0.0,
  pesticide_threshold_low:0.0,
  pesticide_threshold_up:0.0,
  fertilizer_threshold_low:0.0,
  fertilizer_threshold_up:0.0,
})

const getFieldInfo = () => {
  Request.get('/field/info').then((res) => {
    tableData.arr = res.data.data.list
  })
}
const changeThreshold = (info) => {
  tableTmpInfo = info
  centerDialogVisible.value = true
}

onMounted(
    () => {
      getFieldInfo()
    }
)
</script>

<template>
  <div>
    <el-table :data="tableData.arr" style="width: 100%">
      <el-table-column prop="area_id" label="土地编号" width="80"/>
      <el-table-column prop="volume" label="使用量" width="110"/>
      <el-table-column prop="type" label="喷洒物类型" width="110"/>
      <el-table-column prop="username" label="喷洒人" width="110"/>
      <el-table-column prop="created_at" label="业务作用时间" width="110"/>
      <el-table-column prop="name" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="success" @click="changeThreshold(scope.row)">修改阈值</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<style scoped>

.blue-font {
  width: 130px;
  color: #2cc4bf;
}

.little-box {
  padding: 10px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
}

.box {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  width: 30%;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
</style>