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
        const response = await axios.get('http://localhost:8080/api/quiz/getQuizInfo?', {
          params: { id: quizId }
        });
        const data = response.data;
        console.log('測驗信息數據：', data); // 印出問卷及問題內容
        if (data.rtncode === "SUCCESSFUL" && data.quizVoList && data.quizVoList.length > 0) {
          const question = data.quizVoList[0].questionList[0];
          const options = question.q_option.split(',');
          this.qnId = data.quizVoList[0].questionnaire.id; // 保存問卷的 qnId
          // 在获取到问卷信息后调用 initChart 方法
          this.initChart(options, this.qnId);
        } else {
          console.error('無效的數據格式或沒有可用的數據。');
          this.handleError("此問卷尚未被填寫，沒有統計的資料。");
        }
      } catch (error) {
        console.error('獲取測驗信息時出錯：', error);
      }
    },
    async fetchAnswerData(qnId) {
      try {
        //取得所有對應問卷id user表內的 qnid
        const response = await axios.get('http://localhost:8080/api/quiz/getAllQnid?', { 
          params: { qnId }
        });
        const data = response.data;
        console.log('答案數據：', data); // 印出使用者資料
        if (data.rtncode === "SUCCESSFUL" && data.userList && data.userList.length > 0) {
          return data.userList.map(user => user.ans);
        } else {
          console.error('無效的數據格式或沒有可用的數據。');
          this.handleError("此問卷尚未被填寫，沒有統計的資料。");
          return [];
        }
      } catch (error) {
        alert("獲取答案數據時出錯");
        console.error('獲取答案數據時出錯：', error);
        return [];
      }
    },
    //點擊後顯示錯誤訊息帶回問卷頁面
    handleError(message) {
      alert(message);
      this.$router.push('/questionnaire'); // 帶回問卷頁面
    },
    //計算每個選項的投票數，並生成適合餅圖使用的數據格
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
    //通過 fetchAnswerData 獲取用戶答案，然後通過 calculateVotes 計算圖表數據，最後使用 ECharts 初始化並設置餅圖的配置。
    async initChart(options, qnId) {
      try {
        const userAnswers = await this.fetchAnswerData(qnId);
        console.log('用戶答案：', userAnswers); // 調試日誌
        if (userAnswers.length === 0) {
          this.handleError("此問卷並未被填寫，沒有統計的資料。");
          return;
        }
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
  background-color: white;
  }
</style>
