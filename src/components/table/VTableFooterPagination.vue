<template>
<div class="table_footer">
    <Transition name="fade">
            <h4 v-if="loading">Идет загрузка...</h4>
    </Transition>
   <label>кол-во строк </label>
    <VSelect class="limits"
    v-model="selectedLimit"
    :options="limitOptions"
    @select="emit('onSetLimit')"
    />
<label>выбор страницы</label>
    <span 
    @click = "emit('onDecrease','decrease')"
    class="action"
    >
    &LeftAngleBracket;</span>
    <span>{{paginationOptions.page}}</span>
    <span @click = "emit('onIncrease','increase')"
     class = "action"
     >
     &RightAngleBracket;</span> 
  
  
</div>
</template>
<script setup lang="ts">
import { PageOptions } from '@/stores/models';
import { computed } from '@vue/reactivity';
import VSelect from '@/components/VSelect.vue';

const props = defineProps<{
loading?:boolean
limits?:string[]
paginationOptions:PageOptions
}>()

const emit = defineEmits<{
 (event:"onIncrease",direction:"increase"|"decrease"):void
 (event:"onDecrease",direction:"increase"|"decrease"):void
 (event:"onSetLimit"):void

}>()

const selectedLimit = computed<string>({
 get(){
return props.paginationOptions.limit + ""
 },
 set(v){
props.paginationOptions.limit = +v
 }   
})
const limitOptions = computed(()=>{
    if(props.limits) return props.limits
return ["5","10","15"]

})
</script>
<style scoped lang="scss">
@import "@/assets/noselect.mixin.scss";
@import "@/assets/show-animation.scss";
.table_footer{
    box-sizing: border-box;
    padding: .4rem .6rem;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: right;
    gap:.5rem;
    font-weight: bold;
    @include noselect;
    position: sticky;
    background-color: white;
    bottom:0;
}
    .limits{
        min-width:3rem;
    width: 3rem;
    }
    .action{
    opacity: .5;
    }
    .action:hover{
      cursor: pointer;  
      opacity: 1;
    }
</style>