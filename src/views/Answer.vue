<script>
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      binding: "",
      binding1: "",
      binding2: "", 
      binding3: "",
      foodRadio: null,
      quizId: "",//問卷id
      questionnaire: {},
      questions: [],
      title: "",
      quizTitle:"",
      quizData: {
        title: "",
        description: "",
        q_option: [],
      },
    };
  },
  mounted() {
  const routeParams = this.$route.query;
  this.quizId = routeParams.quizId;
  if (this.quizId) {
    this.qnid = this.quizId; // 将问卷 ID 赋值给 qnid
    this.fetchQuizData(this.quizId);
    console.log("Quiz ID from route:", this.quizId);
  } else {
    console.error("Quiz ID is undefined or empty.");
  }
},
  methods: {
    //抓取對應問卷id資料
    async fetchQuizData(quizId) {
  try {
    const response = await axios.get(`http://localhost:8080/api/quiz/getQuizInfo?id=${quizId}`);
    const quizVoList = response.data.quizVoList;
    if (quizVoList && quizVoList.length > 0) {
      const questionnaire = quizVoList[0].questionnaire;
      const questionList = quizVoList[0].questionList;
      this.questionnaire = questionnaire;
      this.quizData.title = questionnaire.title;
      this.quizData.description = questionnaire.description;
      this.quizData.q_option = questionList.map((question) => {
        return {
          label: question.q_title,
          //問題選項改用逗號切割
          value: question.q_option.split(",").filter(Boolean),
        };
      });
      this.questions = questionList;
      this.qnid = quizVoList[0].qnid;
      // 将问卷标题赋值给 quizTitle
      this.quizTitle = questionnaire.title;
    }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  },
    //email防呆
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    //電話號碼防呆，正規表達式
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^09\d{8}$/;
      return phoneRegex.test(phoneNumber);
    },
    //傳送資料方法及防呆
    submitForm() {
  // 不得為空
  if (
    this.binding.trim() === "" ||
    this.binding1.trim() === "" ||
    this.binding2.trim() === "" ||
    !this.binding3 ||
    isNaN(this.binding3) ||
    parseInt(this.binding3) <= 0
  ) {
    alert("請確實填寫所有必填資料!!");
    return;
  }
  if (this.binding.trim() === "") {
    alert("請填寫姓名!!");
    return;
  }
  // 手機號碼格式是否正確
  if (!this.validatePhoneNumber(this.binding1.trim())) {
    alert("請填寫正確的手機號碼!!");
    return;
  }
  //  Email 格式是否正確
  if (this.binding2.trim() === "" || !this.validateEmail(this.binding2.trim())) {
    alert("請填寫正確的 Email 地址!!");
    return;
  }
  // 檢查年齡是否填寫且為正整數
  if (!this.binding3 || isNaN(this.binding3) || parseInt(this.binding3) <= 0) {
    alert("請填寫正確的年齡");
    return;
  }
  // 檢查無誤再傳值
  this.$router.push({
    path: "/confirm",
    query: {
      name: this.binding,
      number: this.binding1,
      email: this.binding2,
      age: this.binding3,
      foodChoice: this.foodRadio,
      qnid: this.quizId,                //傳遞問卷id
      quizTitle: this.quizTitle,        //傳遞問卷標題
      quizDescription:this.quizData.description, //傳遞問卷說明
    question: JSON.stringify(this.quizData)
    },
    });
  },
  },  
  components: {
    RouterLink,
  },
};
</script>

<template>
  <div class="all">
    <!-- 改為動態顯示問卷的標題 -->
    <h3 style="color: blue;">問卷編號 : {{ quizId }}</h3><hr>
    <h3 style="color: blue;">問卷標題 : {{ quizTitle }}</h3><hr>
    <h4 style="color: blue;">問卷描述 : {{ quizData.description }}</h4>
    <!-- ↓此行印出 問卷編號標題描述 -->
    <!-- <pre>{{ $route.query }}</pre> --> 
    <div class="content">
      <div class="name">
        <h2>姓名:</h2>
        <h2>手機:</h2>
        <h2>信箱:</h2>
        <h2>年齡:</h2>
      </div>
      <div class="btn">
        <input type="text" class="input1" v-model="binding" required placeholder="王小名" maxlength="20"/>
        <input type="text" class="input1" v-model="binding1"  @input="validatePhoneNumber" required placeholder="0912345678" maxlength="10" />
        <input type="email" class="input1" v-model="binding2" required placeholder="example123@gmail.com"/>
        <input type="text" class="input1" v-model="binding3" required placeholder="Your-Age" maxlength="2"/>
      </div>
    </div>
    <div class="bottom">
      <div class="form">
        <!-- 將問題動態顯示 -->
        <div class="radio1" v-for="(question, index) in quizData.q_option" :key="index">
          <h4>問題 : {{ question.label }}</h4>
          <div class="options">
              <div class="option" v-for="(option, optIndex) in question.value" :key="optIndex">
                <label :for="`${index}_${optIndex}`">
                  <input type="radio" :id="`${index}_${optIndex}`" :name="'option_' + index"
                  v-model="foodRadio" :value="option"/>
                  <h5>選項{{ optIndex + 1 }}:{{ option }}</h5>
                </label>
              </div>
            </div>
      </div>
    </div>
  </div>
    <div class="bottom2" style="height: 15vh; width: 50vw">
      <RouterLink class="btn3" to="/Questionnaire" style="border: 2px solid black; 
      text-align: center; color: black; text-decoration: none;">取消</RouterLink>
      
      <button type="button" class="btn3" @click="submitForm">送出</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.all {
  width: 100vw;
  height: 115vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(235, 200, 166);
  flex-direction: column;

  .topArea {
    width: 100vw;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .top {
      margin-left: 75%;
    }
  }

  .content {
    width: 80vw;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .name {
      width: 20vw;
      height: 40vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: column;
      margin-left: 25%;
    }

    .btn {
      width: 80vw;
      height: 40vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: column;
      .input1 {
        width: 250px;
        height: 50px;
        border-radius: 10px;
      }
    }
  }

  .bottom {
    width: 100vw;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    // flex-direction: column;
    .radio1 {
      display: flex;
    }
    .food1 {
      padding-top: 1px;
      display: flex;
      margin-left: 20%;
    }
  }

  .bottom2 {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 50%;

    .btn2 {
      width: 65px;
      height: 30px;
      margin-left: 10%;
      background-color: rgb(193, 34, 71);
    }
    .btn3 {
      width: 65px;
      height: 30px;
      margin-left: 10%;
      background-color: rgb(121, 134, 2);
    }
  }
}
</style>
