<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />

<!--  <label v-if="statisticsData">{{this.statisticsData}}</label>-->
<!--  <label v-if="testData">{{this.testData[2]}}</label>-->
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'
import {mapActions, mapState, useStore} from "vuex";
import {computed} from "vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)


export default {
  name: "RingChart",
  components: { Bar, Doughnut },

  data() {

  },
  mounted() {
    this.$nextTick(async ()=>{
      await this.getAllStatistics()
      await this.getAllTests()
    })
  },

  computed:{
    chartData(){
      return{
        labels: this.labels(),
        datasets: [
          {
            data: this.statistics(),
            label:'Средний результат в группе',
            backgroundColor:['#00D8FF'],
            stack:'stack1'
          },
          {
            data: this.testSize(),
            label:'Всего вопросов',
            stack:'stack2'
          }
        ]
      }
    },
    chartOptions(){
      return{
        scales: {
          yAxes: [{
            ticks: {
              maxTicksLimit: 4
            }
          }],
          xAxes: [{
            ticks: {
              maxTicksLimit: 4
            }
          }]
        },

        // responsive: true,
        // maintainAspectRatio: false
      }
    },

    ...mapState({
      statisticsData: state => state.statistics,
      testData: state => state.tests
    })
  },

  setup(props, context){
    const store = useStore();
    const userInfo = computed(()=>store.state.user)

    return{
      userInfo
    }
  },

  methods:{
    labels(){
      const a = this.testData.filter(item => item.author === this.userInfo.id.toString())
      let rez= a.map(item=> item.name)
      // console.log(a)
      return rez;
    },
    statistics(){
      let a = this.testData.filter(item => item.author === this.userInfo.id.toString())
      let testLength = a.map(item=> item.statisticsSet.length)

      let idTests = a.map(item=> item.id)
      let b = this.statisticsData.filter(item => item)

      let rez = Array(idTests.length).fill(0);

      for (let i=0; i<this.statisticsData.length; i++)
      {
        let s = this.statisticsData[i].tests_id
        let score = Number(this.statisticsData[i].test_result)
        const indexI = idTests.findIndex(el => el == s)

        rez[indexI] +=score
      }

      rez = rez.map((value, index) => {
        return value/testLength[index]
      })

      return rez
    },
    testSize(){
      let a = this.testData.filter(item => item.author === this.userInfo.id.toString())
      let testLength = a.map(item=> item.questionsSet.length)

      return testLength
    },

    ...mapActions([
        'getAllStatistics',
        'getAllTests'
    ])
  },
}
</script>

<style scoped>

</style>