<template>
  <div>
    <list-component />
  </div>
</template>

<script>
import ListComponent from '~/components/appointments/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
