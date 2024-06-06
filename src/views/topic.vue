<script>
//問卷題目
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
export default {
  //formatOption 過濾器被定義為接收一個值（布林值）並返回對應的字串（是或否）。
  filters: {
    formatOption(value) {
      return value ? "是" : "否";
    },
  },
  data() {
    return {
      //來從路由的查詢參數中取得名為 title 的值，並將其賦值給這個組件的 title 屬性。
      title: this.$route.query.title,
      //路由的查詢參數中取得 description 的值，並賦值給 description 屬性。
      description: this.$route.query.description,
      //路由查詢參數中的 startDate 的值，並將其賦值給 startDate 屬性。
      startDate: this.$route.query.startDate,
      //查詢參數中的 endDate 的值，並賦值給 endDate 屬性。
      endDate: this.$route.query.endDate,
      //宣告空陣列,存放問題和選項。
      questionArrays: [],
      //綁定輸入框中的問題文字。在使用者輸入問題後，這個資料屬性將會保存輸入的問題內容。
      question: "",
      //綁定輸入框中的選項文字。使用者輸入選項後，這個資料屬性將會保存輸入的選項內容。
      option: "",
      //綁定是否必填
      option_type: "",
    };
  },
  //mounted 生命週期 ，掛載
  mounted() {
    console.log(this.title);
    console.log(this.description);
    console.log(this.startDate);
    console.log(this.endDate);
  },
  methods: {
    //新增問卷方法
    createQuiz() {
      try {
        // 构建問卷數據
        const response = axios.post("http://localhost:8080/api/quiz/create", {
            questionnaire: {
              title: this.title,
              description: this.description,
              publishede: false,
              startDate: this.startDate,
              endDate: this.endDate,
            },
            questionList: this.questionArrays,
          })
          //請求成功時（.then 區塊），res 是後端返回的回應物件。在這個範例中，它會印出後端回傳的 rtncode。
          .then((res) => {
            console.log(res.data.rtncode);
            alert("新增問卷成功"); // 彈出提示視窗告知使用者新增問卷成功。
          })
          //若請求失敗，錯誤將被捕獲並在控制台中印出。
          .catch((e) => {
            {
              console.log(e);
            }
          });
        console.log("Quiz created:", response.data);
      } catch (error) {
        // 處理錯誤
        console.error("Error creating quiz:", error);
      }
    },
    //新增問卷問題
    addQuestion() {
      /*將輸入的值綁成一個陣列再推到陣列中   key對value值
        新增的問題資料整理並推送到 questionArrays 陣列中。
        push() 方法將一個新的物件推送到陣列中。這個物件包含了問題標題 (q_title)、選項類型 (option_type)、是否必填 (is_necessary) 和問題選項 (q_option)。*/
        this.questionArrays.push({
        q_title: this.question,
        option_type: this.option_type,
        is_necessary: true,
        q_option: this.option,
      });
      console.log(this.questionArrays);
    },
  },
  components: {
    RouterLink,
  },
  /*創建一個新的計算屬性 processedQuestionArrays。這個屬性使用 map 函數遍歷 questionArrays 陣列中的每個物件。*/
  computed: {
    processedQuestionArrays() {
      return this.questionArrays.map((item) => {
        return {
          ...item,
          option_type: this.$options.filters.formatOption(item["option_type"]),
        };
      });
    },
  },
};
</script>

<template>
  <div class="allArea">
    <div class="formTitle">
      <div class="formTitleArea">
        <span style="padding-left: 20px">　問題</span>
        <input type="text" class="TitleBtn" v-model="question" />
        <input type="checkbox" v-model="option_type" />必填
      </div>
      <br />
      <div class="starTitle">
        <span>　選項</span>
        <input type="text" class="TitleBtn" v-model="option" />
        <button type="button" class="search" @click="addQuestion">加入</button>
      </div>
    </div>
    <div class="iconBig">
      <div class="icon">
        <button type="button" class="btnn" @click="">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
    <div
      class="formArea"
      style="height: 200px; width: 70vw; margin-right: 20%; overflow: auto"
    >
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">問題</th>
            <th scope="col">選項</th>
            <th scope="col">必填</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in processedQuestionArrays">
            <th>{{ index + 1 }}</th>
            <th>{{ item["q_title"] }}</th>
            <th>{{ item["q_option"] }}</th>
            <th>{{ item["option_type"] }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom">
      <button type="button" class="pointer">
        <RouterLink class="btnn" to="/Manage" style="color: black">取消</RouterLink>
      </button>
      <button type="button" class="pointer" @click="createQuiz">送出</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.allArea {
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eaeff1;
  .formTitle {
    width: 60vw;
    height: 30vh;
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 30%;
    margin-bottom: 5vh;
    margin-top: 5vh;
    .formTitleArea {
      width: 50vw;
      display: flex;
      align-items: center;

      .TitleBtn {
        width: 520px;
        height: 50px;
        display: flex;
        align-items: center;
        margin-left: 6%;
      }
    }

    .starTitle {
      width: 50vw;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .search {
        width: 50px;
        height: 40px;
      }
      .TitleBtn {
        width: 520px;
        height: 50px;
        display: flex;
        align-items: center;
        margin-right: 22px;
      }
    }
  }
  .iconBig {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-right: 83%;
    .icon {
      width: 30px;
      margin-right: 82%;
      .btnn {
        border: none;
      }
    }
  }
  .formArea {
    width: 60vw;
    height: 30vh;
    border: 3px solid black;
    margin-right: 10%;
  }

  .bottom {
    width: 40vw;
    height: 15vh;
    // border: 1px solid blue;
    display: flex;
    align-items: center;
    margin-right: 70%;
    justify-content: space-evenly;
    .btnn {
      width: 70px;
      cursor: pointer; /* 將指針樣式設置為手的樣式 */
      transition: all 0.3s ease; /* 添加過渡效果使得切換更平滑 */
      &:hover {
        cursor: pointer; /* 在懸停時保持手指樣式 */
      }
    }
    .pointer {
      width: 70px;
      background-color: rgb(20, 182, 191);
      cursor: pointer; /* 將指針樣式設置為手的樣式 */
      transition: all 0.3s ease; /* 添加過渡效果使得切換更平滑 */

      &:hover {
        cursor: pointer; /* 在懸停時保持手指樣式 */
        /* 添加其他您想要的樣式，例如改變背景色、文字顏色等 */
      }
    }
  }
}
</style>
