import { createStore } from 'vuex'
import RssApi from "@/store/api";

export default createStore({
  state: {
    token: [],
    users: [],
    user: [],
    themes: [],
    subThemes:[],
    tests:[],
    answer:[],
    questions:[],
    questionType:[],
    answerAddi:[],
    statistics:[],
    alerts:[],

    groups:[],
    group:"",

    alertText: ""
  },
  getters: {
    questionsItems: (state)=> (id)=>{
      return state.questions.filter(item => item.tests_id === id)
    },
    editAnswer: (state)=> (idQuestion)=>{
      return state.answer.filter(item => item.questions_id === idQuestion)
    },
    editAnswerAddi: (state) => (idQuestion)=>{
      return state.answerAddi.filter(item => item.question_id === idQuestion)
    },
    statisticsItems:(state)=>(idTest,idUser)=>{
      return state.statistics.filter(item => item.user_id===idUser && item.tests_id ===idTest)
    },
    usersRoleTeacherItems:(state)=>{
      return state.users.filter((item)=>{
        if(item.rolesDTOSet.length) {
          for (var prop in item.rolesDTOSet) {
            if(item.rolesDTOSet[prop]['name'] === "ROLE_Teacher") {
              return true
            }
          }
        }
        return false
      })
    },
    getMainGroup: (state)=> (login)=>{
      return state.groups.find(item => item.name.includes(login))
    },
    getUserInState:(state)=> (login)=>{
      return state.users.filter(item => item.login === login)
    }
  }
  ,
  mutations: {
    'SET_RSS_ITEMS'(state, rssItems) {
      state[rssItems.keyState] = rssItems.rssData;
    },
    'ADD_RSS_ITEM'(state, rssItem){
      state[rssItem.keyState].push(rssItem.rssData);
    },
    'EDIT_RSS_ITEM'(state, rssItem){
      const  item = state[rssItem.keyState].find(item => item.id === rssItem.rssData.id);
      Object.assign(item, rssItem.rssData)
    },
    'REMOVE_RSS_ITEM'(state, rssItem){
      const index = state[rssItem.keyState].findIndex(item => item.id === rssItem.rssData.id)
      state[rssItem.keyState].splice(index, 1);
    },
    'SET_ALERT_TEXT'(state, alertText) {
      state.alertText = alertText;
    },

    //UTILS mutations
    'SET_GROUP'(state, element){
      state.group = element
    },
    'SET_ANSWER'(state, elements){
      state.answer = elements
    }
  },
  actions: {
    //UTILS
    updateAnswer({commit}, elements){
      commit('SET_ANSWER', elements)
    },

    //authorization
    async getAuthorization(context, item){
      try {
         const response = await RssApi.authentication.auth(item);
        console.log(response.token)
      }catch (error) {
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async getLogout(context){
      try {
        await RssApi.authentication.logout();
      }catch (error) {
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //users
    async getUsers(context){
      try {
        const keyState = "users";
        const response = await RssApi.users.getAll();
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async getUsersByLogin(context, login){
      try {
        const keyState = "user";
        const response = await RssApi.users.getByLogin(login)
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addUser(context, item){
      try {
        const keyState = "users";
        const response = await RssApi.users.registration(item)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addUserTeacher(context, item){
      try {
        const keyState = "users";
        const id = this.state.group.id;

        const response = await RssApi.users.registrationTeacher(item, id)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addUserStudent(context, item){
      try {
        const keyState = "users";
        const response = await RssApi.users.registrationStudent(item)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    async addUserGroup(context, {userId, groupId}){
      try {
        const keyState = "users";
        const response = await RssApi.users.addUserGroup(userId, groupId)
        context.commit('EDIT_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //themes
    async getThemes(context){
      try {
        const keyState = "themes";
        const response = await RssApi.themes.getAll();
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //subThemes
    async getSubThemes(context){
      try {
        const keyState = "subThemes";
        const response = await RssApi.subThemes.getAll();
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Tests
    async addTest(context, {item, userId}){
      try {
        const response = await RssApi.test.add(item, userId);
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async getAllTests(context){
      try {
        const keyState = "tests";
        const response = await RssApi.test.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addAccessTest(context, {userId, testId}){
      try {
        const keyState = "tests";
        const response = await RssApi.test.addAccess(userId, testId)
        context.commit('EDIT_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    async removeTest(context, id){
      try {
        const keyState = "tests";
        const response = await RssApi.test.delete(id)
        context.commit('REMOVE_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Question_type
    async getAllType(context){
      try {
        const keyState = "questionType";
        const response = await RssApi.question_type.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Answer
    async getAllAnswer(context){
      try {
        const keyState = "answer";
        const response = await RssApi.answer.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addAnswer(context, item){
      try {
        const keyState = "answer";
        const response = await RssApi.answer.add(item)
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async editAnswer(context, item){
      try {
        const keyState = "answer";
        const response = await RssApi.answer.edit(item)
        context.commit('EDIT_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async removeAnswer(context, id){
      try {
        const keyState = "answer";
        const response = await RssApi.answer.delete(id)
        context.commit('REMOVE_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Questions
    async getAllQuestion(context){
      try {
        const keyState = "questions";
        const response = await RssApi.questions.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addQuestion(context, item){
      try {
        const keyState = "questions";
        const response = await RssApi.questions.add(item);
        context.commit('ADD_RSS_ITEM',{rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async deleteQuestion(context, id){
      try {
        const keyState = "questions";
        const response = await RssApi.questions.delete(id)
        context.commit('REMOVE_RSS_ITEM',{rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //AmswerAddi
    async addAnswerAddi(context, item){
      try {
        const keyState = "answerAddi";
        const response = await RssApi.answer_addi.add(item)
        context.commit('ADD_RSS_ITEM',{rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async getAllAnswerAddi(context){
      try {
        const keyState = "answerAddi";
        const response = await RssApi.answer_addi.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async editAnswerAddi(context, item){
      try {
        const keyState = "answerAddi";
        const response = await RssApi.answer_addi.edit(item)
        context.commit('EDIT_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Statistics
    async addStatistics(context, item){
      try {
        const keyState = "statistics";
        const response = await RssApi.statistics.add(item)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async getAllStatistics(context){
      try {
        const keyState = "statistics";
        const response = await RssApi.statistics.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Groups
    async getAllGroups(context){
      try {
        const keyState = "groups";
        const response = await RssApi.groups.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addGroups(context, item){
      try {
        const keyState = "groups";
        const response = await RssApi.groups.add(item)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
        context.commit('SET_GROUP', response.data);
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    //Alerts
    async getAllAlerts(context){
      try {
        const keyState = "alerts";
        const response = await RssApi.alerts.getAll()
        context.commit('SET_RSS_ITEMS', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },

    async addAlerts(context, item){
      try {
        const keyState = "alerts";
        const response = await RssApi.alerts.add(item)
        context.commit('ADD_RSS_ITEM', {rssData: response.data, keyState});
      }catch (error){
        context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },


  },
  modules: {
  }
})
