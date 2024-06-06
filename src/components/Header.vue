<script>
import { RouterLink } from 'vue-router';
import { mapState,mapActions } from 'pinia';
import indexState from '../../stores/indexState.js';
export default{
    components:{
        RouterLink,
    },
    computed:{
        ...mapState(indexState,["location","locationInfo"])
    },
    methods:{
        ...mapActions(indexState,["getLocation","setLocation"]),
    }
}
</script>

<template>
<div class="headerShow">
    <div class="Navigation-bar">
        <div class="icon" >
            <!-- 這裡設定回到首頁的路徑 -->
            <RouterLink to="/"> 
                <i class="fa-solid fa-house-user">首頁</i>
            </RouterLink>
        </div>
        <div class="textShow">
            <RouterLink class="routerItem" to="/Questionnaire">問卷列表</RouterLink>
        </div>
        <div class="icon2" >
            <i class="fa-solid fa-pen-to-square icon" style="color: rgb(243, 241, 237);"></i>
            <i class="fa-solid fa-share-from-square icon" style="color: rgb(234, 231, 225);"></i>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.headerShow{
    width: 100vw;
    height: 15vh;
    background-color: #5574f0;
    font-size: 26pt;
    padding-top: 25px;
    text-align: center;

    .Navigation-bar{
        width: 100vw;
        height: 13vh;
        display: flex;
        justify-content: space-around;
        .icon{
        width: 15%;
        text-decoration: none;
        margin: 0px 10px;
        &:hover{
            transition: 0.5s;
            border-radius: 5px;
            color: #770f43;
        }

        .fa-solid{
            color: #eae7e4;
                &:hover{
                transition: 0.5s;
                color: #770f43;
                }
            }
        }
        .icon2{
            width: 30%;
            display: flex;
            justify-content: space-around;
            .fa-solid fa-pen-to-square icon{
                color: #eae7e4;
                &:hover{
                transition: 0.5s;
                border-radius: 0px;
                color: #770f43;
                }
            }
        }
    }
    

    .routerItem{
        text-decoration: none;
        color: rgb(241, 233, 233) ;
        margin: 0px 10px;

        &:hover{
            background-color: #b94522;
            color: #f0eced;
            transition: 0.5s;
            border-radius: 10px;
        }
    }
}

</style>