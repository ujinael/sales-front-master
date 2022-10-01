export const useValidators = ()=>{
const required = (val:string)=>!!val
const minLenght = (num:number)=>(val:string)=> val.length >= num 
const isNumber = (val:string)=> !val.replace(/[0-9]/g, '').length
return {
required,minLenght,isNumber
    }
}