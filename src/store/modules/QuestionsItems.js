import RssApi from "@/store/api";
//TODO возможно модулями как тут
export default {
    // state:{
    //     questions:[],
    // },
    // mutations: {
    //     'SET_RSS_ITEMS'(state, rssItems) {
    //         state[rssItems.keyState] = rssItems.rssData;
    //     },
    //
    //     'SET_ALERT_TEXT'(state, alertText) {
    //         state.alertText = alertText;
    //     }
    // },
    //
    // actions:{
    //     async getByIdQuestion(context, id){
    //         try {
    //             const keyState = "questions";
    //             const response = await RssApi.questions.getByIdQuestions(id)
    //             context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
    //         }catch (error){
    //             context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
    //         }
    //     },
    //     async addQuestion(context, item){
    //         try {
    //             const response = await RssApi.questions.add(item)
    //         }catch (error){
    //             context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
    //         }
    //     }
    // },
    //
    // getters:{
    //     items(state){
    //         return this.state.questions;
    //     }
    // }
}