<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      questionnaireTitle: "",
      questionnaireDescription: "",
      startDate: "",
      endDate: "",
      questions: [],
      option_type: '' // 初始化选项类型
    };
  },
  methods: {
    //新增問題
      addQuestion() {
      this.questions.push({
        text: '',
        options: '',
        required: false
    });
  },
  //新增問卷
  createQuiz() {
  if (this.questionnaireTitle.trim() === '' || this.questionnaireDescription.trim() === '' || this.startDate.trim() === '' || this.endDate.trim() === '' || this.questions.length === 0) {
    alert('請填寫所有問卷必填資料!');
    return;
  }
    // 檢查每個問題必填資料
    for (let question of this.questions) {
        if (
          question.text.trim() === '' ||
          question.options.trim() === ''
        ) {
          alert('問卷問題不得為空，請填寫所有問卷問題必填資料!');
          return;
        }
      }
  const requestData = {
    questionnaire: {
      title: this.questionnaireTitle,
      description: this.questionnaireDescription,
      startDate: this.startDate,
      endDate: this.endDate
    },
    questionList: this.questions.map(question => ({
      q_title: question.text,
      option_type: this.option_type,
      q_option: question.options,
      is_necessary: question.required
    }))
  };
  //  POST 新增問卷
  axios.post("http://localhost:8080/api/quiz/create", requestData)
    .then(response => {
      console.log(response.data.rtncode);
      alert("新增問卷成功");
      this.questionnaireTitle = '';
      this.questionnaireDescription = '';
      this.startDate = '';
      this.endDate = '';
      this.questions = [];
    })
    .catch(error => {
      console.error("Error creating quiz:", error);
      alert("新增問卷失敗");
    });
    },
    }
  };
</script>

<template>
    <div class="all">
      <div class="bgArea">
        <div class="inputArea">
          <div class="inputArea1">
            <h4 class="num">問卷名稱</h4>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"></label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="questionnaireTitle"
                required/>
            </div>
          </div>
  
          <div class="inputArea2">
            <h4 class="num1">問卷描述</h4>
            <div class="mb-3">
              <label for="descriptionInput" class="form-label"></label>
              <textarea
                class="form-control"
                id="descriptionInput"
                aria-describedby="emailHelp"
                v-model="questionnaireDescription"></textarea>
            </div>
          </div>
  
          <div class="inputArea1">
            <h4 class="num">開始時間</h4>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"></label>
              <input
                type="date"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="startDate"
                required
              />
            </div>
          </div>
  
          <div class="inputArea1">
            <h4 class="num">結束時間</h4>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"></label>
              <input
                type="date"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="endDate"
                required/>
            </div>
          </div>
  
          <div class="formArea" style="height: 200px; width: 70vw; margin-right: 20%; overflow: auto">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">問題</th>
            <th scope="col">選項</th>
            <th scope="col">是否必填</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in questions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <input type="text" v-model="question.text" required />
            </td>
            <td>
              <input type="text" v-model="question.options" required />
            </td>
            <td>
              <input type="checkbox" v-model="question.required" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
          <div class="bottom">
            <RouterLink class="routerItem" to=/Backstage><button type="button" class="btn">取消</button></RouterLink>
            <button type="button" class="pointer" @click="addQuestion">新增問題</button>
            <button type="button" class="pointer" @click="createQuiz">新增問卷</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style  lang="scss" scoped>
.all {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bgArea {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

.inputArea {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inputArea1,
.inputArea2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.inputArea1 input,
.inputArea2 textarea {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
}

.bottom {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.pointer{
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
}

.btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.pointer {
  cursor: pointer;
}
  </style>
  