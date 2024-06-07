<template>
  <div class="allArea">
    <div ref="pieChart" style="width: 1000px; height: 700px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  data() {
    return {
      pieChart: null,
      quizId: null,
      qnId: null
    };
  },
  mounted() {
    this.quizId = this.$route.query.quizId;
    this.fetchQuizInfo(this.quizId);
  },
  methods: {
    async fetchQuizInfo(quizId) {
      try {
        const response = await axios.get('http://localhost:8080/api/quiz/getQuizInfo', {
          params: { id: quizId }
        });
        const data = response.data;
        console.log('測驗信息數據：', data); // 印出問卷及問題內容
        if (data.rtncode === "SUCCESSFUL" && data.quizVoList && data.quizVoList.length > 0) {
          const question = data.quizVoList[0].questionList[0];
          const options = question.q_option.split(',');
          this.qnId = data.quizVoList[0].questionnaire.id; // 保存問卷的 qnId
          // 在获取到问卷信息后调用 initChart 方法
          this.initChart(options, quizId);
        } else {
          console.error('無效的數據格式或沒有可用的數據。');
        }
      } catch (error) {
        console.error('獲取測驗信息時出錯：', error);
      }
    },

    async fetchAnswerData(quizId) {
      try {
        const response = await axios.get('http://localhost:8080/api/quiz/getAnsId', {
          params: { id: quizId }
        });
        const data = response.data;
        console.log('答案數據：', data); // 印出使用者資料

        if (data.rtncode === "SUCCESSFUL" && data.user && data.user.ans && data.user.qnId === this.qnId) {
          const userAnswer = data.user.ans;
          return userAnswer ? userAnswer.split(',') : [];
        } else {
          console.error('無效的數據格式或沒有可用的數據，或者 qnId 不匹配。');
          return [];
        }
      } catch (error) {
        alert("獲取答案數據時出錯");
        console.error('獲取答案數據時出錯：', error);
        return [];
      }
    },

    calculateVotes(options, userAnswers) {
      const optionsVotes = options.reduce((acc, option) => {
        acc[option] = 0; // 初始化每個選項的投票數
        return acc;
      }, {});

      userAnswers.forEach(answer => {
        if (optionsVotes.hasOwnProperty(answer)) {
          optionsVotes[answer] += 1; // 增加該答案的投票數
        }
      });

      const chartData = options.map(option => ({
        value: optionsVotes[option],
        name: option
      }));

      return chartData;
    },

    async initChart(options, quizId) {
      try {
        const userAnswers = await this.fetchAnswerData(quizId);
        console.log('用戶答案：', userAnswers); // 調試日誌
        const data = this.calculateVotes(options, userAnswers);
        console.log('圖表數據：', data); // 調試日誌

        const chartInstance = echarts.init(this.$refs.pieChart);
        const option = {
          tooltip: { trigger: 'item' },
          legend: { top: '5%', left: 'center' },
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
              label: { show: false, position: 'center' },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: { show: false },
              data: data
            }
          ]
        };
        chartInstance.setOption(option);
      } catch (error) {
        console.error('初始化圖表時出錯：', error);
      }
    }
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
