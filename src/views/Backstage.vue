<script>
//後臺版面
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      title1: "",   // 用於綁定標題的變數
      is_published: true, 
      startDate: "", 
      endDate: "", 
      quizData: [], // 用於存儲從後端 API 收到的問卷資料
      intList: [],  //用於儲存被選中的問卷 ID。在 handleCheckboxChange 方法中，被選中的問卷 ID 會被加入這個陣列。
      quizIds: [],  //儲存選中問卷 ID。在 handleCheckboxChange 方法中，用於檢查已經選中的問卷 ID 是否已存在於此陣列中，並作出對應的操作。
      selectedQuiz: [],
      selectedQuizId: "", //綁定回傳給DB的問卷ID
      //↓修改彈跳視窗
      showDialog: false, //建立彈跳視窗變數showDialog預設布林值為false
      currentPage: 1,    // 目前頁碼
      perPage: 10,       // 每頁顯示的項目數量
    };
  },
  //mounted掛載，Vue 的生命週期方法 mounted。當這個組件被加載到 DOM 中時，mounted 方法會被調用。在這裡，我們使用 async/await 的方式呼叫了 searchAll 方法。await 關鍵字用於等待 searchAll 方法完成執行。
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
    //搜尋全部方法。方法主要用於從指定 URL 的 API 端點獲取資料，將其轉換為 JSON 格式，並將結果儲存在 this.quizData 陣列中，以供後續使用。
    searchAll() {
      //使用 fetch 方法發送請求，該請求返回一個 Promise，它將包含從伺服器獲取的回應。
      const url = `http://localhost:8080/api/quiz/search?`;
      fetch(url)
        //收到伺服器回傳的回應時，這一行的程式碼將該回應解析為 JSON 格式。
        .then((res) => res.json())
        //當 JSON 格式的資料已經被解析完成後，這個函式將被執行。這裡的 data 變數將包含從 API 取得的資料。
        .then((data) => {
          this.quizData = [];
          //將取得的資料中的 quizVoList 欄位賦值給 temp 變數。
          let temp = data.quizVoList;
          temp.forEach((element) => {
            let quiz = element.questionnaire;
            // 在這裡檢查問卷的開始和結束時間，並更新狀態
            let now = new Date().getTime();
            let startDate = new Date(quiz.startDate).getTime();
            let endDate = new Date(quiz.endDate).getTime();
            //判斷問卷開始日期及結束日期
            if (now < startDate) {
              quiz.status = "尚未開始";
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
        //處理可能發生的錯誤。如果請求遇到問題，錯誤將會在這裡被捕獲並列印到控制台中。
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
    //刪除問卷
    deleteQuestionnaire() {
      axios.post("http://localhost:8080/api/quiz/deleteQuestionnaire", this.selectedQuiz)
        .then((response) => {
          alert("刪除成功");
          console.log("刪除成功", response.data);
          // 重新取得更新後的問卷列表
          this.searchAll();
        })
        .catch((error) => {
          console.error("刪除失敗", error);
        });
    },
    //刪除後重新取得更新後的問卷列表
    fetchQuestionnaireList() {
      const url = `http://localhost:8080/api/quiz/search?`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.quizData = data.quizVoList; // 更新問卷列表
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //處理複選框更改方法。接收一個 ID 作為參數，為問卷的 ID。
    handleCheckboxChange(id) {
      //將接收到的 ID 加入到 push將id推向intList 陣列中。
      this.intList.push(id);
      console.log(this.intList);
      // 檢查 quizIds 陣列是否包含該 ID。如果不包含，則將該 ID 加入 quizIds 陣列；如果已存在，則從陣列中移除。
      // 假設quizIds是用於儲存選中問卷ID的陣列
      if (!this.quizIds.includes(id)) {
        // 如果該 ID 不在陣列中，則將其加入陣列
        this.quizIds.push(id);
      } else {
        // 如果該 ID 已經在陣列中，則將其從陣列中移除
        const index = this.quizIds.indexOf(id);
        if (index > -1) {
          this.quizIds.splice(index, 1);
        }
      }
      return this.intList;
    },
    //修改問卷資料方法
    sendQuizDataToServer() {
      // 定義問卷資料
      const questionnaireData = {
        id: this.selectedQuizId, // 使用所選問卷的ID
        title: this.selectedQuiz.title,
        description: this.selectedQuiz.description,
        is_published: false,
        startDate: this.selectedQuiz.startDate,
        endDate: this.selectedQuiz.endDate,
      };
      // 將問題列表轉換為新的格式，以符合API要求
      const questionListData = this.selectedQuestions.map((question) => {
        return {
          id:question.id,
          qn_id: question.qn_id,
          q_title: question.q_title,
          option_type: question.option_type,
          is_necessary: question.is_necessary,
          q_option: question.q_option,
        };
      });
      axios.post(`http://localhost:8080/api/quiz/update`, {
          questionnaire: questionnaireData,
          questionList: questionListData,
        })
        .then((response) => {
          alert("修改成功");
          console.log("Response from server:", response.data);
          // 請求成功的回應處理
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
      //點擊修改後同時關閉視窗
      this.closeDialog();
    },
    //關閉彈出視窗當為false時關閉視窗
    closeDialog() {
      this.showDialog = false;
    },
    //彈出視窗顯示被選中的問卷標題ID
    Dialog(quizId) {
      // 使用動態生成的 URL 發送請求以取得問卷資料
      const apiUrl = `http://localhost:8080/api/quiz/getQuizInfo?id=${quizId}`;
      // 發送請求獲取問卷及問題資料
      axios.get(apiUrl).then((response) => {
          // 將取得的資料賦值給 selectedQuizData
          const selectedQuizData = response.data.quizVoList[0];
          // 確保資料非空才繼續執行
          if (selectedQuizData) {
            // 將問卷資料賦值給 selectedQuiz
            this.selectedQuizId = selectedQuizData.questionnaire.id;
            this.selectedQuiz = selectedQuizData.questionnaire;
            // 將問題資料賦值給 selectedQuestions
            this.selectedQuestions = selectedQuizData.questionList;
            // 打開彈跳視窗
            this.showDialog = true;
            // Log for debugging
            console.log("Selected Quiz Data:", this.selectedQuiz);
            console.log("Selected Questions:", this.selectedQuestions);
          } else {
            console.error("Selected quiz data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching quiz info:", error);
        });
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
    <div class="formTitle">
      <div class="formTitleArea">
        <span style="padding-left: 20px">問卷名稱:</span>
        <input type="text" class="TitleBtn" v-model="title1" />
      </div>
      <br />
      <div class="starTitle">
        <span>開始/結束:</span>
        <input type="date" class="TitleBtn1" v-model="startDate" />
        <input type="date" class="TitleBtn2" v-model="endDate" />
        <button type="button" class="search" @click="searchQuestionnaire">搜尋</button>
      </div>
    </div>
    <div class="iconBig">
      <div class="icon">
        <button type="button" class="btnn">
          <i class="fa-solid fa-trash-can" @click="deleteQuestionnaire" style="margin-left: 10px"></i>
        </button>
      </div>
      <div class="icon">
        <button type="button" class="btnn">
          <RouterLink class="routerItem" to="/Create"><i class="fa-solid fa-plus"></i></RouterLink>
        </button>
      </div>
    </div>
    <div class="formArea">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">編號</th>
            <th scope="col">問卷名稱</th>
            <th scope="col">狀態</th>
            <th scope="col">開始時間</th>
            <th scope="col">結束時間</th>
            <th scope="col">統計結果</th>
            <th scope="col">修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quiz, index) in paginatedData" :key="index">
            <th scope="row">
              <input type="checkbox" v-bind:value="quiz.id" v-model="selectedQuiz" />
            </th>
            <td>#{{ quiz.id }}</td>
            <td>{{ quiz.title }}</td>
            <td :style="{color: quiz.status === '進行中' ? 'green' : quiz.status === '已結束' ? 'red' : 'blue'}">{{ quiz.status }}</td>
            <td>{{ quiz.startDate }}</td>
            <td>{{ quiz.endDate }}</td>
            <td>
              <template v-if="quiz.status === '未發布'">觀看結果</template>
              <RouterLink v-else :to="{ path: '/Statistics', query: { quizId: quiz.id } }">觀看結果</RouterLink>
            </td>
            <td>
              <button type="button" style="border: none" @click="Dialog(quiz.id)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="showbox" v-if="showDialog">
      <div>
        <label for="title">問卷標題:</label><br />
        <input type="text" id="title" class="btn1" placeholder="問卷標題" v-model="selectedQuiz.title" />
      </div>
      <div>
        <label for="description">問卷描述:</label><br />
        <input type="text" id="description" class="btn1" placeholder="問卷描述" v-model="selectedQuiz.description" />
      </div>
      <div>
        <label for="startDate">開始日期:</label><br />
        <input type="date" id="startDate" class="btn1" v-model="selectedQuiz.startDate" />
      </div>
      <div>
        <label for="endDate">結束日期:</label><br />
        <input type="date" id="endDate" class="btn1" v-model="selectedQuiz.endDate" />
      </div>
      <div v-for="(question, index) in selectedQuestions" :key="index">
        <label :for="'questionTitle' + index">問題{{ index + 1 }}:</label><br />
        <input type="text" :id="'questionTitle' + index" class="btn1" v-model="question.q_title" :placeholder="'問題' + (index + 1) + '標題'" />
        <br /><label :for="'questionOption' + index">問題{{ index + 1 }}的選項:</label><br />
        <input type="text" :id="'questionOption' + index" class="btn1" v-model="question.q_option" :placeholder="'問題' + (index + 1) + '選項'" />
      </div>
      <button type="button" class="btn2" @click="sendQuizDataToServer()">修改</button>
      <button type="button" class="btn2" @click="closeDialog()">取消</button>
    </div>

    <div class="bottom">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click="gotoPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.allArea {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f7f6;
  padding: 20px;

  .formTitle {
    width: 90vw;
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5vh;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    .formTitleArea,
    .starTitle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1vh;

      .label {
        white-space: nowrap;
        padding-right: 10px;
      }

      .TitleBtn,
      .TitleBtn1,
      .TitleBtn2 {
        flex-grow: 1;
        margin-right: 10px;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      .TitleBtn1,
      .TitleBtn2 {
        max-width: calc(50% - 40px);
      }

      .search {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #4121b6;
        }
      }
    }
  }

  .iconBig {
    width: 140px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .icon {
      width: 30px;

      .btnn {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 24px;
        color: #333;
        transition: color 0.3s ease;

        &:hover {
          color: #4CAF50;
        }
      }
    }
  }

  .formArea {
    width: 90vw;
    height: 500px; /* Fixed height for 10 rows */
    border: 3px solid #333;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden; /* Hide overflow to avoid scrollbars */

    table {
      width: 100%;
      height: 100%;
      table-layout: fixed;

      thead {
        display: table;
        width: 100%;
        table-layout: fixed;
        background-color: #f9f9f9;
      }

      tbody {
        display: table;
        width: 100%;
        table-layout: fixed;
        overflow: hidden; /* Hide overflow to avoid scrollbars */
        height: calc(100% - 40px); /* Adjust height to fill remaining space after header */

        tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      }
    }
  }

  .showbox {
    position: fixed;
    width: 30vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 3px solid #333;
    padding: 20px;
    z-index: 1000;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    .btn1 {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    .btn2 {
      padding: 10px 20px;
      margin-right: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #4121b6;
      }
    }
  }

  .bottom {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .pagination {
      display: flex;
      list-style: none;
      padding: 0;

      .page-item {
        margin: 0 5px;

        &.disabled .page-link {
          cursor: not-allowed;
          opacity: 0.5;
        }

        &.active .page-link {
          background-color: #4CAF50;
          border-color: #4CAF50;
          color: white;
        }

        .page-link {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #333;
          text-decoration: none;

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
}
</style>

