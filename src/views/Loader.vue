<template>

</template>

<script>
import router from "@/router";

export default {
  name: "Loader",
  mounted() {
    this.$nextTick(async ()=>{
      await router.push({name: "home"});
    })
  }
}
</script>

<style scoped>

</style>