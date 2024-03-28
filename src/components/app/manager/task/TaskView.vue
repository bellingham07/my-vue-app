<script setup>
import {onMounted, reactive, ref} from "vue";
import {Request} from "../../../../request/request.js";
import {ErrorInfo, SuccessInfo} from "../../../../utils/util.js";

let tableData = reactive({
  arr: []
})

let centerDialogVisible = ref(false)

let tableTmpInfo = reactive({
  temperature_threshold_low: 0.0,
  temperature_threshold_up: 0.0,
  humidity_threshold_low: 0.0,
  humidity_threshold_up: 0.0,
  co2_threshold_low: 0.0,
  co2_threshold_up: 0.0,
  water_threshold_low: 0.0,
  water_threshold_up: 0.0,
  pesticide_threshold_low: 0.0,
  pesticide_threshold_up: 0.0,
  fertilizer_threshold_low: 0.0,
  fertilizer_threshold_up: 0.0,
})

const getFieldInfo = () => {
  Request.get('/task/info').then((res) => {
    tableData.arr = res.data.data.list
  })
}
const changeThreshold = (info) => {
  tableTmpInfo = info
  centerDialogVisible.value = true
}

const getStatusColor = (status) => {
  const colorMap = {
    '2': 'yellow',// 进行中
    '1': 'red', // 未开始
    '3': 'green' // 已完成
  };
  return colorMap[status] || ''; // 默认为''
}

const getStatusText = (status) => {
  const colorMap = {
    '2': '进行中',// 进行中
    '1': '未开始', // 未开始
    '3': '已完成' // 已完成
  };
  return colorMap[status] || ''; // 默认为''
}
const timestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // JavaScript中时间戳是毫秒级的，所以乘以1000
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需加1
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
      <el-table-column prop="id" label="编号" width="80"/>
      <el-table-column prop="description" label="任务描述" width="200"/>
      <el-table-column prop="admin_name" label="下发者" width="110"/>
      <el-table-column prop="worker_name" label="执行者" width="110"/>
      <el-table-column prop="status" label="任务状态" width="110">
        <template v-slot="scope">
          <span :style="{ color: getStatusColor(scope.row.status) }">{{ getStatusText(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="开始时间" width="170">
        <template v-slot="scope">
          <span>{{ timestampToTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_at" label="完成时间" width="170">
        <template v-slot="scope">
          <span>{{ timestampToTime(scope.row.end_at) }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="created_at" label="业务作用时间" width="110"/>-->
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