<template>
  <div class="filter_bar">
    <h4>фильтр</h4>
    <div class="filter_bar_items">
         <slot></slot>
    </div>
 
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.filter_bar {
  box-sizing: border-box;
  display: grid;
}
.filter_bar_items{
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
}
.filter_bar_items::v-deep(.bar_item){
    display: grid;  
    text-align: left;
    color: var(--primary_color);
    font-size: small;
    font-weight: bold;
}
@media (min-width: 599px) {
  .filter_bar {
    justify-content: flex-start;
  }
}
</style>
