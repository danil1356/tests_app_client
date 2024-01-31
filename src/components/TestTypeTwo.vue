<template>
  <div class="drag_box">
    <div class="droppable">
    <br/>
    <label>Выделите верное:</label>
    <div class="theme_text" v-for="(item, index) in this.editAnswerData" :key="item.id">
      <a-checkbox class="answer_text" v-model:checked="editAnswerData[index].is_correct"><input  v-model="editAnswerData[index].answer" ></a-checkbox> <close-circle-outlined @click="deleteAnswer($event, item.id)"/>
    </div>
    <div class="theme_text" v-for="(item, index) in this.answersSet" :key="item.id">
      <a-checkbox class="answer_text" v-model:checked="checkedValue[index]"><input  v-model="inputValue[index]" ></a-checkbox>
    </div>
    </div>

<!--    <span v-if="editAnswerData.length>0">{{editAnswerData}} asdadasdas</span>-->
<!--    <span>{{inputValue}}</span>-->

    <br>
    <a-button @click="addNewInputCheckBox"><plus-outlined /></a-button> <br>
    <label>{{this.alertTxt}}</label>
    <br/>

    <div>
      <a-button @click="saveAnswer">Сохранить</a-button>
    </div>
<!--    todo потом убрать-->
<!--    <label>{{editAnswerData}} {{this.inputValue}}</label>-->
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {ref} from 'vue'
import {PlusOutlined, CloseCircleOutlined} from "@ant-design/icons-vue";

export default {
  name: "TestTypeTwo",
  components:{
    PlusOutlined,
    CloseCircleOutlined
  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswer()
    })
  },

  props: [
      'id'
  ],

  data() {
    return {
      idQuestion: this.id,
      checkedP: false,
      answersSet:[],
      checkedValue: [false],
      inputValue:[],
      alertTxt:""

    }
  },

  created() {
    // if (this.editAnswerData.length){
    //   this.answersSet.push('')
    // }
  },

  setup(){
    return {
    }
  },

  methods:{
    async addNewInputCheckBox(){
      if ((this.answersSet.length + this.editAnswerData.length)  <5){
        this.checkedValue.push(false)
        this.answersSet.push('')
      }
      else {
        this.alertTxt = "Не больше 5";
      }

    },

    async saveAnswer(e){
      //сохранение
      for (let i=0; i<this.answersSet.length; i++){
        const item ={
          answer: this.inputValue[i],
          is_correct: this.checkedValue[i],
          questions_id: this.idQuestion,
          answer_addi_id: null
        }
        console.log(item)
        await this.addAnswer(item)
      }
      //изменение
      if (this.editAnswerData.length>0){
        for (let i = 0; i < this.editAnswerData.length; i++) {
          const item ={
            id: this.editAnswerData[i].id,
            answer: this.editAnswerData[i].answer,
            is_correct: this.editAnswerData[i].is_correct ,
            questions_id: this.editAnswerData[i].questions_id,
            answer_addi_id: null
          }
          console.log(item)
          await this.editAnswer(item)
        }
      }
    },

    async deleteAnswer(e, id){
      await this.removeAnswer(id)
    },

    ...mapActions([
        'getAllAnswer',
        'addAnswer',
        'editAnswer',
        'removeAnswer'
    ])
  },

  computed:{
    editAnswerData(){
      return this.$store.getters.editAnswer(this.idQuestion)
    },

    ...mapState({
      answerItems: state => state.answer
    })
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