<template>
    <div class="select" ref="target" tabindex="0"
     @click="showDropdown">
    <div class="select_value">
      <div class="select_label" v-if="value">
      <span v-if="label">
        {{label}}
      </span>
      <span v-else>
        {{typeof value === 'string'?value:`${value.title}`}}
      </span>
      </div>
      <div class="select_label" v-else>
        выбрать
      </div>
    <div class="icon_container">
    <span class="ico" :class="{open:dropdownVisible}">
    &RightAngleBracket;
    </span>
    </div>
    </div>
    <transition name="fade">
      <teleport to="#app">
       <div class="dropdown" ref="dropdown" v-show="dropdownVisible">
      <ul>
        <li v-for="option in options" @click="select(option)">
          <slot name="option" :option="option">
                {{typeof option === 'string'?option:option.title }}
          </slot>
        </li>
    </ul>  
    </div>
  </teleport>
    </transition>
     
    </div>
    
    
    </template>
    <script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useToggle } from '@/composition';
    import { onClickOutside } from '@vueuse/core'
    const target = ref<HTMLDivElement|undefined>(undefined)
    const dropdown = ref<HTMLDivElement>()
    interface Option{
      id?:string
      title:string
      description?:string
    }
    onClickOutside(target,()=>{
      dropdownVisible.value = false
    })
    const props = defineProps<{
    modelValue?:Option|string|null,
    options:string[]|Array<Option>
    label?:string
    }>()
    const select = (option:Option|string)=>{  
    value.value = option
    emit('select',option)
    }
    const emit = defineEmits(['update:modelValue','select'])
    const value = computed<string|Option|undefined|null>({
    get(){return props.modelValue},
    set(v){emit('update:modelValue',v)}
    })
    const {elementVisible:dropdownVisible,toggleElement} = useToggle()
    const showDropdown = ()=>{
    if(!target.value) return
    if(!dropdown.value) return
    const rect = target.value.getBoundingClientRect()
    dropdown.value.style.width = rect.width + 'px'
    dropdown.value.style.top = rect.bottom + 'px'
    dropdown.value.style.left = rect.left + 'px'
    toggleElement()
    }
    </script>
    <style scoped lang="scss">
    @import '@/assets/show-animation.scss';
    .select{
      box-sizing: border-box;
      background-color: transparent;
      background-clip: padding-box;
    border-radius:calc( var(--common_border_radius)/2);
    height: var(--common_input_height);
    border:var(--common_input_border);
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    font-size: medium;
    font-weight:normal;
    min-width: 10rem;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    }
    
    .select:focus{
      outline: none;
      border:var(--common_input_hovered_border);
    transition: all .1s ease-in-out;
    }
    .select_value{
    height: var(--common_input_height);
    display: flex;
    justify-content: space-between;
    }
    .select_label{
      padding:0 .2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: default;
    }
    .icon_container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: .4rem;
      box-sizing: border-box;
    }
    .ico{
    height: 1rem;
    transform: rotate(90deg);
    transition: transform .2s ease-in-out;
    font-weight: bold;
    }
    .ico.open{
    transform: rotate(270deg);
    transition: transform .2s ease-in-out;
    }
    .dropdown{
        position: absolute;
      z-index:var(--z_index-dropdown);
      background-color: rgb(0, 0, 0,.7);
      height: fit-content;
      overflow-y: auto;
     max-height: calc(var(--common_input_height)*6);
    border-bottom-left-radius:calc(var(--common_border_radius)/2);
    border-bottom-right-radius:calc(var(--common_border_radius)/2);
    backdrop-filter: blur(4px);
    }
    ul{
      list-style: none;
      color: whitesmoke;
    }
    li{
      box-sizing: border-box;
      height: var(--common_input_height);
      border-bottom: 1px solid whitesmoke;
      display: flex;
    flex-direction: column;
    justify-content: center;
    }
    li:hover{
      cursor:default;
      background-color: rgb(0, 0, 0,.5);;
    }
    </style>