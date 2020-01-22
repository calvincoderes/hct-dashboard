<template>
  <div>
    <form-component />
  </div>
</template>

<script>
import FormComponent from '~/components/services/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  }
}
</script>
