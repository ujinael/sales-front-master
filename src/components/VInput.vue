<template>
    <input 
    class="v-input"  
    v-model="value"
     >
    
    </template>
    <script setup lang="ts">
    import { computed } from 'vue';
    const props = defineProps<{
    modelValue?:string
    }>()
    const emit = defineEmits(['update:modelValue'])
    const value = computed<string|undefined>({
    get(){return props.modelValue},
    set(v){emit('update:modelValue',v)}
    })
    </script>
    <style scoped lang="scss">
    @import "@/assets/v-input.scss";
    
    </style>