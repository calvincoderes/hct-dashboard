<template>
  <div>
    <form-component />
  </div>
</template>

<script>
import FormComponent from '~/components/patient_records/form.vue'

export default {
  components: {
    FormComponent,
  },
  middleware: ['authenticate']
}
</script>
