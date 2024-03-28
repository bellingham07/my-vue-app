<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {Request} from "../../../../request/request.js";


let land = reactive({
  arr: []
})


// 获取农田信息
const getAllLandInfo = () => {
  Request.get('/land/info').then((res) => {
    land.arr = res.data.data.list
  })
}


onMounted(
    () => {
      getAllLandInfo()
    }
)
</script>


<template>
  <div class="wrap">
    <div class="card_wrap" v-for="g in land.arr" :key="g">
      <div class="card_item">
        <div style="margin-left: 10px">
          <div style="text-align: center;font-size: 30px;color: red;margin-top: 10px">{{ g.id }}号农田</div>
          <div class="item-small-row">行列数:{{ g.row_num }} x {{g.col_num}} m</div>
          <div class="item-small-row">行间距:{{ g.line_space }} dm</div>
          <div class="item-small-row">平均树龄:{{ g.tree_age }}年</div>
          <div class="item-small-row">土壤温度:{{ g.soil_temperature }}℃</div>
          <div class="item-small-row">土壤湿度:{{ g.soil_moisture }}%</div>
          <div class="item-small-row">空气温度:{{ g.air_temperature }}℃</div>
          <div class="item-small-row">空气湿度:{{ g.air_moisture }}%</div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.plus-sign {
  margin-top: 60%;
  margin-left: 40%;
  width: 50px;
  height: 5px;
  background-color: #333;
  position: relative;
}

.plus-sign::before,
.plus-sign::after {
  content: '';
  width: 5px;
  height: 50px;
  background-color: #333;
  position: absolute;
  top: -22.5px;
  left: 22.5px;
}

.plus-sign::after {
  transform: rotate(90deg);
}

.blue-font {
  width: 40px;
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
}

.box-normal {
  width: 2em; /* 一个汉字的宽度 */
  height: 1em; /* 一个汉字的高度 */
  border: 1px solid #59ea6c; /* 边框样式，可根据需要调整颜色和宽度 */
  font-size: 1em; /* 汉字的标准大小 */
  line-height: 1em; /* 行高，确保文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  color: #59ea6c;
  margin-left: 10px;
}

.box-danger {
  width: 2em; /* 一个汉字的宽度 */
  height: 1em; /* 一个汉字的高度 */
  border: 1px solid #f50935; /* 边框样式，可根据需要调整颜色和宽度 */
  font-size: 1em; /* 汉字的标准大小 */
  line-height: 1em; /* 行高，确保文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  color: #f50935;
  margin-left: 10px;
}

.box-safe {
  width: 2em; /* 一个汉字的宽度 */
  height: 1em; /* 一个汉字的高度 */
  border: 1px solid #3985dc; /* 边框样式，可根据需要调整颜色和宽度 */
  font-size: 1em; /* 汉字的标准大小 */
  line-height: 1em; /* 行高，确保文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  color: #3985dc;
  margin-left: 10px;
}

.item-small-row {
  margin-top: 10px;
}

.wrap {
  /*这个只是让整体在页面居中展示 */
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  height: 100%;
  padding: 8px;
}

.card_wrap {
  /*卡片容器 */
  padding: 10px;
}

.card_item {
  /*每个卡片 */
  margin-bottom: 16px;
  padding: 0 8px;
  width: 480px;
  height: 350px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.card_item:hover {
  box-shadow: 0 15px 30px rgba(255, 0, 0, 0.5);
}

</style>