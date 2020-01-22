<template>
  <div>
    <list-component />
  </div>
</template>

<script>
import ListComponent from '~/components/module_templates/list.vue'

export default {
  middleware: ['authenticate'],
  components: {
    ListComponent,
  }
}
</script>
