<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {

    },
    mounted(){
      console.log("APP.VUE");
    }
  }

</script>

<style scoped lang="scss">
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
