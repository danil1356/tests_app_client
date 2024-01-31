<template>
<div class="main">
  <div class="main_background main_background_size">
    <div class="info_style">
    <div class="image_box">
      <div class="home_page_image">
<!--        <img :src="require('../assets/images/image1.png')">-->
      </div>
    </div>


    <div class="info_style">
      <h1 class="h1_style">
        Создавайте, проходите тесты легко и эффективно
      </h1>
    </div>

      <div></div>
    </div>
  </div>

</div>


<!--<h1>{{userData}}</h1>-->
<!--  <button @click="test">test</button>-->
</template>


<script>
import {mapActions, mapState} from "vuex";

export default {

  mounted() {
    this.$nextTick(async ()=>{
      await this.getUsers()
    })
  },

  data(){
    return {

    }
  },
  methods: {
    async test(){
      // await this.getUsersByLogin()
    },

    ...mapActions([
        // 'getUsersByLogin',
        // 'getUsers'
    ])
  },

  computed : {
    ...mapState({
      // userData: state => state.user,
      // usersData: state => state.users
    })
  }
}
</script>

<style scoped>
.main{
  margin: 0;
}

.main_background{
  background-color: rgb(35,83,144);
  background-image: url(https://d35aaqx5ub95lt.cloudfront.net/images/4986531ca822d48e57b4a18f40ff5172.svg);
}

.home_page_image{
  background: url("../assets/images/image1.png");
  background-size: 360px;
  height: 211px;
  min-width: 350px;
  width: 350px;
}

.image_box{
  max-height: 360px
}
.main_background_size{
  overflow: hidden;
  padding: 151px 0;

  align-items: center;
  display: flex;
  position: relative;
  z-index: 1;
}

.info_style{
  margin: 12px auto 0;
  max-width: 600px;
  width: 100%;
}

.h1_style{
  color: rgb(255,255,255);
  font-size: 32px;
  line-height: 40px;
  margin: 0 0 50px;
  text-align: center;
}



:root{
  --color-juicy-blue-space-light: 35,83,144
}

</style>