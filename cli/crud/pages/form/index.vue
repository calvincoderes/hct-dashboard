<template>
  <div>
    <form-component />
  </div>
</template>

<script>
import FormComponent from '~/components/module_templates/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  }
}
</script>
