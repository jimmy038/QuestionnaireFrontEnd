import { defineStore } from "pinia"; //定義資料庫內的內容透過pinia放入

//需輸入兩個參數,1.自建資料庫名稱, 2.資料庫內容
export default defineStore("indexState",{
    //與.vue中的<Script>預設匯出概念相同,只是名稱不同
    // vue2 的 data
    state:() =>({
        location:1
    }),
    //vue2 的 computed,沒有this,本身能當變數
    getters:{
        //locationInfo:(state) =>{`現在位置${state.location}`}
        locationInfo(state){
            return `現在位置${state.location}`
        }
    },
    //同vue2 methods
    actions:{
        getLocation(){
            console.log(this.location);
        },
        setLocation(num){
            this.location = num
        }
    }
})