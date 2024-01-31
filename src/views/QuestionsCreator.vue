<template>
  <div>
    <div>
      <b-input-group>
        <template #prepend>
          <b-input-group-text >Вопрос:</b-input-group-text>
        </template>
        <b-form-input v-model="questionName"></b-form-input>
      </b-input-group>
    </div>

    <label>Тип вопроса</label>
    <div>
      <div>
        <select v-model="selected">
          <option disabled value="">Выберете тип</option>
          <option v-for="(item, index) in typeData"
                  :key="index"
                  :value="item">{{item.type}}</option>
        </select>
      </div>


    </div>
    <div>
      <div v-if="selected.type === 'Сопоставление'">
<!--        <TestTypeOne/>-->
      </div>
      <div v-if="selected.type === 'Чекбоксы'">
<!--        <TestTypeTwo/>-->
      </div>
      <div v-if="selected.type === 'Порядок'">
<!--                <TestTypeThree/>-->
      </div>
    </div>

    <b-button @click="saveQuestion">Добавить вопрос</b-button>
  </div>



  <label :style="{ margin: '16px 0'}">Список Вопросов для теста {{this.id}}:</label>

  <div>
    <div v-for="(item, index) in gettersFilteredData" :key="index" >
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="visible = !visible">{{item.question}}</b-button>
          <b-button @click="removeQuestion(e,item.id)">удалить</b-button>
        </b-card-header>
        <b-collapse v-b-toggle:my-collapse  v-model="visible" >
          <b-card-body>
            <div v-if="item.question_type_id === 141">
              <TestTypeTwo v-bind:id="item.id"/>
            </div>
            <div v-if="item.question_type_id === 127">
              <TestTypeOne v-bind:id="item.id"/>
            </div>
            <div v-if="item.question_type_id === 143">
              <TestTypeThree v-bind:id="item.id"/>
            </div>
<!--            <b-card-title v-for="(item2, index2) in item.answerSet" :key="index2">-->
<!--              {{item2.answer}}-->
<!--            </b-card-title>-->
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>

<!--  <label>{{gettersFilteredData}}</label>-->
</template>

<script>
import TestTypeOne from "@/components/TestTypeOne";
import TestTypeTwo from "@/components/TestTypeTwo";
import TestTypeThree from "@/components/TestTypeThree";
import {mapActions, mapState, useStore} from "vuex";
import {computed, reactive, ref} from 'vue'

export default {
  name: "QuestionsCreator",

  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllQuestion()
      await this.getAllTests()
      await this.getAllType()
    })
  },

  components:{
    TestTypeOne,
    TestTypeTwo,
    TestTypeThree
  },


  setup(){
    const checked1 = ref(false);
    const disable1 = ref(false);
    const checked2 = ref(false);
    const disable2 = ref(false);

    return {
      checked1,
      disable1,
      checked2,
      disable2,
    }
  },

  data() {
    return{
      id: parseInt(this.$route.params.id),
      questionName: '',
      questionTypeId:'',
      selected:'',

      visible: false,

      sopostavlenie: false,
      pravilniyPoryadok: false,
      yes: true,
      no: false
    }
  },

  methods:{
    async saveQuestion(e){
      const item={
        question: this.questionName,
        tests_id: this.id,
        question_type_id: this.selected.id
      }
      await this.addQuestion(item)

      this.questionName =''
      this.selected=''
    },
    async removeQuestion(e, id){
      await this.deleteQuestion(id)
    },

    ...mapActions([
        'getAllTests',
        'getAllType',
        'addQuestion',
        'getAllQuestion',
        'deleteQuestion'

    ])
  },

  computed:{
    gettersFilteredData(){
      return this.$store.getters.questionsItems(this.id)
    },

    ...mapState({
      questionsData: state => state.questions,
      testData: state => state.tests,
      typeData: state => state.questionType
    })
  }
}
</script>

<style scoped>

</style>