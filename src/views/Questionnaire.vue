<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      title1: "",        // 用於綁定標題的data屬性
      is_published: true,
      startDate: "",     // 用於綁定開始日期的data屬性
      endDate: "",       // 用於綁定結束日期的data屬性
      quizData: [],      // 用於存儲從後端 API 收到的問卷資料
      title: "",         // 初始化 'title' 属性
      currentPage: 1,    // 目前頁碼
      perPage: 10,       // 每頁顯示的項目數量
    };
  },
  //mounted掛載，Vue 的生命週期方法 mounted。當這個組件被加載到 DOM 中時，mounted 方法會被調用。
  //在這裡，我們使用 async/await 的方式呼叫了 searchAll 方法。await 關鍵字用於等待 searchAll 方法完成執行，然後再繼續後續的操作。
  async mounted() {
    await this.searchAll();
  },
  computed: {
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.quizData.length / this.perPage);
    },
    // 根據目前頁碼和每頁顯示的項目數量，計算出要顯示的資料範圍
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.quizData.slice(start, end);
    },
  },
  methods: {
    //搜尋全部。方法主要用於從指定 URL 的 API 端點獲取資料，將其轉換為 JSON 格式，並將結果儲存在 this.quizData 陣列中，以供後續使用。
    searchAll() {
      //使用 fetch 方法發送請求，該請求返回一個 Promise，它將包含從伺服器獲取的回應。
      const url = `http://localhost:8080/api/quiz/search?`;
      fetch(url)
        //收到伺服器回傳的回應時，這一行的程式碼將該回應解析為 JSON 格式。
        .then((res) => res.json())
        //當 JSON 格式的資料已經被解析完成後，這個函式將被執行。這裡的 data 變數將包含從 API 取得的資料。
        .then((data) => {
          //將取得的資料中的 quizVoList 欄位賦值給 temp 變數。
          let temp = data.quizVoList;
          //使用 forEach 迴圈將 temp 中的每個元素的 questionnaire 屬性添加到 this.quizData 陣列中。
          temp.forEach((element) => {
            let quiz = element.questionnaire;
            // 在這裡檢查問卷的開始和結束時間，並更新狀態
            let now = new Date().getTime();
            let startDate = new Date(quiz.startDate).getTime();
            let endDate = new Date(quiz.endDate).getTime();
            //判斷已發布未發布或是已結束
            if (now < startDate) {
              quiz.status = "未發布";
            } else if (now > endDate) {
              quiz.status = "已結束";
            } else {
              quiz.status = "進行中";
            }
            this.quizData.push(quiz);
          });
          //印出 quizData 變數，確保它已被正確地設置為 API 返回的資料。
          console.log(this.quizData);
        })
        //印出可能發生的錯誤。
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //搜尋問卷 模糊搜尋
    async searchQuestionnaire() {
      const title = this.title1;
      const startDate2 = this.startDate != null ? this.startDate : "1990-01-01";
      const endDate2 = this.endDate != null ? this.endDate : "2050-01-01";
      console.log(this.startDate);
      console.log(this.endDate);
    try {
      const response = await axios.get(`http://localhost:8080/api/quiz/searchQuiz?title=${title}&startDate=${startDate2}&endDate=${endDate2}`);
      const questionnaireList = response.data.questionnaireList;
      questionnaireList.forEach((questionnaire) => {
        let now = new Date().getTime();
        let startDate = new Date(questionnaire.startDate).getTime();
        let endDate = new Date(questionnaire.endDate).getTime();
        if (now < startDate) {
          questionnaire.status = "尚未開始";
        } else if (now > endDate) {
        questionnaire.status = "已結束";
        } else {
        questionnaire.status = "進行中";
        }
      });
      this.quizData = questionnaireList;
      console.log(this.quizData);
      } catch (error) {
      console.error("Error fetching questionnaire list:", error);
      }
    },
    //抓取對應問卷ID
    fetchQuizData(quizId) {
      axios.get(`http://localhost:8080/api/quiz/getQuizInfo?id=${quizId}`)
        .then((response) => {
          this.questionnaire = response.data.quizVoList[0].questionnaire;
          this.questions = response.data.quizVoList[0].questionList;
        })
        .catch((error) => {
          console.error("發生錯誤！", error);
        });
    },
    // 點擊問卷時的前往對應問卷的操作
    onClickQuiz(quizId) {
    const selectedQuiz = this.quizData.find((quiz) => quiz.id === quizId);
    if (selectedQuiz.status === "進行中") {
      this.$router.push({
        path: "/Answer",
        query: {
          quizId,                                 //問卷id
          title: selectedQuiz.title,              // 標題
          description: selectedQuiz.description,  // 描述
          q_option: selectedQuiz.q_option,        // 問題
        },
      });
    }
  },
    // 切換至上一頁
    prevPage() {
      if (this.currentPage > 1) {
      this.currentPage--;
      }
    },
    // 切換至下一頁
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // 前往指定頁碼
    gotoPage(page) {
      this.currentPage = page;
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<template>
  <div class="allArea">
    <!-- 搜尋條件區域 -->
    <div class="formTitle">
      <div class="formTitleArea">
        <span style="padding-left: 20px">　問卷名稱 : </span>
        <input type="text" class="TitleBtn" v-model="title1" />
      </div>
      <br />
      <div class="starTitle">
        <span>　開始/結束:　</span>
        <input type="date" class="TitleBtn1" v-model="startDate" />
        <input type="date" class="TitleBtn2" v-model="endDate" />
        <button type="button" class="search" @click="searchQuestionnaire">搜尋</button>
      </div>
    </div>

    <!-- 問卷列表區域 -->
    <div class="formArea">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">編號</th>
            <th scope="col">問卷名稱</th>
            <th scope="col">狀態</th>
            <th scope="col">開始時間</th>
            <th scope="col">結束時間</th>
            <th scope="col">統計結果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quiz, index) in paginatedData" :key="index">
            <th scope="row">#{{ quiz.id }}</th>
            <td @click="onClickQuiz(quiz.id)">
      <RouterLink v-if="quiz.status === '進行中'" :to="{
        path: '/Answer',
        query: {
          quizId: quiz.id,
          title: quiz.title,
          description: quiz.description,
          q_option: quiz.q_option,
          },
      }">{{ quiz.title }}
    </RouterLink>
        <span v-else>{{ quiz.title }}</span>
        </td>
            <td :style="{color:quiz.status === '進行中' ? 'blue': quiz.status === '已結束' ? 'red': 'green',}">
              {{ quiz.status }}
            </td>
            <td>{{ quiz.startDate }}</td>
            <td>{{ quiz.endDate }}</td>
            <td>
              <template v-if="quiz.status === '未發布'">觀看結果</template>
              <RouterLink v-else :to="{path: '/Statistics', query: {quizId: quiz.id,} ,}" >觀看結果</RouterLink>
            </td>          
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分頁區域 -->
    <div class="bottom">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <!-- 前往上一頁的按鈕 -->
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <!-- 顯示分頁按鈕 -->
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click="gotoPage(page)">{{ page }}</a>
          </li>
          <!-- 前往下一頁的按鈕 -->
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <RouterLink class="routerItem" to="/Backstage" style="margin-left: 80%"
        ><i class="fa-solid fa-house-lock"></i>
      </RouterLink>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.allArea {
  width: 100vw;
  min-height: 115vh; /* 修改為最小高度以確保內容不會被切斷 */
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #eaeff1;
  position: relative;
  overflow: hidden;

  .formTitle {
  width: 90vw;
  min-height: 20vh; /* 修改為最小高度以確保內容不會被切斷 */
  border: 3px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5vh;
  margin-top: 5vh;

  .formTitleArea {
    width: 90%; /* 修改為相對寬度以適應不同尺寸螢幕 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1vh; /* 添加底部間距 */
    margin-top: 1vh; /* 添加頂部間距 */

    .TitleBtn {
      width: 70%; /* 修改為相對寬度以適應不同尺寸螢幕 */
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 2%; /* 調整左邊間距 */
    }
  }

  .starTitle {
    width: 90%; /* 修改為相對寬度以適應不同尺寸螢幕 */
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1vh; /* 添加底部間距 */
    margin-top: 1vh; /* 添加頂部間距 */

    .search {
      width: 50px;
      height: 40px;
    }
    .TitleBtn1,
    .TitleBtn2 {
      width: 45%; /* 修改為相對寬度以適應不同尺寸螢幕 */
      height: 50px;
    }
  }
}


  .iconBig {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-right: 77%;

    .icon {
      width: 30px;
      margin-right: 82%;

      .btnn {
        border: none;
      }
    }
  }
  .formArea {
    width: 90vw;
    min-height: 40vh; /* 修改為最小高度以確保內容不會被切斷 */
    max-height: 65vh; /* 添加最大高度以避免內容過多時超出螢幕範圍 */
    border: 3px solid black;
    background-color: white;
  }

  .bottom {
    width: 100vw;
    display: flex;
    align-items: center;
    margin-left: 10%;
    margin-top: 2%;
  }

  .not-clickable-link {
    color: #000;
    text-decoration: none;
    cursor: not-allowed;
  }
}

</style>

