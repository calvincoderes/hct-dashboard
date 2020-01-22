<template>
  <div>
    <list-component />
  </div>
</template>

<script>
import ListComponent from '~/components/service_providers/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
