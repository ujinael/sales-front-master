<template>
    <form @submit.prevent="onFilter">
<VFilterbar>
    <label class="bar_item">
        колонка
     <VSelect 
v-model="selectedColumn" 
:options="columns"
@select="onColumnSelect()"
>

</VSelect>   
    </label>

<label class="bar_item">
    условие
  <VSelect 
v-model="selectedPredicate"
 :options="predicates">
</VSelect>  
</label>

<label class="bar_item">
    значение
    <VInput v-model="filterValue" class="large"></VInput>
</label>
<div class="action">
    <VButton type="submit" vStyle="accept">применить</VButton>

    <VButton @click.prevent="disableFilter" vStyle="cancel">отменить</VButton>
</div>
</VFilterbar>
    </form>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import VFilterbar from '@/components/filterbar/VFilterbar.vue';
import VSelect from '@/components/VSelect.vue';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import { FilterOption } from '@/stores/models';
import { useFormValidation } from '@/composition/useForm';
import { useValidators } from '@/composition/useValidators';

const emit = defineEmits<{
    (event:"onFilter",option:FilterOption):void
    (event:"disableFilter"):void
}>()
const columns = ["название","количество","дистанция"]

const selectedColumn = ref("")
const columnsMap = new Map([
    ["название","title"],["количество","salesCount"]
    ,["дистанция","distance"]
])

const predicates = computed(()=>{
const totalPrdicates = ["содержит", "равно",  "больше", "меньше"]
if(selectedColumn.value !== "название") return totalPrdicates.splice(1,3)
else return totalPrdicates.splice(0,1)
})
const selectedPredicate = ref("")
const predicatesMap = new Map([
    ["равно","equal"],["содержит","contain"],["больше","moreThen"]
    ,["меньше","lessThen"]
])
const filterValue = ref("")

const {useForm} = useFormValidation()
const {required,isNumber} = useValidators()
const textValidators = {
    required
}
const numberValidators = {
    required,isNumber
}
const onColumnSelect = ()=>{
    selectedPredicate.value = ""
    filterValue.value = ""
}

const formValidate = ()=>{
const form = useForm({
filterValue:{
value:filterValue.value,
validators:selectedColumn.value !== 'название'
? numberValidators  :  textValidators 
},    
column:{
value:selectedColumn.value,
validators:textValidators
},
predicate:{
value:selectedPredicate.value,
validators:textValidators
}

})
if(!form.filterValue.valid  
|| !form.column.valid 
|| !form.predicate.valid){
let alertMessage = ''
if(form.filterValue.errors.isNumber){
    alertMessage +=  'допустимо вводить только цифры!\n'
}
if(form.filterValue.errors.required){
    alertMessage +=  'поле значение не должно быть пустым!\n'
}
if(form.predicate.errors.required){
    alertMessage += 'выберите условие!\n'
}
if(form.column.errors.required){
    alertMessage += 'выберите колонку!\n'
}
alert(alertMessage)
return false
}

return true
}

const onFilter = ()=>{
if(!formValidate()) return  
const column = columnsMap.get(selectedColumn.value)    
const predicate = predicatesMap.get(selectedPredicate.value)    
if(column && predicate && filterValue.value)
emit("onFilter",{column,predicate,filterValue:filterValue.value})
}
const disableFilter = ()=>{
selectedColumn.value = ""
selectedPredicate.value = ""
filterValue.value = ""
emit("disableFilter")
}
</script>
<style scoped lang="scss">
.action{
display: grid;
grid-auto-flow: column;
gap: .5rem;
align-items: flex-end;
}
</style>