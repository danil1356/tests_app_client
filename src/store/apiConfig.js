import axios from "axios";
import router from "@/router";

const api = axios.create();
//настройка реквеста
api.interceptors.request.use(config => {
    //можно поменять на сессион сторадж
    if (localStorage.getItem('token')){
        config.headers = {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }
    return config
}, error => {
    //todo response?
    if (error.response.status === 401){
        router.push('about')
    }
    //пуш в нужное место
    if (error.response.status === 403){
        router.push('Error403')
    }
})

//настройка респонса (еппоп триггерится на ошшибки с бекенда)
api.interceptors.response.use(config=>{
    //можно поменять на сессион сторадж
    if (localStorage.getItem('token')){
        config.headers = {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }
    return config
}, error => {
    if (error.response.status === 401){
        router.push('about')
    }
    if (error.response.status === 403){
        router.push('Error403')
    }
})

export default api