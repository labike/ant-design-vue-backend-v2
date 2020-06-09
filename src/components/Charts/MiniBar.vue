<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart :force-fit="true" :height="height" :data="data" :padding="[36, 5, 18, 5]">
        <v-tooltip />
        <v-bar position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { userTrend } from '@/api/user'

const data = []
const beginDay = new Date().getTime()
console.log(beginDay)

for (let i = 0; i < 10; i++) {
  data.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  })
}

const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  min: 2
}, {
  dataKey: 'y',
  title: '时间',
  min: 1,
  max: 30
}]

export default {
  name: 'MiniBar',
  data () {
    return {
      data,
      tooltip,
      scale,
      height: 100
    }
  },
  mounted () {
    this.getUserTrend()
  },
  methods: {
    getUserTrend () {
      userTrend().then(res => {
        // this.data = res.data
        for (let i = 0; i < 10; i++) {
          data.push({
            x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
            y: res.data
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "chart";
</style>
