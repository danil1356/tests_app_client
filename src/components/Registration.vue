<template>
  <div>
    <a-form :model="form" :rules="rules" layout="vertical">

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Логин" name="login">
            <a-input
                v-model:value="form.login"
                placeholder="Введите логин"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Пароль" name="password">
            <a-input
                v-model:value="form.password"
                placeholder="Введите пароль"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Пароль еще раз" name="passwordSecond">
            <a-input
                v-model:value="form.paswordSecond"
                placeholder="Введите пароль"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Имя" name="name">
            <a-input
                v-model:value="form.name"
                placeholder="Введите имя"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Фамилия" name="familia">
            <a-input
                v-model:value="form.familia"
                placeholder="Введите фамилию"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Отчество" name="otchestvo">
            <a-input
                v-model:value="form.otchestvo"
                placeholder="Введите отчество"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item label="Дата рождения" name="dateTime">
          <a-date-picker
              v-model:value="form.dateTime"
              style="width: 100%"
              placeholder="Выберите дату рождения"
              :get-popup-container="trigger => trigger.parentElement"
          />
        </a-form-item>
      </a-col>
      </a-row>

      <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item label="email" name="email">
          <a-input
              v-model:value="form.email"
              placeholder="Введите email"
          />
        </a-form-item>
      </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Тип учетной записи" name="email">
            <div>
              <a-radio-group v-model:value="accountType" button-style="solid">
                <a-radio-button value="student">Ученик</a-radio-button>
                <a-radio-button value="teacher">Преподаватель</a-radio-button>
              </a-radio-group>
            </div>
          </a-form-item>
        </a-col>
      </a-row>


      <a-row v-if="accountType==='student'" :gutter="16">
        <a-col :span="24">
          <label>Выберите преподавателя:</label>
<!--          <label>{{this.usersTeachersData}}</label>-->
          <a-list item-layout="horizontal" :data-source="usersTeachersData">
            <template #renderItem="{ item }">
              <a-list-item>

                <a-radio-button :value="item" @click="setSelectItem(item.id)" class="selectL">
                <a-list-item-meta :description=item.login>
                  <template #title>
                    <a>{{ item.name }} {{item.second_name}}</a>
                  </template>
                  <template #avatar>
                    <a-avatar style="background-color: #1890ff">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                  </template>
                </a-list-item-meta>
                </a-radio-button>

              </a-list-item>
            </template>
          </a-list>
        </a-col>
      </a-row>

    </a-form>

    <a-button @click="registration">Регистрация</a-button>
  </div>
</template>

<script>
import {computed, defineComponent, reactive, ref} from 'vue';
import {mapActions, mapGetters, mapState, useStore} from "vuex";
import { UserOutlined } from '@ant-design/icons-vue';


export default {
  name: "Registration",

  components:{
    UserOutlined
  },

  mounted() {
    this.$nextTick(async ()=>{
      await this.getUsers()
    })
  },

  methods:{
    async registration(e){
      const item ={
        login: this.form.login,
        password: this.form.password,
        name: this.form.name,
        second_name: this.form.familia,
        mail: this.form.email,
        patronymic: this.form.otchestvo,
        date_birth: this.form.dateTime
      }

      if (this.accountType === "student"){
        await this.addUserStudent(item)
        //todo ИЕЕЕЕСТЬ СЮДА
        console.log(this.newUser[0].id)

        const itemAlert ={
          name: "Заявка на вступление",
          user_sender_id: this.newUser[0].id,
          user_id: this.selectItem,
          is_hide:false
        }
        await this.addAlerts(itemAlert)

      }else {
        const itemGroup={
          name: this.form.login + "_Group"
        }
        await this.addGroups(itemGroup)
        await this.addUserTeacher(item)

      }
    },

    ...mapActions([
        'addUser',
        'addGroups',
        'addUserTeacher',
        'getUsers',
        'addUserStudent',
        'addAlerts'
    ])
  },

  setup() {
    const store = useStore()
    const newUser = computed(()=> store.getters.getUserInState(form.login))

    const accountType = ref('student')

    const selectItem = ref(null)
    const setSelectItem = (item)=>{
      selectItem.value = item
    }

    const form = reactive({
      name: "",
      familia: "",
      otchestvo: "",
      login: "",
      password: "",
      dateTime: null,
      paswordSecond: "",
      email: "",
    });
    const rules = {
      name: [{
        required: true,
        message: 'Пожалуйста введите имя',
      }],
      familia: [{
        required: true,
        message: 'Пожалуйста введите фамилию',
      }],
      login: [{
        required: true,
        message: 'Пожалуйста введите логин',
      }],
      password: [{
        required: true,
        message: 'Введите пароль',
      }],
      dateTime: [{
        required: true,
        message: 'Выберите дату рождения',
        type: 'object',
      }],
      paswordSecond: [{
        required: true,
        message: 'Введите пароль еще раз',
      }],
    };

    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    return {
      accountType,
      form,
      rules,
      visible,
      showDrawer,
      onClose,

      selectItem,
      setSelectItem,
      newUser
    };
  },

  computed:{
    usersTeachersData:{
      get: function (){
        return this.usersRoleTeacherItems
      }
    },

    ...mapGetters([
       'usersRoleTeacherItems',
        'getUserInState'
    ]),

    ...mapState({
      groupElement: state => state.group,
      usersData: state => state.users
    })
  }
}
</script>

<style scoped>

.selectL{
  width: 100%;
  height: 100%;
  border: none;
}

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