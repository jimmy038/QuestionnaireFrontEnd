<script>
import { RouterLink } from 'vue-router';
export default {
  data() {
    return {
      
    }
  },
  components:{
    RouterLink 
  },
  methods: {
  },
}
</script>


<template>
  <!-- <div class="header">
    <RouterLink class="routerItem" to="/Questionnaire" style="color: white;">前往問卷</RouterLink>
  </div> -->
  
  <div class="bgArea">
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../../public/新增資料夾 (2)/pexels-alex-green-jpg.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../public/新增資料夾 (2)/pexels-lukas-590037-jpg.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../public/新增資料夾 (2)/pexels-andrea.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
</div>

</template>

<style lang="scss" scoped>
.header{
  width: 100vw;
  height: 10vh;
  background-color: rgb(68, 68, 120);
}
.bgArea{
  width: 100vw;
  height: 75vh;
  background-repeat: no-repeat;
  position: relative;
}
</style>
