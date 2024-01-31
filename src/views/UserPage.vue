<template>
  <div >
  <a-row >
    <a-col :span="8">
      <div  v-if="userInfo">
        <a-descriptions class="item-list" title="Информация пользователя">
          <a-descriptions-item label="Login">{{userInfo.login}}</a-descriptions-item>
          <a-descriptions-item label="Mail">{{userInfo.mail}}</a-descriptions-item>
          <a-descriptions-item label="Ф.И.О.">{{userInfo.second_name}} {{userInfo.name}} {{userInfo.patronymic}}</a-descriptions-item>
          <a-descriptions-item label="Дата рождения">{{this.dataT}}</a-descriptions-item>
        </a-descriptions>
      </div>
    </a-col>

<!--    LIST-->
    <a-col :span="16">
      <div>
        <a-list
            class="demo-loadmore-list"
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="userInfo.alertsDtos"
        >
          <template #loadMore>
            <div v-if="!initLoading && !loading"
                 :style="{
                textAlign: 'center',
                marginTop: '12px',
                height: '32px',
                lineHeight: '32px' }">

              <a-button @click="onLoadMore">loading more</a-button>
            </div>
          </template>
          <template #renderItem="{ item }">
            <a-list-item class="item-list">
              <template #actions>
                <a @click="addUser(item.user_sender_id, this.mainGroup.id)" key="list-loadmore-edit">Принять</a>
                <a @click="deleteUser" key="list-loadmore-more">Отклонить</a>
              </template>
              <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                <a-list-item-meta
                    :description="'@'+item.user_login"
                >
                  <template #title>
                    <a href="https://www.antdv.com/">{{ item.name }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  </template>
                </a-list-item-meta>
                <a-tag v-if="item.is_hide === false" color="#f50">NEW</a-tag>
              </a-skeleton>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-col>
  </a-row>
  </div>

<!-- todo TABLE-->
  <a-row type="flex" v-if="this.mainGroup">
    <a-col :flex="1">

      <a-table :columns="columns"
               :data-source="mainGroup.usersDtos">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
          </template>
          <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
          </template>
        </template>
      </a-table>

    </a-col>
  </a-row>

  <a-row type="flex" v-if="this.userInfo[0]">
    <a-col :flex="1">

      <a-table :columns="columns"
               :data-source="mainGroup.usersDtos">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
          </template>
          <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
          </template>
        </template>
      </a-table>

    </a-col>
  </a-row>

  <div class="chart-box">
  <RingChart/>
  </div>

<!--  <label>{{this.userInfo}}</label>-->
<!--  <label>{{this.groupsData}}</label>-->
<!--  <label v-if="this.mainGroup">{{this.mainGroup.usersDtos}}</label>-->

</template>

<script>
import {mapActions, mapGetters, mapState, useStore} from "vuex";
import {computed, reactive, ref, toRefs} from "vue";
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import RingChart from "@/components/RingChart";

export default {
  name: "UserPage",

  components: {
    SmileOutlined,
    DownOutlined,
    RingChart
  },

  mounted() {
    this.$nextTick(async ()=>{
      if (sessionStorage.getItem('login') || localStorage.getItem('login')){
        await this.getAllGroups()
        await this.getUsers()
        this.dataT = this.userInfo.date_birth.slice(0,10)
      }
    })
  },
  data(){
    return{
      dataT:null
    }
  },

  setup(){
    const store = useStore();
    const  userInfo = computed(()=> store.state.user)
    const  mainGroup = computed(()=> store.getters.getMainGroup(localStorage.getItem('login')))
    //todo пример обновления реактивно
    // const updateArray = (newValue) => {
    //   this.$store.commit('updateMyArray', newValue)
    // }



    const columns = [{
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    }, {
      title: 'Action',
      key: 'action',
    }];



    return{
      userInfo,
      mainGroup,
      columns
    }
  },


  methods:{
    async addUser(userId, groupId){
      await this.addUserGroup({userId, groupId})
    },

    async deleteUser(){

    },


    ...mapActions([
        'getUsersByLogin',
        'getAllGroups',
        'addUserGroup',
        'getUsers'
    ])
  },

  computed:{


    ...mapState({
      userData: state => state.user,
      groupsData: state => state.groups
    }),
    ...mapGetters([
        "getMainGroup"
    ])
  },
}
</script>

<style scoped>
.item-list{
  background-color: cyan;
  border-radius: 10px;
}

.item-in-list{
  background-color: honeydew;
}

.user-box{
  background-color: #cccccc;
  height: 100%;
}

.chart-box{
  height: 300px;
  width: 700px;
}


</style>