<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import * as XLSX from 'xlsx';

defineOptions({
  name: 'VisualData'
});

const option = ref({});
const dataList = ref([]);
let myChart = null;
const chartDom = ref();

// csv/excel 选择文件
const changeFile = async (file: any) => {
  // const file = file.file;
  // 创建文件读取对象 用于读取file 和 blob
  const fileReader = new FileReader();
  let sheetObj: any[] = [];
  // 读取文件到二进制 异步读取 配合 readAsBinaryString(file) 函数一起使用
  fileReader.readAsBinaryString(file.raw);
  fileReader.onload = (event: any) => {
    console.log(event);
    // 得到二进制的result
    const { result } = event.target;
    console.log(result);
    // 通过$xlsxUtils 解析二进制流获得workbook对象
    const wb = XLSX.read(result, { type: 'binary' });
    console.log(wb);
    // 遍历sheet
    for (let sheetName in wb.Sheets) {
      // 虽然wb.Sheets中可以看出sheet都是一个对象 但是此处遍历只会得到sheetName
      console.log(sheetName);
      // 通过sheetName获取真正的sheet对象
      console.log(wb.Sheets[sheetName]);
      // 通过xlsxUtils.sheet_to_json() 转换成对象
      sheetObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      console.log('sheetObj', sheetObj);
      // 下面就是对象操作 根据实际情况自定
      sheetObj.forEach((el, i) => {
        const dataArr = [el.X, el.Y, el.Z, el.pressure, el.temperature];
        dataList.value.push(dataArr);
      });
    }
    drawCoordinateChart(dataList.value);
  };
  // 以二进制方式打开文件
  // fileReader.readAsBinaryString(file);
  // 阻止上传
  console.log(file, 'file');
  return false;
};

function drawCoordinateChart(data: any) {
  const symbolSize = 2.5;
  option.value = {
    grid3D: {},
    xAxis3D: {
      type: 'category'
    },
    yAxis3D: {},
    zAxis3D: {},
    dataset: {
      dimensions: ['X', 'Y', 'Z', 'pressure', 'temparature'],
      source: data
    },
    series: [
      {
        type: 'scatter3D',
        symbolSize: symbolSize,
        encode: {
          x: 'X',
          y: 'Y',
          z: 'temparature',
          tooltip: [0, 1, 2, 3, 4]
        }
      }
    ]
  };
  myChart.setOption(option.value);
}

onMounted(() => {
  chartDom.value = document.getElementById('chart-container');
  myChart = echarts.init(chartDom.value, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
});
</script>

<template>
  <div id="main">
    <h1>可视化数据</h1>
    <el-upload
      ref="uploadRef"
      :on-change="changeFile"
      :show-file-list="false"
      class="mr1o"
      accept=".csv, .xlsx, .xls"
      action="#"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
    </el-upload>
  </div>
  <div id="chart-container" />
</template>

<style lang="scss" scoped>
#chart-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>
