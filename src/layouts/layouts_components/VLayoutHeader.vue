<template>
  <header class="layout_header">
    <nav class="header_navigation">
        <ul class="navigation_menu">
      <li class="navigation_menu-item">
        <router-link to="/">Описание</router-link>
      </li> 
   <li class="navigation_menu-item">
        <router-link to="/sales">Продажи</router-link>
      </li>
    </ul>  
    </nav>
  
  </header>
</template>
<style lang="scss">
.layout_header{
height: 45px; 
background-color: var(--primary-color);   
}
.header_navigation{
height: 100%;
padding:0 1rem;
    }
.navigation_menu{
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: flex-start;
    gap:1rem;
    font-weight: bold;
    text-decoration: none;
}
.navigation_menu-item>a{
    text-decoration: none;
    color: white;
    transition: color .3s ease;

}
.navigation_menu-item>a:hover{
    color: orange;
    transition: color .3s ease;
}
</style>