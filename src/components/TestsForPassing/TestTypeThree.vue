<template>
  <div class="drag_box">
    <label>{{this.name}}</label>
    <div class="droppable">
      <draggable class="draggable" :animation="300"
                 v-model="answerData"
                 group="people"
                 @start="drag=true"
                 @end="drag=false"
                 item-key="id">
        <template #item="{element, index}">
          <div class="answer_text">
            {{element.answer}}
          </div>
        </template>
      </draggable>
    </div>
  </div>

  <h6>{{this.result}}</h6>
<!--  <label>{{this.answerData}}</label>-->
  <div>
    <a-button @click="checkAnswer">Далее</a-button>
  </div>

</template>

<script>
import draggable from "vuedraggable";
import {reactive, toRef} from "vue";
import {mapActions, mapGetters} from "vuex";


export default {
  name: "TestTypeThree3",

  data(){
    return{
      result:"",
      rezObj:{
        isCorrect:null,
        isNext:null
      },

      drag: false,
    }
  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllAnswer()
      this.answerData = this.answerData.sort(() => Math.random() - 0.5)
    })
  },

  props:{
    info:{
      type: Object,
      default(){
        return{}
      }
    }
  },
  setup(props){
    const idQuestion = toRef(props.info, 'id')
    const name = toRef(props.info, 'name')

    return{
      idQuestion,
      name
    }
  },

  methods:{
    checkAnswer(e){
      let count=0

      for (let i = 1; i <this.answerData.length; i++) {
        if (this.answerData[i-1].index < this.answerData[i].index){
          count++
          if (count == (this.answerData.length-1)){
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
      'getAllAnswer',
        'updateAnswer'
    ])
  },

  computed:{
    answerData:{
      get: function (){
        return this.editAnswer(this.idQuestion)
      },
      set: function (value){
        this.updateAnswer(value)
      }
    },

    ...mapGetters([
        'editAnswer'
    ])
  },


  components:{
    draggable
  },
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
  width: 100%;
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