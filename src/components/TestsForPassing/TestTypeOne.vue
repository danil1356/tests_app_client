<template>
  <div class="row drag_box">
    <label>{{ this.name }}</label>
    <div class="col-5 droppable">
      <draggable class="draggable" :animation="300"
                 v-model="answersOne"
                 group="answers"
                 @start="drag=true"
                 @end="drag=false"
                 item-key="id">
        <template #item="{element, index}">
          <div class="answer_text">{{element.answer}}</div>
        </template>
        <template #header>
          <div class="theme_text">
            {{this.categoryOne}}
          </div>
        </template>

      </draggable>
    </div>

    <div class="col-5 droppable">
      <draggable class="draggable" :animation="300"
                 v-model="answersTwo"
                 group="answers"
                 @start="drag=true"
                 @end="drag=false"
                 item-key="id">
        <template #item="{element, index}">
          <div class="answer_text">
            {{element.answer}}
          </div>
        </template>
        <template #header>
          <div class="theme_text">
            {{this.categoryTwo}}
          </div>
        </template>
      </draggable>
    </div>

    <h6>{{this.result}}</h6>

  </div>
  <div>
    <a-button @click="checkAnswer">Далее</a-button>
  </div>

<!--  <label>{{this.info.id}}</label>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import draggable from "vuedraggable";
import {toRef} from "vue";

export default {
  name: "TestTypeOne1",
  components:{
    draggable
  },

  setup(props){
    const idQuestion = toRef(props.info, 'id')
    const name = toRef(props.info, 'name')

    return{
      idQuestion,
      name
    }
  },

  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswer()
      await this.getAllAnswerAddi()

      this.categoryOne = this.editAnswerAddiData[0].category
      this.categoryTwo = this.editAnswerAddiData[1].category

      for (let i = 0; i <this.editAnswerData.length; i++) {
        let rand = Math.floor(Math.random() * (2 - 0)) + 0;

        if (rand === 1){
          this.answersOne.push(this.editAnswerData[i])
        }
        else {
          this.answersTwo.push(this.editAnswerData[i])
        }
      }
    })
  },
  data(){
    return{
      categoryOne:"",
      categoryTwo:"",
      answersOne:[],
      answersTwo:[],

      result:"",
      rezObj:{
        isCorrect:null,
        isNext:null
      },

      drag: false,
    }
  },

  props:{

    info:{
      type: Object,
      default(){
        return{}
      }
    }
  },

  methods:{
    checkAnswer(e){
      let count=0

      for (let i = 0; i <this.answersOne.length; i++) {
        if (this.answersOne[i].answer_addi_id === this.editAnswerAddiData[0].id){
          count++
          if (count == this.answersOne.length){
            this.result = "Верно"
            this.rezObj.isCorrect = true
            this.rezObj.isNext = true
          }
        }
        else {
          this.result = "Не верно"
          this.rezObj.isCorrect = false
          this.rezObj.isNext = false
        }
      }

      this.$emit('send', this.rezObj)
    },

    ...mapActions([
        'getAllAnswerAddi',
        'getAllAnswer',
        'updateAnswer'
    ])
  },

  computed:{
    editAnswerAddiData(){
      return this.editAnswerAddi(this.idQuestion.toString())
    },

    editAnswerData:{
      get: function (){
        return this.editAnswer(this.idQuestion)
      },
      set: function (value){
        this.updateAnswer(value)
      }
    },


    ...mapGetters([
        'editAnswer',
        'editAnswerAddi'
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
  background: coral;
  margin-left: 11%;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 80%;
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