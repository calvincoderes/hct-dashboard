<template>
  <list-component />
</template>

<script>
import ListComponent from '~/components/history/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
