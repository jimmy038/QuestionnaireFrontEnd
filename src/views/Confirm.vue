<script>
import { RouterLink} from "vue-router";
import axios from 'axios';
export default {
  data() {
    return {
      //從路由的參數中取得 name 的值，並將其賦值給這個組件的 name 屬性，是未定義或空值，則會將空字串賦給 name
      name: this.$route.query.name || "", // 設置預設值以避免未定義錯誤
      number: this.$route.query.number || "",
      email: this.$route.query.email || "",
      age: this.$route.query.age || "",
      foodChoice: this.$route.query.foodChoice || "",
      qusetionnaireId: this.$route.query.qnid || "", //接問卷id
      qusetion:this.$route.query.qusetion || "",
      Title:this.$route.query.quizTitle || "",
      qnDescription:this.$route.query.quizDescription || "",
      showModal: false,
      // 定義userData物件，物件內包路由傳過來的參數值
      userData: {
        //從路由的參數中取得 name 的值，是未定義或是空值，則會將空字串賦給 name。
        name: this.name || "",
        phoneNumber: this.number || "",
        email: this.email || "",
        age: this.age || "",
        ans: this.foodChoice,
        qusetionnaireId: this.$route.query.qnid || "", 
      }
    };
  },
  //mounted 生命週期 ，掛載
  mounted() {
    console.log(this.qusetionnaireId); // 檢查qnId是否正確獲取
    console.log(this.Title);
    console.log(this.qnDescription);
    console.log(this.name);
    console.log(this.number);
    console.log(this.email);
    console.log(this.age);
    console.log(this.foodChoice);
  },
  methods: {
    //儲存使用者資料 ，saveUsers 的異步方法 (async)
    async saveUsers() {
  try {
    this.userData = {
      name: this.$route.query.name || "",
      phoneNumber: this.$route.query.number || "",
      email: this.$route.query.email || "",
      age: this.$route.query.age || "",
      ans: this.foodChoice,
      qnId: this.qusetionnaireId || "", 
    };
    const response = await axios.post("http://localhost:8080/api/quiz/saveUser", this.userData);
    console.log("Quiz created:", response.data.rtncode);
    alert("感謝您的寶貴意見。");
  } catch (error) {
    console.error("Error creating quiz:", error);
  }
},
    },
    components: {
      RouterLink,
    },
  };
</script>

<template>
  <div class="all">
    <div class="topArea">
      <h1 style="color: blue;">問卷編號 : {{ qusetionnaireId }}</h1><hr>
      <h1 style="color: blue;">問卷標題 : {{ $route.query.quizTitle }}</h1><hr>
      <h1 style="color: blue;">問卷描述 : {{ qnDescription }}</h1>
    </div>
    <div class="content">
      <div class="nameShow">
        <h2>姓名 : {{ $route.query.name }}</h2>
        <br />
      </div>
      <div class="numbereShow">
        <h2>手機 : {{ $route.query.number }}</h2>
        <br />
      </div>
      <div class="emailShow">
        <h2>Email : {{ $route.query.email }}</h2>
        <br />
      </div>
      <div class="ageShow">
        <h2>年齡 : {{ $route.query.age }}</h2>
        <br />
      </div>
    </div>
    <div class="bottom">
      <h4>您所投票的選項為: {{ $route.query.foodChoice }}</h4>
    </div>
    <div class="bottom2">
      <RouterLink :to="{ path: '/Answer',
        query: {
        title: this.$route.query.quizTitle,
        name: this.name,
        number: this.number,
        email: this.email,
        age: this.age,
        foodChoice: this.foodChoice,},}">
    </RouterLink>
        <button type="button" class="btn" @click="saveUsers">送出</button>
    </div>
    <div>
      <Modal v-model="showModal" title="資料已填寫完成">
        <p>您的資料已成功填寫！</p>
      </Modal>
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
  background-color: rgb(245, 211, 191);
  flex-direction: column;

  .topArea {
    width: 100vw;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: flex-end;
      margin-left: 70%;
    }
  }

  .content {
    width: 50vw;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-left: 30%;
    margin-top: 5%;

    .nameShow {
      height: 10vh;
      width: 50vw;
    }

    .numbereShow {
      height: 10vh;
      width: 50vw;
    }

    .emailShow {
      height: 10vh;
      width: 50vw;
    }

    .ageShow {
      height: 10vh;
      width: 50vw;
    }
  }

  .bottom {
    width: 100vw;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom2 {
    width: 100vw;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      width: 130px;
      height: 50px;
      border: 1px solid black;
      background-color: rgb(85, 85, 233);
      border-radius: 10px;
      color: white;
    }
  }
}
</style>
