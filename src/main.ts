import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'reflect-metadata'

import App from './App.vue'
import router from './router'
import { components } from './components'

const app = createApp(App)
components.forEach(component => {
    app.component(component.name ?? '', component)
  });
app.use(createPinia())
app.use(router)

app.mount('#app')
