<template>
  <div class="drag_box">
    <label>{{this.name}}</label>
    <div class="droppable">
    <br/>
    <div class="theme_text" v-for="(item, index) in this.editAnswerData" :key="item.id">
      <a-checkbox class="answer_text" v-model:checked="checkedSet[index]"><label>{{item.answer}}</label></a-checkbox> <close-circle-outlined @click="deleteAnswer($event, item.id)"/>
    </div>
    </div>
    <label>{{this.idQuestion}}</label>
    <label>{{this.checkedSet}}</label>
    <h6>{{this.result}}</h6>
    <button @click="checkAnswer">Далее</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { ref, reactive, toRefs, toRef } from 'vue'

export default {
  name: "TestTypeTwo2",
  data(){
    return{

      result:"",
      rezObj:{
        isCorrect:null,
        isNext:null
      },


      checkedSet:[]
    }
  },

  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswer()

      for (let i = 0; i <this.editAnswerData.length; i++) {
        this.checkedSet.push(false)
      }
    })
  },

  methods:{
    checkAnswer(e){
      let count=0

      for (let i = 0; i <this.checkedSet.length; i++) {
        if (this.checkedSet[i] === this.editAnswerData[i].is_correct){
          count++
          if (count == this.checkedSet.length){
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
        'getAllAnswer'
    ])
  },

  props:{
    info:{
      type: Object,
      default(){
        return{}
      }
    }
  },

  //todo важно
  setup(props){
    const idQuestion = toRef(props.info, 'id')
    const name = toRef(props.info, 'name')

    return{
      idQuestion,
      name
    }
  },

  computed:{
    editAnswerData(){
      return this.editAnswer(this.idQuestion)
    },

    ...mapGetters([
        'editAnswer'
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