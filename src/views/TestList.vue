<template>
  <p>Мои тесты</p>

  <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }"
      :data-source="userInfo.testsSet"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card
            :style="{
                background: '#8df0e9'
               }"
            :title="item.name">

          <div class="space-align-container">
            <div class="space-align-block">
<!--                 v-for="item in testData"-->
<!--                 :key="item.id">-->

              <a-dropdown :trigger="['contextmenu']">
                <div :style="{
                    textAlign: 'center',
                    background: '#1111',
                    // height: '200px',
                    // lineHeight: '200px',
                     // color: '#777',
                    }">
                  <a-space align="start">
                    <span class="mock-block">
                      <div v-if="userInfo.id">
                        <a-tag v-if="item.author === userInfo.id.toString()" color="#f50">Автор</a-tag>
                      </div>

                      <div>
                        {{item.name}}
                      </div>
                    </span>
                  </a-space>
                </div>

                <template #overlay>
                  <a-menu>
                    <a-menu-item v-if="item.author === userInfo.id.toString()" key="1">
                      <UserOutlined />
                      <router-link :to="{name: 'QuestionsCreator', params: {id: item.id}}">
                        Изменить
                      </router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <UserOutlined />
                      <router-link :to="{name: 'PassingTheTest', params: {id: item.id}}">
                        Начать
                      </router-link>
                    </a-menu-item>
                    <a-menu-item v-if="item.author === userInfo.id.toString()" key="3" @click="deleteAnswer(e, item.id)">
                      <UserOutlined />
                      Удалить
                    </a-menu-item>
                    <a-menu-item key="4" @click="showModal(item.id)">
                      <UserOutlined />
                      Поделиться
                    </a-menu-item>
                  </a-menu>
                </template>

              </a-dropdown>
            </div>
          </div>

        </a-card>
      </a-list-item>
    </template>
  </a-list>

<!--  card из антдизайна-->

  <a-modal v-model:visible="visible" title="Поделиться" @ok="handleOk">
    <template #footer>
     </template>

    <div class="modal-body p-5 pt-0">
      <a-form v-if="this.mainGroup">

        <a-list item-layout="horizontal" :data-source="this.mainGroup.usersDtos">
          <template #renderItem="{ item, index}">

            <a-checkbox-group class="checkbox" v-model:value="list[index]">
              <a-checkbox :value="item.id">
                <a-list-item class="checkbox">
                  <a-list-item-meta :description=item.login>
                    <template #title>
                      <label>{{item.patronymic}} {{item.name}} {{item.second_name}}</label>
                    </template>
                    <template #avatar>
                      <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
                  </a-checkbox>
                </a-checkbox-group>
                <br/>

          </template>
        </a-list>

      </a-form>
    </div>
    <a-button @click="addAccess">Поделиться</a-button>
  </a-modal>

  <label>{{this.testData}}</label>

</template>

<script>
import {mapActions, mapState, useStore} from "vuex";
import {CloseCircleOutlined} from "@ant-design/icons-vue";
import {ref, computed, toRefs} from "vue";

export default {
  name: "TestList",

  components:{
    CloseCircleOutlined
  },

  data(){
    return{
      list:[],
    }
  },

  setup(props, context){
    const store = useStore();
    const userInfo = computed(()=> store.state.user)
    const mainGroup = computed(()=> store.getters.getMainGroup(localStorage.getItem('login')))

    const checked = ref(false)
    const testId = ref(null)

    const visible = ref(false);
    const showModal = (id)=>{
      visible.value = true
      testId.value = id
    };

    return{
      showModal,
      visible,
      userInfo,
      mainGroup,
      checked,
      testId
    }
  },

  mounted() {
    this.$nextTick(
        async ()=>{
          await this.getAllTests()
          if (sessionStorage.getItem('login') || localStorage.getItem('login')){
           await this.getAllGroups()
          }
        }
    )
  },

  methods:{
    async deleteAnswer(e, id){
      await this.removeTest(id)
    },

    async addAccess(){
      const lst = this.list.filter(Boolean);
      for (let i=0; i< lst.length; i++){
        await this.addAccessTest({userId:lst[i], testId:this.testId})
      }
    },

    ...mapActions([
        'getAllTests',
        'removeTest',
        'getAllGroups',
        'addAccessTest'
    ])
  },

  computed:{
    ...mapState({
      testData: state => state.tests
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

.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}

.space-align-container {
  /*display: flex;*/
  /*align-items: flex-start;*/
  /*flex-wrap: wrap;*/
  height: 100%;
  width: 100%;
}
.space-align-block {
  /*margin: 8px 4px;*/
  /*border: 1px solid #40a9ff;*/
  /*padding: 4px;*/
  /*flex: none;*/
  height: 100%;
  width: 100%;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  /*background: aquamarine;*/
  height: 100%;
  width: 200px;
}

.checkbox{
  width: 400px;
}

</style>