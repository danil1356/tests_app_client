<template>
  <router-view/>
</template>

<script>
import {mapActions, mapState} from "vuex"
export default {

  mounted() {
    this.$nextTick(async () => {
      // await this.$router.push({name: "home"});
    });
  },


  data(){
    return {
      login : "",
      password : "",
    }
  },
  methods: {
    async auth(event){
      //event.preventDefault();
      const item = {
        login: this.login,
        password: this.password
      };
      await this.getAuthorization(item)


    },

    async logout(event){
      await this.getLogout()
    },
    ...mapActions([
      'getAuthorization',
        'getLogout',
    ])
  },

  computed : {
    ...mapState({

    })
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
