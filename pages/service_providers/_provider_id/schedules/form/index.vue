<template>
  <div>
    <form-component />
  </div>
</template>

<script>
import FormComponent from '~/components/schedules/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  }
}
</script>
