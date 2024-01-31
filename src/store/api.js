import {apiUrl} from "../../properties";
import axios from "axios";
import config from "bootstrap/js/src/util/config";

import API from "@/store/apiConfig";
import router from "@/router";
export default {
    authentication:{
        resourceUrl: "Auth/login",
        auth(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item )
                .then(response => {
                    //локальное хранилище
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('login', response.data.login);

                    //сессионное хранилище
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('login', response.data.login);

                    //router.push('home')

                    return response.data
                })
        },

        logout(){
            localStorage.removeItem('token');
            localStorage.removeItem('login');

            sessionStorage.removeItem('token')
            sessionStorage.removeItem('login')
        }
    },

    users:{
        resourceUrl: "Users",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        getByLogin(login){
            return API.get(`${apiUrl}/${this.resourceUrl}/getByLogin/${login}`).then()
        },
        registration(item){
            return API.post(`${apiUrl}/${this.resourceUrl}/registration`, item).then()
        },

        registrationTeacher(item, id){
            return API.post(`${apiUrl}/${this.resourceUrl}/registrationTeacher/${id}`, item).then()
        },
        registrationStudent(item){
            return API.post(`${apiUrl}/${this.resourceUrl}/registrationStudent`, item).then()
        },
        addUserGroup(userId, groupId){
            return API.post(`${apiUrl}/${this.resourceUrl}/addUserGroup/${userId}/${groupId}`).then()
        }
    },

    themes:{
        resourceUrl: "Themes",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        }
    },

    subThemes:{
        resourceUrl:"SubTheme",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        }
    },

    test:{
        resourceUrl:"Tests",
        add(item, userId){
            return API.post(`${apiUrl}/${this.resourceUrl}/${userId}`, item).then()
        },

        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },

        delete(id){
            return API.delete(`${apiUrl}/${this.resourceUrl}/${id}`).then()
        },
        addAccess(userId, testId){
            return API.post(`${apiUrl}/${this.resourceUrl}/addAccess/${userId}/${testId}`).then()
        }
    },
    question_type:{
        resourceUrl:"QuestionType",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        }
    },
    answer:{
        resourceUrl:"Answer",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },

        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        },

        edit(item){
            return API.put(`${apiUrl}/${this.resourceUrl}`, item).then()
        },
        delete(id){
            return API.delete(`${apiUrl}/${this.resourceUrl}/${id}`).then()
        }

    },

    questions:{
        resourceUrl:"Questions",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        },
        delete(id) {
            return API.delete(`${apiUrl}/${this.resourceUrl}/${id}`).then()
        }
    },

    answer_addi:{
        resourceUrl: "AnswerAddi",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        },
        edit(item){
            return API.put(`${apiUrl}/${this.resourceUrl}`, item).then()
        }
    },

    statistics:{
        resourceUrl:"Statistics",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        },
    },

    groups:{
        resourceUrl:"Groups",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        }
    },

    alerts:{
        resourceUrl:"Alerts",
        getAll(){
            return API.get(`${apiUrl}/${this.resourceUrl}`).then()
        },
        add(item){
            return API.post(`${apiUrl}/${this.resourceUrl}`, item).then()
        }
    }
}
