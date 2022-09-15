import Vue from 'vue'
import axios from 'axios'


Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL :  'http://localhost:8090/'
        })
        
        Vue.prototype.$http.interceptors.request.use(config =>{
            console.log(config.method)
            return config
        })
    }
})