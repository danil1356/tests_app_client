<template>
  <a-result status="403" title="403" sub-title="Простите, вы не авторизованный.">
    <template #extra>
      <a-button @click="goToLogin" type="primary">Авторизация</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "ErrorPage",

  methods:{
    async goToLogin(){
      await this.$router.push({name:"login"})
    }
  }
}
</script>

<style scoped>

</style>