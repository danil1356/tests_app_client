<template>
  <div class="row drag_box">
    <div class="col-5 droppable">
      <draggable class="draggable" :animation="300"
                 v-model="inputValueOne"
                 group="answers"
                 @start="drag=true"
                 @end="drag=false"
                 item-key="id">
        <template #item="{element, index}">
          <div>
            <a-input class="answer_text" v-model:value="element.answer" placeholder="Введите вариант ответа" /> <close-circle-outlined @click="deleteAnswerOne($event, element.id, index)"/>
          </div>
        </template>
        <template #header>
          <div>
            <a-input class="theme_text" v-model:value="categoryOne" placeholder="Введите категорию ответа" />
          </div>
        </template>
        <template #footer>
          <div>
            <plus-circle-two-tone @click="addNewItemOne"/>
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-5 droppable">
      <draggable class="draggable" :animation="300"
                 v-model="inputValueTwo"
                 group="answers"
                 @start="drag=true"
                 @end="drag=false"
                 item-key="id">
        <template #item="{element, index}">
          <div>
            <a-input class="answer_text" v-model:value="element.answer" placeholder="Введите вариант ответа" /> <close-circle-outlined @click="deleteAnswerTwo($event, element.id, index)"/>
          </div>
        </template>
        <template #header>
          <div>
            <a-input class="theme_text" v-model:value="categoryTwo" placeholder="Введите категорию ответа" />
          </div>
        </template>
        <template #footer>
          <div>
            <plus-circle-two-tone @click="addNewItemTwo"/>
          </div>
        </template>
      </draggable>

    </div>

  </div>

  <div>
    <a-button @click="saveAnswer">Сохранить</a-button>
  </div>

<!--  <label>{{this.inputValueOne}}</label>-->
<!--  <label>{{this.inputValueTwo}}</label>-->
<!--  <label>{{this.editAnswerAddiData}}</label>-->
<!--  <label>{{this.editAnswerData}}</label>-->
  <label>{{this.idQuestion}}</label>
</template>

<script>
import {ref, toRef, toRefs} from 'vue';
import {PlusCircleTwoTone, CloseCircleOutlined} from "@ant-design/icons-vue";
import draggable from 'vuedraggable';
import {mapActions, mapState} from "vuex";

export default {
  name: "TestTypeOne",
  components:{
    draggable,
    PlusCircleTwoTone,
    CloseCircleOutlined
  },

  data(){
    return{
      // idQuestion: this.id,
      categoryOne:"",
      categoryTwo:"",
      categorySetOne:[],
      categorySetTwo:[],
      inputValueOne:[],
      inputValueTwo:[],

      idOne:null,

      //todo
      drag: false,
    }
  },

  props:{
    id: Number
  },

  setup(props){
    const idQuestion = toRef(props, 'id')

    return{
      idQuestion
    }
  },

  methods:{
    async addNewItemOne(){
      this.inputValueOne.push({id:null, answer:null, is_correct:true, questions_id:null, answer_addi_id:null})
    },
    async addNewItemTwo(){
      this.inputValueTwo.push({id:null, answer:null, is_correct:true, questions_id:null, answer_addi_id:null})
    },
    async deleteAnswerOne(e, id, index){
      await this.removeAnswer(id)
      this.inputValueOne.splice(index, 1)
    },
    async deleteAnswerTwo(e, id, index){
      await this.removeAnswer(id)
      this.inputValueTwo.splice(index, 1)
    },

    //todo пример функции в методе
    // test: function (e) {
    //   return null
    // },

    async saveAnswer(e){
      //если пустой
      if (!this.editAnswerAddiData.length){
        const category1={
          category: this.categoryOne,
          question_id: this.idQuestion
        }
        const category2={
          category: this.categoryTwo,
          question_id: this.idQuestion
        }
        await this.addAnswerAddi(category1)
        await this.addAnswerAddi(category2)
      }
      else {
        if (this.editAnswerAddiData[0].answer !== this.categoryOne || this.editAnswerAddiData[1].answer !== this.categoryTwo){
          const category1={
            id: this.editAnswerAddiData[0].id,
            category: this.categoryOne,
            question_id: this.idQuestion
          }
          const category2={
            id: this.editAnswerAddiData[1].id,
            category: this.categoryTwo,
            question_id: this.idQuestion
          }
          await this.editAnswerAddi(category1)
          await this.editAnswerAddi(category2)
        }
      }

      if (!this.inputValueOne.length){
        for (let i = 0; i <this.inputValueOne.length; i++) {
          const item ={
            answer: this.inputValueOne[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            answer_addi_id: this.editAnswerAddiData[0].id
          }
          await this.addAnswer(item)
        }
      }else {
        for (let i = 0; i <this.inputValueOne.length; i++) {
          const item ={
            id: this.inputValueOne[i].id,
            answer: this.inputValueOne[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            answer_addi_id: this.editAnswerAddiData[0].id
          }
          await this.editAnswer(item)
        }
      }

      if (!this.inputValueTwo.length){
        for (let i = 0; i <this.inputValueTwo.length; i++) {
          const item ={
            answer: this.inputValueTwo[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            answer_addi_id: this.editAnswerAddiData[1].id
          }
          await this.addAnswer(item)
        }
      }else {
        for (let i = 0; i <this.inputValueTwo.length; i++) {
          const item ={
            id: this.inputValueTwo[i].id,
            answer: this.inputValueTwo[i].answer,
            is_correct: true,
            questions_id: this.idQuestion,
            answer_addi_id: this.editAnswerAddiData[1].id
          }
          await this.editAnswer(item)
        }
      }
    },

    ...mapActions([
        'addAnswerAddi',
        'getAllAnswerAddi',
        'getAllAnswer',
        'addAnswer',
        'removeAnswer',
        'editAnswerAddi',
        'editAnswer'
    ])
  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswerAddi()
      await this.getAllAnswer()
      if (this.editAnswerAddiData !== null){
        this.categoryOne = this.editAnswerAddiData[0].category;
        this.categoryTwo = this.editAnswerAddiData[1].category;
      }
      if (this.editAnswerData !== null){
        for (let i = 0; i <this.editAnswerData.length; i++) {
          if (this.editAnswerData[i].answer_addi_id === this.editAnswerAddiData[0].id){
            this.inputValueOne.push(this.editAnswerData[i])
          }
          else {
            this.inputValueTwo.push(this.editAnswerData[i])
          }
        }
      }
    })
  },

  created() {

  },
  computed:{
    editAnswerAddiData(){
      //todo проблема в тустринг
      return this.$store.getters.editAnswerAddi(this.idQuestion.toString())
    },
    editAnswerData(){
      return this.$store.getters.editAnswer(this.idQuestion)
    },
    //todo
    // editAnswerDataOne(){
    //   return this.$store.getters.editAnswerOneTwo(this.idQuestion, 393)
    // },

    ...mapState({
      answerAddiData: state => state.answerAddi
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