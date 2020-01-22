<template>
  <div>
    <form-component />
  </div>
</template>

<script>
import FormComponent from '~/components/service_providers/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  }
}
</script>
