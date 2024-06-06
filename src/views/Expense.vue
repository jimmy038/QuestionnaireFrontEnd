<script>
export default {
  data() {
    return {
      plusNum: 0,
      neNum: 0,
      totalNum: 0,
      arr: [],          //建立變數放空陣列
      showDialog: false, //建立變數showDialog布林值為false
      showDialog2: false, //顯示刪除的彈跳視窗
      inputName: '',    //用於儲存輸入名稱的變數
      inputMoney: '',   //用於儲存輸入金額的變數
      index:0,
    };
  },

  methods: {                    //方法內通常都用到for迴圈跟if else
    closeDialog() {             //用在上方的X關閉彈出視窗當為false時關閉視窗
      this.showDialog = false;
      this.showDialog2 = false;    //this.為指向
    },
    Dialog() {                  //用在點擊addtransaction後打開輸入視窗的方法
      this.showDialog = true;
    },
    DelteDialog() {             //用在點擊addtransaction後關閉輸入視窗的方法
      this.showDialog = false;
    },
    showDialog1(d) {
      this.showDialog2 = true;
      this.index = d
    },
    saveData() {                
      if(this.inputMoney != ""){
        //保存金額(資料)變動的方法
      // 把輸入的名稱和金額增加到arr這個陣列中,用在儲存紀錄跟更新餘額更新收入及支出
      this.arr.push({
        name: this.inputName,
        money: parseFloat(this.inputMoney), //parseFloat將輸入的金額轉換為浮點數
      })
      // 清空輸入框
      this.inputName = '';
      this.inputMoney = '';
      // 關閉彈出視窗
      this.showDialog = false;
      }
      this.upData()
    },

    // 更新總餘額、收入和支出
    //for(let i =0 ; i < this.arr.le ; i++){if(arr[i].MONEY>0){this.plusNum += arr[i].money;}neNum}
    upData() {
      this.plusNum = 0;
      this.neNum = 0;

      for (let i = 0; i < this.arr.length ; i++) {
        // console.log(this.arr[i].money)
        if (this.arr[i].money > 0) {
          this.plusNum += this.arr[i].money;
        } else {
          this.neNum += this.arr[i].money
        }
      }
      console.log(this.totalNum)
      console.log(this.plusNum)
      console.log(this.neNum)
      this.totalNum = this.plusNum + this.neNum;
    },

    // this.totalNum += parseFloat(this.inputMoney); //將輸入的金額轉換為浮點數並加到總餘額totalNum中
    // if (parseFloat(this.inputMoney) > 0) {        //轉換為浮點數之後,如果輸入的金額大於0則金額將會放進plusNum這個變數中
    // this.plusNum += parseFloat(this.inputMoney);
    // } else {
    // this.neNum += parseFloat(this.inputMoney);  //否則輸入之金額小於0將視為支出,因此會將此金額放入neNum這個變數中
    // }

    deleteData() {     //index索引位置
      this.arr.splice(this.index, 1)  //splice(擷取這個陣列)索引位置的第一筆資料刪除(後面的1是決定從1這個位置開始刪除這筆資料)
      // console.log(this.arr[0].money)
      this.showDialog2 = false;
      this.upData();
    },
  }
}

</script>


<template>
  <div class="AllArea">
    <div class="blueArea">
      <h1 style="text-align: center;">Expense Tracker<br /><br /></h1>
      <h1>Kouhei<br /></h1>
      <h2 style="font-size: 24pt">YOUR BLANCE</h2>
      <h2 style="font-size: 24pt">${{ totalNum }}</h2>

    </div>

    <div class="whiteArea">
      <div class="top">
        <div class="topLeft">
          <h1 style="color: blue">INCOME</h1>
          <h1 style="color: blue">${{ plusNum }}</h1>
        </div>
        <div class="topRight">
          <h1 style="color: blueviolet">EXPENSE</h1>
          <h1 style="color: blueviolet">${{ neNum }}</h1>
        </div>
      </div>

      <div class="btn">
        <button type="button" class="numBtn" @click="Dialog">Add transaction</button>
      </div>

      <div class="showbox" v-if="showDialog">
        <button class="closeButton" @click="closeDialog" style="margin-left: 85%;">X</button>
        <p>Text</p>
        <input v-model="inputName" type="text" class="btn1" placeholder="name">
        <p>Amount</p>
        <input v-model="inputMoney" type="number" class="btn1" placeholder="money">
        <button type="button" class="btn2" @click="saveData">Add transaction</button>
      </div>



      <!-- index索引 -->
      <div class="content">
        <div class="block" v-for="(item, index) in arr" :key="index">
          <span>{{ item.name }}</span>
          <div class="DeleteArea">
            <span>{{ item.money }}</span>
            <button @click="showDialog1(index)">Delete</button>
          </div>
        </div>

        <div class="showBox2" v-if="showDialog2">
          <button class="closeButton" @click="closeDialog" style="margin-left: 85%;">X</button>
          <h3>Sure to Delete?</h3>
          <div class="btnSep">
            <button type="button" @click="deleteData" class="delete1">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.showBox2 {
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  background-color: rgb(188, 185, 168);
  border-radius: 8px;
  position: fixed;
  transform: translate(-50%, -50%); //將一個元素水平和垂直置中
  top: 50%;
  left: 50%;


  .closeButton {
    background-color: rgb(188, 185, 168);
    border: none;
    font-size: 30px;
  }

  .delete1 {
    width: 100px;
    height: 35px;
    background-color: red;
    border-radius: 10px;
  }
}

.showbox {
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(188, 185, 168);
  // border: 1px solid black;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); //將一個元素水平和垂直置中

  .closeButton {
    background-color: rgb(188, 185, 168);
    border: none;
    font-size: 30px;
  }

  p {
    margin-right: 230px;
    margin-top: 10px;
  }

  .btn1 {
    width: 280px;
    height: 40px;
    border-radius: 15px;

  }

  .btn2 {
    width: 215px;
    height: 35px;
    margin-top: 30px;
    border-radius: 10px;
    background-color: #6e7be0;
  }
}

.AllArea {
  width: 100%;
  height: 120vh;
  display: flex;

  .blueArea {
    width: 40vw;
    height: 120vh;
    background-color: #667edc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      width: 30%;
      height: 20%;
      margin-top: 45px;
    }
  }

  .whiteArea {
    width: 70vw;
    height: 120vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .top {
      width: 46vw;
      height: 35vh;
      display: flex;
      justify-content: space-between;
      margin-top: 50px;

      .topLeft {
        width: 50%;
        height: 20vh;
      }
    }

    .btn {
      width: 28vw;

      .numBtn {
        width: 23vw;
        height: 8vh;
        background-color: rgb(153, 0, 255);
        font-size: 24pt;
        border-radius: 15px;
      }
    }


    .content {
      width: 60%;
      height: 40vh;

      .block {
        display: flex;
        justify-content: space-between;
        font-size: 24pt;
        border: 1px solid blue;
        margin: 1rem 0;
      }
    }
  }
}
</style>
  
  