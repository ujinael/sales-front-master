<template>
<div class="page">
<h1>
FAQ
</h1>
<ul>
<li>
Таблица реализована с помощью vue js v3, с использованием Сomposition api. 

</li>
<li>
Для задания был сделан тестовый сервер на express js.
локально он запускается командой npm run start:server на порту 8080
также можно использовать команду npm run start:all для запуска фронта и сервера
</li>
<li>
для работы сервера надо запустить postgreSQL.
создать базу данных shops, 
в ней создать таблицу shops
с колонками "id","title","sales_count","distance"
 можно заполнить таблицу случайными значениями   
</li>
<li>
Для заполнения таблицы сгенерированными данными нажать эту кнопку
<VButton @click="onClick">заполнить таблицу</VButton>
</li>
</ul>
</div>
</template>
<script setup lang="ts">
import { useShopsStore } from '@/stores/modules';
import VButton from '@/components/VButton.vue';

const store = useShopsStore()
const onClick=()=>{
store.createShops()
}
</script>
<style scoped lang="scss">
    .page{
        box-sizing: border-box;
        padding: 2rem;
    }
    ul{
        text-align: left;
    }
</style>