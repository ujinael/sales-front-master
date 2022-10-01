
<template>
  <component :is="layout">
  <!-- <router-view></router-view> -->
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const defaultLayout = 'layout-not-connected'
const layout = computed(()=>{  
  
return route.meta.layout || defaultLayout
})

</script>
<style lang="scss">
@import "@/assets/main.scss"; 
@import "@/assets/variables.scss";
@import "@/assets/color_styles.scss";

#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
  margin: 0px;
}
</style>