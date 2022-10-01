import { reactive, ref, watch } from "vue"

interface Validator {
value:string
validators:Array<(val:string)=>{}>
}
export const useFormValidation = ()=>{

const useField = (field:any)=>{
const valid = ref(true)
const value = ref(field.value)
const errors = reactive<any>({})

const reassign = (val: any) =>{
    valid.value = true
   Object.keys(field.validators ?? {}).map(name=>{
 const isValid = field.validators[name](val)   
errors[name] = !isValid
if(!isValid ){
    valid.value = false
}
}) 
}

watch(value,reassign)
reassign(value.value)
return {valid,value,errors}
}

const useForm = (init:any)=>{
const form = reactive<any>({})
for (const [key,value] of Object.entries(init)){
 form[key] =  useField(value)  
}
return form
}
return {useForm}
}
