<template>
  <div class="text-center p-5 pt-10">
    <form class="form-floating">
      <div class="form-floating mb-3">
        <input v-model="login" type="login" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Login</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <small class="text-muted">Если у вас еще нет аккаунта.</small>
      <hr class="my-4">
    </form>
    <a-button key="submit" type="primary" :loading="loading" @click="auth">Вход</a-button>
  </div>



<!--  <boby class="text-center">-->
<!--    <main class="form-signin w-100 m-auto">-->
<!--      <form>-->
<!--        <h1 class="h3 mb-3 fw-normal">Авторизация</h1>-->
<!--        <div class="form-floating">-->
<!--          <input v-model="login" type="login" class="form-control" id="floatingInput" placeholder="Введите логин">-->
<!--          <label for="floatingInput">Логин</label>-->
<!--        </div>-->
<!--        <div class="form-floating">-->
<!--          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">-->
<!--          <label for="floatingPassword">Пароль</label>-->
<!--        </div>-->

<!--        <div class="checkbox mb-3">-->
<!--          <label>-->
<!--            <input type="checkbox" value="remember-me"> Remember me-->
<!--          </label>-->
<!--        </div>-->
<!--        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="auth">Войти</button>-->
<!--        <p class="mt-5 mb-3 text-muted">&copy; 2023</p>-->
<!--      </form>-->
<!--    </main>-->
<!--  </boby>-->
</template>

<script>
import {mapActions, mapState} from "vuex"
import {ref} from "vue";
export default {
  name: "Login",

  data(){
    return {
      login : "",
      password : "",
    }
  },

  setup(){
    const loading = ref(false);

    return{
      loading
    }
  },

  methods: {
    async auth(event){
      const item = {
        login: this.login,
        password: this.password
      };
      await this.getAuthorization(item)
      this.loading = true;

      setTimeout(()=>{
        this.loading = false;
        this.visible = false;
      }, 1000)

      location.reload();
    },

    ...mapActions([
        'getAuthorization',
        //'getUsers'
    ])
  },

  computed:{
    ...mapState({
    })
  }
}
</script>

<style scoped>

body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>