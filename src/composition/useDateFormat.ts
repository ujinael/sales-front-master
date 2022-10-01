export const useDateFormat = ()=>{
const stringFromDate = (date:Date,options?:{
time?:boolean
})=>{
const formatter = Intl.DateTimeFormat('ru-RU',{
year:'numeric',month:'2-digit',day:'2-digit',  
hour:options?.time ? '2-digit' : undefined,
minute:options?.time ? '2-digit':undefined  
})

return formatter.format(date)
}

return {stringFromDate}    
}