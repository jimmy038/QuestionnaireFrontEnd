<script>
import { write } from '@popperjs/core';

export default{         //data : function(){} 在函式裡放變數,下列為options API的表示方式
    data(){        
        return{
            title: "cool",
            guessNum: "",
            answer: "",
            attempts: 0
        }
    },
    methods: {
        startGame() {
    this.answer = Math.floor(Math.random() * 100) + 1;
    this.guessNum = null;
    this.attempts = 0;
  },
  checkGuess() {
    if (this.guessNum == this.answer) {
      alert(`恭喜！答案是 ${this.answer}`);
      this.startGame();
    } else if (this.guessNum < this.answer) {
      alert("太小了！");
      this.attempts++;
    } else {
      alert("太大了！");
      this.attempts++;
    }
  },
}
}
</script>


<template>
    <div class="all">
    <!-- v-on 想像為JS事件監聽-->
    <h1>v-on</h1>
    <!-- 以下兩者都為v-on表示方式,v-on用在標籤的縮寫為小老鼠@,第一行先註解-->
    <!-- <button type="button" v-on click="print()">btn</button> --> 
    <button type="button" @click="print()">btn</button>

    <select name="" id="" @change="sky()">
        <option value="1">1</option>
        <option value="2">2</option>
    </select>

    <input type="text" v-model="this.text">
    <button type="button" @click="write()">write</button>

    <!-- 用button綁v-on click綁定 -->
    <button type="button" @click="goOtherWat()">OtherWat</button>
    


    <!-- guessNumber(猜數字)區域 -->
    <div class="guessArea">
        <div class="topArea">
            <h1>猜數字</h1>
        </div>
        <div class="guessBox">
            <span>1</span>
            <span>~</span>
            <span>100</span>
            <input type="number" v-model="guessNum">
            <button type="button" @click="checkGuess">猜一下</button>
            <button type="button" @click="startGame">重新开始</button>

        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
.all{   
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    .topArea{
        width: 50vw;
        height: 10vh;
        background-color: rgb(159, 97, 216);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .guessBox{
        width: 50vw;
        height: 40vh;
        background-color: rgb(159, 97, 216);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>