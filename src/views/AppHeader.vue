<template>
  <header>
    <nav class="py-2 bg-light border-bottom">
      <div class="container d-flex flex-wrap">
        <ul class="nav me-auto">
          <li class="nav-item"><a href="#/home" class="nav-link link-dark px-2 active" aria-current="page">Главная</a></li>
          <li class="nav-item"><router-link to="/TestCreator" class="nav-link link-dark px-2">Создать тест</router-link></li>
          <li class="nav-item"><router-link to="/testList" class="nav-link link-dark px-2">Список тестов</router-link></li>
          <li @click="goToUserPage" class="nav-item"><a class="nav-link link-dark px-2">Личный кабинет</a></li>
<!--          <li class="nav-item"><a href="#/about" class="nav-link link-dark px-2">About</a></li>-->
<!--          <li class="nav-item"><router-link to="/login" class="nav-link link-dark px-2">Login</router-link></li>-->
        </ul>

        <div @click="goToUserPage" v-if="this.count !== null">
          <span style="margin-right: 24px">
            <a-badge :count="this.count">
              <a-avatar shape="circle">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-badge>
          </span>
        </div>

        <ul class="nav">
<!--          <li v-if="!this.userInfo.id" class="nav-item"><a-button class="btn btn-primary" type="primary" @click="showModal">Войти</a-button></li>-->
          <li v-if="this.userInfo.id" class="nav-item"><a-button class="btn btn-primary" type="button" @click="logout">Выйти</a-button></li>
          <li v-if="!this.userInfo.id" class="nav-item"><a-button class="btn btn-primary" type="primary" @click="showDrawer">Вход / Регистрация</a-button></li>
        </ul>

      </div>
    </nav>
  </header>

    <a-modal v-model:visible="visible" title="Авторизация" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Вернуться</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="auth">Вход</a-button>
      </template>

      <div class="modal-body p-5 pt-0">
        <form class="">
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
          <li class="nav-item"><a-button class="btn btn-primary" type="primary" href="#/Registration">Регистрация</a-button></li>
        </form>
      </div>
    </a-modal>

  <div>
    <a-drawer
        title="Create a new account"
        :width="720"
        :visible="visible2"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
    >
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1">
          <template #tab>
        <span>
          <apple-outlined />
          Авторизация
        </span>
          </template>
          <Login/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
        <span>
          <android-outlined />
          Регистрация
        </span>
          </template>
          <Registration/>
        </a-tab-pane>
      </a-tabs>

      <template #extra>
        <a-space>
          <a-button @click="onClose">Cancel</a-button>
          <a-button type="primary" @click="onClose">Submit</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>

  <router-view/>
</template>

<script>
import {mapActions, mapGetters, mapState, useStore} from "vuex"
import {toRefs, ref, reactive, computed} from "vue"
import Login from "@/components/Login";
import Registration from "@/components/Registration";
import { UserOutlined } from '@ant-design/icons-vue';
import router from "@/router";

export default {
  name: "AppHeader",
  data(){
    return {
      login : "",
      password : "",
    }
  },

  mounted() {
    this.$nextTick(async ()=>{
      // await this.$router.push({name: "home"});

      if (sessionStorage.getItem('login') || localStorage.getItem('login')){
        await this.getUsersByLogin(localStorage.getItem('login'))
        await this.setCount(this.userData.alertsDtos.length)
      }
    })
  },

  setup(props, context){
    const store = useStore();
    const userInfo = computed(()=>store.state.user)

    const count = ref(null)
    const setCount =(n)=>{
      count.value = n
    }

    const loading = ref(false);
    const visible = ref(false);
    const showModal = ()=>{
      visible.value = true
    };

    //
    const visible2 = ref(false);
    const showDrawer = () => {
      visible2.value = true;
    };
    const onClose = () => {
      visible2.value = false;
    };

    return{
      visible,
      showModal,
      loading,
      visible2,
      showDrawer,
      onClose,
      count,
      setCount,

      userInfo
    }
  },
  components:{
    Login,
    Registration,
    UserOutlined
  },

  methods: {
    async goToUserPage(){
      await this.$router.push({name: "UserPage"});
    },

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

    async logout(event){
      await this.getLogout()
      await router.push({name: "home"})
      location.reload();
    },
    ...mapActions([
      'getAuthorization',
      'getLogout',
      'getUsersByLogin'
    ])
  },

  computed : {


    ...mapState({
      userData: state => state.user
    }),

    ...mapGetters([

    ])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.modal-sheet .modal-dialog {
  width: 380px;
  transition: bottom .75s ease-in-out;
}
.modal-sheet .modal-footer {
  padding-bottom: 2rem;
}

.modal-alert .modal-dialog {
  width: 380px;
}

.modal-tour .modal-dialog {
  width: 380px;
}
</style>