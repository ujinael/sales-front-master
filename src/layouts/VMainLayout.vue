<template>
    <div class="layout">
    <VLayoutHeader> 

    </VLayoutHeader>
    <main>
          <router-view/>
    </main>
    </div>
    </template>
    <script lang="ts">
    export default {
        name:'main-layout'
    }
    </script>
    <script setup lang="ts">
    import VLayoutHeader from './layouts_components/VLayoutHeader.vue';
    </script>
    <style>
        .layout{
        height: 100vh;
        }
    </style>