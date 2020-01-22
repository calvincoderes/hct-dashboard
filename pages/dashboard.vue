<template>
  <list-component />
</template>

<script>
import ListComponent from '~/components/dashboard/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
