<script> //後臺版面管理版面
import { RouterLink,RouterView } from 'vue-router';
import axios from 'axios'
export default {
    data(){
        return{
          //宣告綁定變數預設為空
            binding:"",
            binding1:"",
            binding2:"",
            binding3:"",
        }
    },
     //mounted 生命週期 ，掛載
      mounted(){
        console.log(this.id)
        console.log(this.title)
        console.log(this.description)
        console.log(this.startDate)
        console.log(this.endDate)
    },
    components:{
        RouterLink
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
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="binding"/>
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
      v-model="binding1"
    ></textarea>
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
            aria-describedby="emailHelp" v-model="binding2"/>
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
            v-model="binding3"/>
        </div>
      </div>

      <div class="bottom">
        <!-- 像是get到後端的概念 只是換到前端來,把問卷資料 標題,描述,時間,往下一個頁面帶 -->
        <RouterLink class="routerItem" to=/Backstage><button type="button" class="btn">取消</button></RouterLink>
        <RouterLink class="routerItem" :to="{path:'/topic',query:{title:binding, description:binding1, startDate:binding2, endDate:binding3}}"><button type="button" class="btn">下一頁</button></RouterLink>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>

.all{
  margin-top: 2%;
  position: relative;

.hearder{
  width: 10vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin-left: 10%;
  border-radius: 5px;

  .hearder1{
    width: 5vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  }
}
.bgArea {
  width: 80vw;
  height: 85vh;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10%;
  background-color: #a65e5e;

  .inputArea {
    width: 80vw;
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .inputArea1{
    height: 15vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .num{
      margin-right: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form-control{
        width: 500px;
        height: 50px;
    }
  }

.inputArea2{
    height: 20vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
    
    textarea {
    word-wrap: break-word;
  }
    .num1{
      margin-left: -2%;
    }
    .form-control{
        width: 600px;
        height: 100px;
        margin-left: 20%;
    }
  }
  .bottom{
    height: 10vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
    .btn{
      width: 100px;
      height: 50px;
      background-color: rgb(32, 50, 47);
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: whitesmoke;
    }
  }
}
}
</style>
