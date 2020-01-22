<template>
  <div>
    <list-component />
  </div>
</template>

<script>
import ListComponent from '~/components/patient_records/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
