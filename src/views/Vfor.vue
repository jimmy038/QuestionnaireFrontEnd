<script>
export default{
    data(){
        return{
            arr:[0,1,2,3,4,5,6,7,8,9],
            arr2:[
                {name:"豬大哥",
                age:68,
                address:"新北市信義"},
                {name:"余天",
                age:70,
                address:"新北市三重"},
                {name:"胡瓜",
                age:66,
                address:"台北市內湖"}
            ]
        }
    }
}

</script>

<template>
    <div class="all">
    <!-- v-for固定格式,會遍歷當中的所有元素,同forEach -->
    <!--<標籤 v-for="變數 in 陣列or變數">{{印出,渲染出變數}}<標籤>-->
    <!-- 以下為第一個陣列arr -->
    <h1>V-for</h1>
    <p v-for="item in arr">{{item}}</p>

    <!-- 以下為第二個陣列arr2 -->
    <h2 v-for="item in arr2">{{item}}</h2>
    <ol v-for="gd in arr2">
        <li style="font-size: 14pt;">{{ gd.name }}</li>
        <li style="font-size: 14pt;">{{ gd.age }}</li>
        <li style="font-size: 14pt;">{{ gd.address }}</li>
    </ol>
</div>
</template>


<style lang="scss" scoped>
.all{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

</style>