<template>
    <td height="15px" class="table_cell">
    <slot>

</slot>    
    </td>

</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.table_cell{
    height:30px;

}
.table_cell:hover{
background-color: whitesmoke;
cursor: pointer;
}
</style>