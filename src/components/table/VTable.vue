<template>
    <div class="table_wrapper">
<table  class="table">
    <thead class="table_header">
<tr class="table_header-row bottom_border size-medium">
     <slot name="header">
          </slot>
</tr>
         
    </thead>
    <tbody class="table_body bg-white size-medium">
<tr class="table_body-row bottom_border" v-for="(_, index) in data" :key="index">
<slot :index="index">

</slot>

</tr> 

    </tbody>

</table> 
  <slot name="footer"></slot>
</div>
</template>
<script setup lang="ts">
const props = defineProps<{
data:Object[]|string
}>()
</script>
<style scoped lang="scss">
@import "@/assets/noselect.mixin.scss";
.table_wrapper{
display: grid;
height: 400px;
align-content: space-between;
overflow: auto;
}
.table{
width: 100%;
border-collapse: collapse; 
border-spacing: 0 2px;
border-radius: 4px;
// overflow: auto;

}
.table_header{
    position: sticky;
    top: 0;
    background-color:white; 
    border-bottom: 1.5px solid var(--primary-color);

    @include noselect;
}

.table_body-row.bottom_border::v-deep(td){
    border-bottom: 1px solid lightgray;
}
.table_body-row::v-deep(td){
    white-space: nowrap; 
    max-width: 200px;   
    overflow: hidden;
    text-overflow: ellipsis;
}
.size-medium::v-deep(th){
height: 2rem;    
}
.size-medium::v-deep(tr){
height: 2rem;    
}
</style>