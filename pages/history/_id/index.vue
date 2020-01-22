<template>
  <form-component />
</template>

<script>
import FormComponent from '~/components/history/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  }
}
</script>
