<template>
  <div class="drag_box">
    <div class="droppable">
      <draggable class="draggable" :animation="300"
          v-model="list"
          group="people"
          @start="drag=true"
          @end="drag=false"
          item-key="id">
        <template #item="{element, index}">
          <div>
            <a-input class="answer_text" v-model:value="element.answer" placeholder="Введите вариант ответа" /> <close-circle-outlined @click="deleteAnswer($event, element.id, index)"/>
          </div>
        </template>
        <template #footer>
          <div>
            <plus-circle-two-tone @click="addNewAnswer"/>
          </div>
        </template>
      </draggable>
    </div>
  </div>

<!--  <label>{{this.list}}</label>-->
  <div>
    <a-button @click="saveAnswer">Сохранить</a-button>
  </div>

</template>

<script>
import draggable from 'vuedraggable';
import {mapActions, mapState} from "vuex";
import {CloseCircleOutlined, PlusCircleTwoTone} from "@ant-design/icons-vue";

export default {
  name: "TestTypeThree",

  components:{
    draggable,
    CloseCircleOutlined,
    PlusCircleTwoTone
  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswer()
      for (let i = 0; i <this.editAnswerData.length; i++) {
        this.list.push(this.editAnswerData[i]);
      }
    })
  },

  data(){
    return{
      idQuestion: this.id,

      list: [],

      drag: false,
    }
  },
  props:[
      'id'
  ],
  methods:{
    async addNewAnswer(){
      this.list.push({id:null, answer:null, is_correct:true, questions_id:null, answer_addi_id:null, index: null})
    },
    async saveAnswer(e){
      if (!this.editAnswerData.length){
        for (let i = 0; i <this.list.length; i++) {
          const item ={
            answer: this.list[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            index: i
          }
          await this.addAnswer(item)
        }
      }else {
        for (let i = 0; i <this.list.length; i++) {
          const item ={
            id: this.list[i].id,
            answer: this.list[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            index: i
          }
          await this.editAnswer(item)
        }
      }
    },

    async deleteAnswer(e, id, index){
      await this.removeAnswer(id)
      this.list.splice(index, 1)
    },

    ...mapActions([
        'getAllAnswer',
        'addAnswer',
        'removeAnswer',
        'editAnswer'
    ])
  },
  setup(){


    return{

    }

  },

  computed:{
    editAnswerData(){
      return this.$store.getters.editAnswer(this.idQuestion)
    },

    ...mapState({

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
  height: 30%;
  margin-left: auto;
  margin-right: auto;
  background: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}

</style>