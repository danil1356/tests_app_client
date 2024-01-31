<template>

  <div class="drag_box" v-if="this.i ===127">
    <TestTypeOne
        v-bind:info="infoObj"
        @send="getAnswerData"
    />
  </div>
  <div class="drag_box" v-if="this.i ===143">
    <TestTypeThree
        v-bind:info="infoObj"
        @send="getAnswerData"
    />
  </div>
  <div class="drag_box" v-if="this.i ===141">
    <TestTypeTwo
        v-bind:info="infoObj"
        @send="getAnswerData"
    />
  </div>

  <div v-if="this.i === null">
    <a-result
        status="success"
        title="Тест пройден!"
        sub-title="Результаты тестирования сохранены, итого:"
    >
      <template #extra>
        <h6>{{this.statisticsFilteredData[statisticsFilteredData.length-1].test_result}} / {{this.questionsDataFilter.length}}</h6>

        <a-button key="console" type="primary">Вернуться</a-button>
        <a-button key="buy">Пройти еще раз</a-button>
      </template>
    </a-result>

<!--    <label>{{this.statisticsFilteredData[statisticsFilteredData.length-1].test_result}}</label>-->
  </div>

<!--<label>{{this.id}}</label>-->
<!--<label>{{this.questionsDataFilter}}</label>-->
<!--<label>{{this.userData}}</label>-->
<!--<label>{{this.rezObj}}</label>-->
</template>

<script>
import TestTypeOne from "@/components/TestsForPassing/TestTypeOne";
import TestTypeTwo from "@/components/TestsForPassing/TestTypeTwo";
import TestTypeThree from "@/components/TestsForPassing/TestTypeThree";
import {mapActions, mapGetters, mapState, useStore} from "vuex";
import {reactive, ref, toRefs, computed} from "vue";
import {wait} from "@/utils/utils";

export default {
  name: "PassingTheTest",
  components:{
    TestTypeOne,
    TestTypeTwo,
    TestTypeThree
  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getUsersByLogin(localStorage.getItem('login'))
      await this.getAllQuestion()
      this.infoObj.id = this.questionsDataFilter[0].id
      this.infoObj.name = this.questionsDataFilter[0].question
      this.i = this.questionsDataFilter[0].question_type_id
      // this.i = null
      await this.getAllStatistics()
      // await wait(1500)
    })
  },

  data(){
    return{
      id: parseInt(this.$route.params.id),
      i: 0, //127-сопоставление  143-порядок, 141 - чекбоксы

      infoObj: {
        id:0,
        name: "test"
      },

      countCorrectAnswers:0,
      count:0,
      rezObj:[]
    }
  },

  setup(props, context){
    console.log(context.emit)
    const store = useStore();
    return{

    }
  },

  methods:{
    async getAnswerData(data){
      if (this.count === this.questionsDataFilter.length){
        this.i = null
        const item ={
          test_result: this.countCorrectAnswers,
          tests_id: this.id,
          user_id: this.userData.id,
          pass_name: this.userData.login
        }

        console.log(item)
        await this.addStatistics(item)
        await this.getAllStatistics()
      }
      else {
        let id = this.questionsDataFilter[this.count].question_type_id
        let id2 = this.questionsDataFilter[this.count].id
        this.i = id
        this.infoObj.id = id2
        this.rezObj[this.count] = data

        if (this.rezObj[this.count].isCorrect){
          this.countCorrectAnswers++;
        }

        console.log(data)
        this.count++
      }
    },

    ...mapActions([
        'getAllQuestion',
        'addStatistics',
        'getUsersByLogin',
        'getAllStatistics'
    ])
  },

  computed:{
    questionsDataFilter(){
      return this.questionsItems(this.id)
    },

    statisticsFilteredData(){
      return this.statisticsItems(this.id, this.userData.id)
    },

    ...mapState({
      userData: state => state.user
    }),

    ...mapGetters([
        'questionsItems',
        'statisticsItems'
    ])
  }
}
</script>

<style scoped>

.droppable{
  padding: 15px;

  border-radius: 5px;
  background: #42b983;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
}
.droppable h5{
  color: darkmagenta;
}

.draggable {
  background: aquamarine;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 0px;
  height: 100%;
}
.theme_text {
  background: whitesmoke;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 5px;
}

.answer_text {
  background: aliceblue;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 93%;
}

.draggable h5{
  margin: 0;
}

.drag_box{
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}


</style>