<template>
  <div class="allArea">
  <div ref="pieChart" style="width: 1000px; height: 700px; " ></div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'; 
export default {
  props: {
    id: {
      type: String,
      required: true // 這裡確保 id 是必需的
    }
  },
  setup(props) {
    const pieChart = ref(null);
    onMounted(() => {
      const chartInstance = echarts.init(pieChart.value);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '統計結果',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '拉麵' },
              { value: 735, name: '燒烤' },
              { value: 580, name: '火鍋' },
              { value: 484, name: '壽司' },
            ]
          }
        ]
      };
      chartInstance.setOption(option);
    });

    return {
      pieChart
    };
  }
};
</script>

<style>
.allArea{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(243, 230, 199);
  }
</style>
