import { ref } from "vue"

export const useToggle = ()=>{
const elementVisible = ref(false)
const toggleElement = ()=>{
    elementVisible.value = ! elementVisible.value
}
return {
    elementVisible,toggleElement
}
}