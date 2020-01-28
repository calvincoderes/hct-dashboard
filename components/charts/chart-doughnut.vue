<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">
        {{ chartTitle }}
      </h2>
    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    online: {
      type: Array,
      default: () => []
    },
    walkin: {
      type: Array,
      default: () => []
    },
    manual: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Doughnut'
    },
  },
  data () {
    return {
      datasets: [
        {
          data: [this.online.length, this.walkin.length, this.manual.length],
          backgroundColor: ['#f36e60', '#ffdb3b', '#185190'],
          hoverBackgroundColor: ['#fbd2cd', '#fef5c9', '#d1e3f7']
        }
      ],
      labels: ['Online', 'Walkin', 'Manual'],
      option: {},
      chartTitle: this.title
    }
  }
}
</script>
