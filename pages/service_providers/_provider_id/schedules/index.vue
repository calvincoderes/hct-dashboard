<template>
  <div>
    <list-component />
  </div>
</template>

<script>
import ListComponent from '~/components/schedules/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
