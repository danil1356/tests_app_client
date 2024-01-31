<template>
  <div>
    <h5>Настройка теста</h5>

    <div>
      <b-input-group>
        <template #prepend>
          <b-input-group-text >Название</b-input-group-text>
        </template>
        <b-form-input v-model="testName"></b-form-input>
      </b-input-group>
    </div>

    <div>
      <b-dropdown id="dropdown-1" variant="success" class="m-md-2">
        <template v-slot:button-content>
          {{themeName}}
        </template>
        <b-dropdown-item v-for="item in themesItems" :key="item.id" :value="item.id"
                         @click="themeName=item.name, themeId=item.id">{{item.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <h6> </h6>
    <div>
      <b-dropdown id="dropdown-1" variant="success" class="m-md-2">
        <template v-slot:button-content>
          {{subThemeName}}
        </template>
        <b-dropdown-item v-for="item in subThemesItems" :key="item.id" :value="item.id"
                         @click="subThemeName=item.name, subThemeId=item.id">{{item.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>


  <div>
<!--    тайм пикер тут-->
    <a-space direction="vertical">
      <a-time-picker v-model:value="time" value-format="HH:mm:ss" />
      <h5>{{time}}</h5>
    </a-space>
  </div>

<!--  <div>-->
<!--    <label>Тип теста</label>-->
<!--    <div>-->
<!--      <input type="checkbox" v-model="sopostavlenie" v-bind:true-value="yes" v-bind:false-value="no" />-->
<!--      <span> Сопоставление</span>-->
<!--      <input type="checkbox" v-model="pravilniyPoryadok" v-bind:true-value="yes" v-bind:false-value="no" />-->
<!--      <span> Сопоставление</span>-->
<!--    </div>-->

<!--    <div>-->
<!--      <div v-if="sopostavlenie===yes">-->
<!--        <TestTypeOne/>-->
<!--      </div>-->
<!--      <div v-if="pravilniyPoryadok===yes">-->
<!--        <TestTypeOne/>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <b-button class="btn-dark" @click="saveTest">Сохранить</b-button>
</template>

<script>
import {mapActions, mapState, useStore} from "vuex";
import TestTypeOne from "@/components/TestTypeOne";
import {computed} from "vue";

export default {
  name: "TestCreater",

  components:{
    TestTypeOne
  },

  mounted() {
    this.$nextTick(
        async ()=>{
          await this.getThemes();
          await this.getSubThemes();
          await this.getUsersByLogin(localStorage.getItem('login'));
        }
    )
  },

  data(){
    return{
      themeName:'Темы',
      themeId:0,
      subThemeName:'Подтемы',
      subThemeId:0,
      testName:'',
      time: null,

      sopostavlenie: false,
      pravilniyPoryadok: false,
      yes: true,
      no: false
    }
  },

  methods: {
    async saveTest(e){
      const item= {
        name: this.testName,
        execution_time: this.time,
        author: this.userData.id,
        theme_id: this.themeId,
        subthemes_id: this.subThemeId,
      };

      console.log(item)
      await this.addTest({item:item, userId:this.userInfo.id})
      await this.$router.push({name: "testList"});
    },

    ...mapActions([
        'getThemes',
        'getSubThemes',
        'getUsersByLogin',
        'addTest'
    ])
  },

  setup(){
    const store = useStore();
    const userInfo = computed(()=> store.state.user)

    return{
      userInfo
    }

  },

  computed:{
    ...mapState({
      themesItems: state => state.themes,
      subThemesItems: state => state.subThemes,
      userData: state => state.user
    })
  },

}
</script>

<style scoped>

</style>